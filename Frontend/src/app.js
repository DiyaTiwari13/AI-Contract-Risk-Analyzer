const botSteps = [
  {
    eyebrow: "Upload",
    title: "Send a contract",
    text: "Forward a PDF, DOCX, or text contract directly to the Telegram bot.",
  },
  {
    eyebrow: "Analyze",
    title: "AI checks clauses",
    text: "The bot reads the document for risky language, missing protections, and unclear obligations.",
  },
  {
    eyebrow: "Decide",
    title: "Get a clear verdict",
    text: "Receive a simple result showing whether flaws were found, with the key reasons highlighted.",
  },
];

const checks = [
  "Unusual termination terms",
  "Missing payment protections",
  "One-sided liability clauses",
  "Confusing renewal language",
  "Hidden obligations or deadlines",
  "Weak confidentiality wording",
];

function createHeader() {
  return `
    <header class="topbar" aria-label="Main navigation">
      <a class="brand" href="#hero" aria-label="ClauseCheck Bot home">
        <span class="brand-mark" aria-hidden="true">C</span>
        <span>ClauseCheck Bot</span>
      </a>
      <nav class="nav-links" aria-label="Page sections">
        <a href="#workflow">Workflow</a>
        <a href="#checks">Checks</a>
        <a href="#result">Result</a>
      </nav>
      <a class="nav-action" href="https://t.me/contractAnalyzBot" target="_blank" rel="noreferrer">
        Open Telegram
      </a>
    </header>
  `;
}

function createHero() {
  return `
    <section class="hero" id="hero">
      <div class="hero-content">
        <p class="section-kicker">Telegram contract review assistant</p>
        <h1>Know if your contract has flaws before you sign.</h1>
        <p class="hero-copy">
          ClauseCheck Bot reviews uploaded contracts in Telegram and returns a
          direct answer: no obvious flaws found, or flaws detected with the
          risky clauses summarized.
        </p>
        <div class="hero-actions">
          <a class="primary-button" href="https://t.me/contractAnalyzBot" target="_blank" rel="noreferrer">
            Start in Telegram
          </a>
          <a class="secondary-button" href="#workflow">See how it works</a>
        </div>
      </div>

      <aside class="phone-preview" aria-label="Telegram bot conversation preview">
        <div class="phone-bar">
          <span></span>
          <strong>ClauseCheck Bot</strong>
          <span></span>
        </div>
        <div class="chat-feed">
          <div class="message user">Analyze this lease agreement.</div>
          <div class="document-card">
            <span class="doc-icon" aria-hidden="true">PDF</span>
            <div>
              <strong>lease_agreement.pdf</strong>
              <small>18 pages uploaded</small>
            </div>
          </div>
          <div class="message bot">
            Review complete. Flaws detected in termination, deposit return, and renewal clauses.
          </div>
          <div class="verdict-card">
            <span class="verdict-dot" aria-hidden="true"></span>
            <div>
              <strong>Flaws found</strong>
              <small>3 high-priority issues need attention</small>
            </div>
          </div>
        </div>
      </aside>
    </section>
  `;
}

function createWorkflow() {
  const cards = botSteps
    .map(
      (step, index) => `
        <article class="step-card">
          <span class="step-number">${String(index + 1).padStart(2, "0")}</span>
          <p>${step.eyebrow}</p>
          <h2>${step.title}</h2>
          <span>${step.text}</span>
        </article>
      `
    )
    .join("");

  return `
    <section class="section-band" id="workflow">
      <div class="section-heading">
        <p class="section-kicker">Simple workflow</p>
        <h2>Contract analysis inside the chat you already use.</h2>
      </div>
      <div class="step-grid">${cards}</div>
    </section>
  `;
}

function createChecks() {
  const checkItems = checks.map((item) => `<li>${item}</li>`).join("");

  return `
    <section class="split-section" id="checks">
      <div>
        <p class="section-kicker">What it looks for</p>
        <h2>Designed to flag practical contract risks.</h2>
        <p>
          The bot turns dense legal language into a focused issue list, so users
          can spot unclear, unfair, or missing terms before moving forward.
        </p>
      </div>
      <ul class="check-list" aria-label="Contract risk checks">
        ${checkItems}
      </ul>
    </section>
  `;
}

function createResult() {
  return `
    <section class="result-section" id="result">
      <div class="result-panel">
        <p class="section-kicker">Bot response</p>
        <h2>Fast verdict, useful detail.</h2>
        <div class="result-grid">
          <div>
            <span class="status status-safe">No flaws found</span>
            <p>No major risk indicators were detected. The bot still recommends a human review for important agreements.</p>
          </div>
          <div>
            <span class="status status-risk">Flaws detected</span>
            <p>The bot lists suspicious clauses, explains why each one matters, and suggests what to review next.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function createFooter() {
  return `
    <footer class="footer">
      <span>ClauseCheck Bot</span>
      <span>Introductory frontend for a Telegram contract analyzer.</span>
    </footer>
  `;
}

function renderApp() {
  const app = document.querySelector("#app");

  app.innerHTML = [
    createHeader(),
    createHero(),
    createWorkflow(),
    createChecks(),
    createResult(),
    createFooter(),
  ].join("");
}

renderApp();
