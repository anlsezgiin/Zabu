import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const HF_API_URL = 'https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment';
const HF_API_TOKEN = process.env.HF_API_TOKEN;

/**
 * @param {string} tweetText
 * @returns {{emotion: string, summary: string}}
 */
export async function analyzeTweetContent(tweetText) {
  if (!HF_API_TOKEN) {
    throw new Error('Can not found token');
  }

  console.log('🧠 AI input:', tweetText);

  try {
    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: tweetText })
    });

    const result = await response.json();

    if (!Array.isArray(result)) {
      console.error('Hugging Face response error:', result);
      return {
        emotion: 'Notr',
        summary: 'Can not decided to emotion'
      };
    }

    const scores = result[0];
    const top = scores.reduce((prev, curr) => (curr.score > prev.score ? curr : prev));

    const labelMap = {
      'LABEL_0': 'Negative',
      'LABEL_1': 'Notr',
      'LABEL_2': 'Positive'
    };

    const emotion = labelMap[top.label] || 'Notr';
    const summary = `Tweet has ${emotion.toLowerCase()} emotions.`;

    return { emotion, summary };

  } catch (err) {
    console.error('AI error:', err.message);
    return {
      emotion: 'Notr',
      summary: 'AI Error'
    };
  }
}
