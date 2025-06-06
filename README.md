Aynen, işte istediğin şekilde **tam markdown formatında, kopyala-yapıştır** edilebilir `README.md` içeriği:

---

````markdown
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
````

---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### 🔐 .env Configuration

Inside `backend/.env` create the following:

```env
PORT=3000
HF_API_TOKEN=your_huggingface_api_token
SESSION_SECRET=some_random_secret
```

#### 🔑 Google Sheets Service Account Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a **Service Account** and enable the **Google Sheets API**.
3. Generate a **key.json** file.
4. Place it under:

```
backend/credentials/key.json
```

5. Copy the **service account email** (e.g. `zabu-sheets@project-id.iam.gserviceaccount.com`)
6. Share your **Google Sheet document** with that email (Editor access required)

---

### 3. Start the Backend

```bash
npm run dev
```

---

### 4. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

Frontend will run at: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Development Mode

* Frontend: `http://localhost:5173`
* Backend: `http://localhost:3000`
* CORS enabled with `credentials: true`
* Sessions are stored via cookies

---

## ⚠️ Notes

* ✅ Tweet analysis and Google Sheets saving works as expected
* 🚧 Tweet list component (`TweetList.jsx`) is currently disabled and under construction
* 🔐 Make sure your `.env` and `key.json` files are configured properly before running

---

## 📂 Folder Structure

```
zabu/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── utils/
│   └── credentials/key.json  ← DO NOT commit this
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── api/
```

---

## 📄 License

MIT — feel free to fork, build, and deploy 🚀

```

---

✅ Bunu direkt `README.md` dosyana yapıştır → tam görsel uyumlu çalışır.  
İstersen üzerine görsel, badge veya kullanım gif’i de koyabiliriz. Hazırsan söyle 🔥
```
