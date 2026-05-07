# AI-Contract-Risk-Analyzer
AI Contract Risk Analyzer Bot is a Telegram-based AI application that analyzes uploaded contract PDFs to detect risky clauses, missing terms, ambiguous language, and generate an overall contract risk assessment.

AI Contract Risk Analyzer Bot is a Telegram-based application that allows users to upload contract PDF files and receive AI-powered legal risk analysis. The system extracts contract text, analyzes it using Generative AI, identifies risky clauses, missing terms, ambiguous language, and generates a structured risk report with an overall risk score.

The project is designed to provide a lightweight, scalable, and user-friendly solution for automated contract analysis without requiring a separate web application frontend.

Features
Upload contract PDF files directly through Telegram
Extract text from uploaded PDF documents
AI-powered contract analysis using LLaMA / Gemini
Detect:
Risky clauses
Missing essential terms
Ambiguous language
Generate:
Contract summary
Suggestions
Overall risk score
Fast response using caching mechanism
Secure Telegram Bot API integration
Lightweight and scalable architecture
Technologies Used
Backend
Node.js
Express.js
Database
MongoDB
Mongoose
File Handling
Multer
pdf-parse
Artificial Intelligence
LLaMA / Gemini API
Prompt Engineering
Authentication & APIs
Telegram Bot API
JWT Authentication (Optional)
RESTful APIs
Development Tools
Visual Studio Code
Git & GitHub
Project Architecture

User → Telegram Bot → Backend Server → AI Model → Analysis Result → Telegram Bot → User

Working of the Project
User uploads a contract PDF file through the Telegram bot.
Telegram Bot API sends the file information to the backend server.
The backend downloads and processes the PDF file.
Text is extracted from the contract using pdf-parse.
The extracted text is cleaned and prepared using prompt engineering.
The AI model analyzes the contract and identifies:
Risky clauses
Missing terms
Ambiguous language
The AI generates:
Summary
Suggestions
Risk score
Results are optionally cached for faster repeated access.
The analyzed response is sent back to the user through Telegram.
Advantages of Telegram-Based System
No separate frontend development required
Easy user onboarding
Built-in authentication through Telegram
Cross-platform support
Real-time messaging support
Faster deployment and maintenance
