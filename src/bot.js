const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});

const TelegramBot = require("node-telegram-bot-api");
const { analyzeContractInput } = require("./contractAnalyzer");

const token = process.env.TELEGRAM_BOT_TOKEN?.trim();

if (!token) {
  console.error("Missing TELEGRAM_BOT_TOKEN. Add it to Telegram/src/.env.");
  process.exit(1);
}

if (!/^\d+:[A-Za-z0-9_-]+$/.test(token)) {
  console.error(
    "Invalid TELEGRAM_BOT_TOKEN format. Paste only the raw BotFather token into Telegram/src/.env."
  );
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

const introMessage = [
  "Hi, I am ClauseCheck Bot.",
  "",
  "I am ready to analyze contracts.",
  "",
  "Send me contract text or upload a contract file, and I will return whether flaws were found using Gemini.",
  "",
  "Commands:",
  "/start - Check that the bot is alive",
  "/help - Show this message",
].join("\n");

bot.onText(/^\/(start|help)$/, (message) => {
  bot.sendMessage(message.chat.id, introMessage);
});
//event listener
bot.on("document", async (message) => {
  const chatId = message.chat.id; //it includes start, help
  const document = message.document;
  //if no file
  const fileName = document?.file_name || "uploaded contract";

  await bot.sendMessage(chatId, `Analyzing ${fileName} with Gemini...`);

  try {
    const fileBuffer = await downloadTelegramFile(document.file_id);
    const result = await analyzeContractInput({
      fileName,
      mimeType: document.mime_type,
      fileDataBase64: fileBuffer.toString("base64"),
    });

    await bot.sendMessage(chatId, formatAnalysisResponse(result));
  } catch (error) {
    await bot.sendMessage(chatId, formatErrorResponse(error));
  }
});
//if user sent a file or perform any other action in between it ignores it..
bot.on("message", async (message) => {
  if (message.document || message.text?.startsWith("/")) {
    return;
  }
  const contractText = message.text || "";
  await bot.sendMessage(message.chat.id, "Analyzing your contract text with Gemini...");

  try {
    const result = await analyzeContractInput({ text: contractText });

    await bot.sendMessage(message.chat.id, formatAnalysisResponse(result));
  } catch (error) {
    await bot.sendMessage(message.chat.id, formatErrorResponse(error));
  }
});

bot.on("polling_error", (error) => {
  const responseBody = error.response?.body;

  if (responseBody?.error_code === 409) {
    console.error(
      "Telegram polling error: another instance of this bot is already running. Stop the extra node process and run only one npm start."
    );
    return;
  }

  if (responseBody?.description) {
    console.error("Telegram polling error:", responseBody.description);
    return;
  }

  if (error.cause?.message) {
    console.error("Telegram polling error:", error.cause.message);
    return;
  }

  if (error.message === "EFATAL: AggregateError" && error.errors?.length) {
    console.error(
      "Telegram polling error:",
      error.errors.map((item) => item.message).join("; ")
    );
    return;
  }

  console.error("Telegram polling error:", error.message);
});

async function downloadTelegramFile(fileId) {
  const fileLink = await bot.getFileLink(fileId);
  const response = await fetch(fileLink);

  if (!response.ok) {
    throw new Error("Could not download the uploaded file from Telegram.");
  }

  return Buffer.from(await response.arrayBuffer());
}

function formatAnalysisResponse(result) {
  const issueList = result.issues.map((issue) => `- ${issue}`).join("\n");
  const recommendations = result.recommendations
    .map((recommendation) => `- ${recommendation}`)
    .join("\n");

  return [
    "Contract Analysis Result",
    "",
    `Verdict: ${result.verdict}`,
    `Flaws found: ${result.hasFlaws ? "Yes" : "No"}`,
    `Source: ${result.source}`,
    "",
    "Summary:",
    result.summary,
    "",
    "Issues:",
    issueList,
    "",
    "Recommendations:",
    recommendations,
    "",
    "This is not legal advice.",
  ].join("\n");
}

function formatErrorResponse(error) {
  return [
    "Contract Analysis Failed",
    "",
    error.message || "Something went wrong while calling Gemini.",
    "",
    "Check your GEMINI_API_KEY, GEMINI_MODEL, internet connection, and uploaded file type.",
  ].join("\n");
}

console.log("ClauseCheck Telegram bot is running.");
