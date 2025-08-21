# Tweet Sentiment Analysis with Google Sheets Integration

## Overview

This project allows users to analyze the sentiment of tweets and store the results in Google Sheets. The sentiment can be classified as **positive**, **neutral**, or **negative**.

The application currently works with mock data, but it is designed to integrate with the X (Twitter) API once proper configuration and billing are enabled. For sentiment analysis, it leverages a Hugging Face machine learning model.

The frontend is built using **React** with **Vite** for a fast development and build experience.

---

## How It Works

1. **Google Sheets Setup**

   * The user provides a Google Sheets link with **edit access enabled**.
   * The sentiment analysis results will be written directly into this sheet.

2. **Tweet Input**

   * On the tweet analysis screen, the user enters the link of the tweet to be analyzed.
   * For now, the application runs in **mock mode**. In the code, this is controlled inside `extractTweetInfo` with the `MOCK_MODE` flag.

3. **Sentiment Analysis**

   * The system sends the tweet text to the Hugging Face API for sentiment classification.
   * It uses the following model:

     ```
     https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment
     ```
   * The result is shown in the React frontend and recorded into the provided Google Sheet.

---

## Requirements

* Node.js (latest stable version recommended)
* React with Vite (frontend)
* Google Sheets link with edit access enabled
* Hugging Face API access (required for live sentiment analysis)
* X (Twitter) API access and billing (required for live tweet data)

---

## Configuration

1. Clone the repository:

   ```bash
   git clone https://github.com/anlsezgiin/Zabu.git
   cd Zabu
   ```
2. Install dependencies:

   ```bash
   cd client
   npm install
   cd ..
   cd backend
   npm install
   ```
3. Create a `.env` file in the project root and add the following values:

   ```
   PORT=
   GOOGLE_SHEETS_CLIENT_EMAIL=
   GOOGLE_SHEETS_PRIVATE_KEY=
   AI_API_URL=
   AI_API_TOKEN= 
   TWITTER_BEARER_TOKEN=
   HF_API_TOKEN=
   ```
4. To run with mock data, ensure `MOCK_MODE` is set to `true` in `extractTweetInfo`.
   To run with live data, set it to `false` and configure the `.env` file with your Hugging Face and X API credentials.

---

## Usage

1. Run the frontend server:

   ```bash
   npm run dev
   ```
2. Run the backend server:   
    ```bash
   node index.js
   ```

3. Open the application in your browser at:

   ```
   http://localhost:5173
   ```
4. Enter the Google Sheets link.
5. Enter the tweet link in the analysis screen.
6. View the sentiment result in the application and check the corresponding entry in your Google Sheet.

---

## Project Goal

The main purpose of this application is to classify the sentiment of a tweet as **positive, neutral, or negative** using the Hugging Face model and persist this information in a Google Sheet for further tracking or analysis.

