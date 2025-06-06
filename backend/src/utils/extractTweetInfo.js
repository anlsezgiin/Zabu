import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

export async function extractTweetInfo(tweetLink) {
    const MOCK_MODE = false; // dev mode for mocking data
    if (MOCK_MODE) {
    console.log('MOCK MODE: extractTweetInfo returning mock data');
    const filePath = path.resolve('./mock/tweetMock.json');
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  }
  const tweetId = extractTweetId(tweetLink);
  const username = extractUsername(tweetLink);

  if (!tweetId || !username) {
    console.error('Invalid X link');
    return null;
  }

  const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

  if (!BEARER_TOKEN) {
    console.error('Bearer token error');
    return null;
  }

  const url = `https://api.twitter.com/2/tweets/${tweetId}?tweet.fields=text,author_id`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      }
    });

    const json = await res.json();

    if (res.status !== 200 || !json.data) {
      console.error('X API error:', json);
      return null;
    }

    const tweetText = json.data.text;

    return {
      id: tweetId,
      username,
      content: tweetText
    };
  } catch (err) {
    console.error('X API connection error:', err.message);
    return null;
  }
}

function extractTweetId(url) {
  const match = url.match(/status\/(\d+)/);
  return match ? match[1] : null;
}

function extractUsername(url) {
  const match = url.match(/(?:x\.com|twitter\.com)\/([a-zA-Z0-9_]+)/);
  return match ? match[1] : null;
}
