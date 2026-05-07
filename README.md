# 🤖 AI Contract Risk Analyzer Bot

AI Contract Risk Analyzer Bot is a **Telegram-based AI application** that allows users to upload contract PDF files and receive intelligent legal risk analysis instantly. 📄⚖️
The system extracts contract text, analyzes it using **Generative AI**, identifies risky clauses, missing terms, ambiguous language, and generates a structured risk report with an overall risk score. 📊

The project is designed to provide a **lightweight, scalable, and user-friendly solution** for automated contract analysis without requiring a separate web application frontend. 🚀

---

# ✨ Features
✅ Upload contract PDF files directly through Telegram
✅ Extract text from uploaded PDF documents
✅ AI-powered contract analysis using LLaMA / Gemini 🤖
✅ Detect:

* ⚠️ Risky Clauses
* 📌 Missing Essential Terms
* ❓ Ambiguous Language

✅ Generate:
* 📝 Contract Summary
* 💡 Suggestions
* 📊 Overall Risk Score

✅ Fast response using caching mechanism ⚡
✅ Secure Telegram Bot API integration 🔐
✅ Lightweight and scalable architecture 🏗️

---

# 🛠️ Technologies Used

## 💻 Backend
* Node.js
* Express.js

## 🗄️ Database
* MongoDB
* Mongoose

## 📂 File Handling
* Multer
* pdf-parse

## 🤖 Artificial Intelligence
* LLaMA / Gemini API
* Prompt Engineering

## 🔐 Authentication & APIs
* Telegram Bot API
* JWT Authentication (Optional)
* RESTful APIs

## 🧑‍💻 Development Tools
* Visual Studio Code
* Git & GitHub

---

# 🏗️ Project Architecture
```text
User → Telegram Bot → Backend Server → AI Model → Analysis Result → Telegram Bot → User
```
---

# ⚙️ Working of the Project

### 1️⃣ User Uploads Contract

The user uploads a contract PDF file through the Telegram bot. 📄

### 2️⃣ Telegram API Communication

Telegram Bot API sends the uploaded file information to the backend server. 🔗

### 3️⃣ File Processing

The backend downloads and processes the PDF file securely. 📥

### 4️⃣ Text Extraction

Text is extracted from the contract using **pdf-parse**. 📝

### 5️⃣ Prompt Preparation

The extracted text is cleaned and structured using **Prompt Engineering**. 🧠

### 6️⃣ AI-Based Analysis

The AI model analyzes the contract and identifies:

* ⚠️ Risky Clauses
* 📌 Missing Terms
* ❓ Ambiguous Language

### 7️⃣ Structured Report Generation

The AI generates:

* 📝 Summary
* 💡 Suggestions
* 📊 Risk Score

### 8️⃣ Caching Mechanism

Results are optionally cached for faster repeated access and improved performance. ⚡

### 9️⃣ Result Delivery

The analyzed response is sent back to the user directly through Telegram. 📲

---

# 🌟 Advantages of Telegram-Based System

✅ No separate frontend development required
✅ Easy user onboarding
✅ Built-in authentication through Telegram
✅ Cross-platform support 📱💻
✅ Real-time messaging support 💬
✅ Faster deployment and maintenance 🚀
✅ Lightweight and cost-effective solution 💡

---

# 🎯 SDG Goals

## 🌍 SDG 16 – Peace, Justice and Strong Institutions

Promotes legal transparency and accessibility through AI-powered contract analysis.

## 🌐 SDG 9 – Industry, Innovation and Infrastructure

Leverages modern AI technologies and scalable digital infrastructure for legal-tech innovation.

---

# 📌 Conclusion

The AI Contract Risk Analyzer Bot demonstrates how **Artificial Intelligence + Telegram Automation** can simplify legal document analysis through automation. ⚖️🤖
By integrating **Telegram Bot API, AI Models, PDF Processing, and Backend Services**, the system provides an efficient, scalable, and intelligent platform for identifying contract risks quickly and accurately. 🚀
