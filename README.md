# 🧠 Zabu – AI-Powered Tweet Sentiment Analyzer with Google Sheets Integration

Zabu is a full-stack web application that analyzes the sentiment of tweets using Hugging Face's `twitter-roberta-base-sentiment` model and stores the results into a Google Sheet in real time.

Built with:
- 🔥 Node.js + Express (Backend)
- ⚛️ React + Vite (Frontend)
- 🧠 Hugging Face API for AI sentiment analysis
- 📊 Google Sheets API for data storage

---

## ✨ Features

- Login with a public Google Sheets link
- Analyze individual tweets by pasting a tweet URL
- Save sentiment result (Positive / Neutral / Negative) + AI summary + date to Google Sheets
- View logs via backend console
- Frontend-ready but **Tweet list component is currently disabled (WIP)**

---

## ⚙️ Requirements

- Node.js (v18+ recommended)
- A Google Cloud Project with Sheets API enabled
- A Google Sheets document (shared with service account)
- Hugging Face account with an inference token

---

## 🚀 Installation & Dev Mode Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/zabu.git
cd zabu
