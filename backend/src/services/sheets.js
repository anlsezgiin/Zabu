import { google } from 'googleapis';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keyFilePath = path.join(__dirname, '../../credentials/key.json'); // ignored for security

export async function validateGoogleSheetLink(spreadsheetId) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });

    const client = await auth.getClient();

    const sheets = google.sheets({ version: 'v4', auth: client });

    const response = await sheets.spreadsheets.get({ spreadsheetId });

    console.log('Connection succesful!', response.data.properties.title);
    return true;
  } catch (err) {
    console.error('Connection error!', err.message);
    return false;
  }
}
