import { extractTweetInfo } from '../utils/extractTweetInfo.js';
import { analyzeTweetContent } from '../services/analysis.js';
import { appendToSheet } from '../services/sheets.js';
import dotenv from 'dotenv';
dotenv.config();


const HF_API_TOKEN = process.env.HF_API_TOKEN;

export async function handleTweetAnalysis(req, res) {
  const { tweetLink } = req.body;

  if (!tweetLink) {
    return res.status(400).json({ error: 'Tweet link is required.' });
  }

  const spreadsheetId = req.session?.sheetId;
  if (!spreadsheetId) {
    return res.status(401).json({ error: 'No active Google Sheets session.' });
  }

  try {
    const tweetData = await extractTweetInfo(tweetLink);
    if (!tweetData || !tweetData.content) {
      return res.status(400).json({ error: 'Tweet could not be extracted.' });
    }

    const aiData = await analyzeTweetContent(tweetData.content, HF_API_TOKEN);

    const dataRow = {
      id: tweetData.id,
      username: tweetData.username,
      content: tweetData.content,
      emotion: aiData.emotion,
      summary: aiData.summary,
      date: new Date().toISOString()
    };

    await appendToSheet(dataRow, spreadsheetId);

    res.status(200).json({ message: 'Tweet analyzed and saved.', data: dataRow });

  } catch (err) {
    console.error('❌ /analysis error:', err.message);
    res.status(500).json({ error: 'Internal error analyzing tweet.' });
  }
}
