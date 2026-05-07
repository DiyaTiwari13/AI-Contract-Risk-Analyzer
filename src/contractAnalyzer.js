//base endpoint for gemini api
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models";
//default model used if none is specified 
const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

async function analyzeContractInput({
  text = "",
  fileName = "",
  mimeType = "",
  fileDataBase64 = "",
} = {})
//if gemini key is missing 
{
  if (!process.env.GEMINI_API_KEY) {
    return createMissingKeyResponse();
  }
//create structured input for gemini
  const parts = buildPromptParts({ text, fileName, mimeType, fileDataBase64 });
  const response = await callGemini(parts);

  return normalizeGeminiResponse(response);
}

function buildPromptParts({ text, fileName, mimeType, fileDataBase64 }) {
  const instructions = [
    "You are a contract analysis assistant for a Telegram bot.",
    "Analyze the supplied contract content and decide if it has flaws.",
    "Return only valid JSON with this exact shape:",
    '{"hasFlaws":true,"verdict":"Flaws detected","summary":"short summary","issues":["issue one"],"recommendations":["next step one"]}',
    "Use hasFlaws=false only when no meaningful contractual flaw is visible.",
    "Keep issues practical and concise. Do not provide legal advice.",
  ].join("\n");

  if (fileDataBase64) {
    return [
      { text: `${instructions}\n\nFile name: ${fileName || "uploaded contract"}` },
      {
        inline_data: {
          mime_type: mimeType || "application/pdf",
          data: fileDataBase64,
        },
      },
    ];
  }
//if file is in the specified format then input it otherwise sent the instructions
  return [
    {
      text: `${instructions}\n\nContract text:\n${text || "No contract text provided."}`,
    },
  ];
}

async function callGemini(parts) {
  //choose a model
  const model = process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL;
  const url = `${GEMINI_API_URL}/${model}:generateContent`; //api endpoint 
//[posting]
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts,
        },
      ],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
      },
    }),
  });
//http response to json object
  const payload = await response.json();

  if (!response.ok) {
    const message = payload.error?.message || "Gemini request failed.";
    throw new Error(message);
  }
//all these should be present 
  const content = payload.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!content) {
    throw new Error("Gemini returned an empty response.");
  }

  return parseJsonResponse(content);  // string to json object
}

function normalizeGeminiResponse(response) {
  const issues = Array.isArray(response.issues) ? response.issues : [];
  const recommendations = Array.isArray(response.recommendations)
    ? response.recommendations
    : [];
  const hasFlaws = Boolean(response.hasFlaws || issues.length > 0);

  return {
    hasFlaws,
    verdict: response.verdict || (hasFlaws ? "Flaws detected" : "No obvious flaws found"),
    summary: response.summary || "Gemini analyzed the submitted contract content.",
    issues: issues.length
      ? issues
      : [hasFlaws ? "Potential contract risk detected" : "No major flaws detected"],
    recommendations: recommendations.length
      ? recommendations
      : ["Review the result with a qualified professional before signing."],
    source: "Gemini",
  };
}

function createMissingKeyResponse() {
  return {
    hasFlaws: false,
    verdict: "Gemini API key missing",
    summary: "Add GEMINI_API_KEY to Telegram/src/.env to enable AI contract analysis.",
    issues: ["AI analysis was not run because GEMINI_API_KEY is missing."],
    recommendations: ["Create a Gemini API key in Google AI Studio and restart the bot."],
    source: "Configuration",
  };
}

function parseJsonResponse(content) {
  try {
    return JSON.parse(content);
  } catch (error) {
    const match = content.match(/\{[\s\S]*\}/);

    if (match) {
      return JSON.parse(match[0]);
    }

    throw error;
  }
}

module.exports = {
  analyzeContractInput,
};
