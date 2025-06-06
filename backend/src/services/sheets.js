import { google } from 'googleapis';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keyFilePath = path.join(__dirname, '../../credentials/key.json');

export async function validateGoogleSheetLink(spreadsheetId) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const metadata = await sheets.spreadsheets.get({ spreadsheetId });
    const tabName = metadata.data.sheets[0].properties.title;

    console.log('Connection successfull:', tabName);
    return true;
  } catch (err) {
    console.error('Connection error:', err.message);
    return false;
  }
}
export async function getSheetData(spreadsheetId) {
  const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const metadata = await sheets.spreadsheets.get({ spreadsheetId });
  const sheetName = metadata.data.sheets[0].properties.title;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:Z1000`
  });

  const rows = response.data.values;
  if (!rows || rows.length < 2) return [];

  const headers = rows[0];
  const data = rows.slice(1).map((row) => {
    const obj = {};
    headers.forEach((key, index) => {
      obj[key] = row[index] || '';
    });
    return obj;
  });

  return data;
}

export async function appendToSheet(dataRow, spreadsheetId) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const metadata = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetName = metadata.data.sheets[0].properties.title;

    const values = [
      [
        dataRow.id,
        dataRow.username,
        dataRow.content,
        dataRow.emotion,
        dataRow.summary,
        dataRow.date
      ]
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values }
    });

    console.log('✅ Sheet’e veri eklendi:', dataRow.id);
  } catch (err) {
    console.error('❌ Sheet append hatası:', err.message);
    throw err;
  }
}
