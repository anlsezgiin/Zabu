import express from 'express';
import { validateGoogleSheetLink } from '../services/sheets.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { sheetLink } = req.body;

  if (!sheetLink) {
    return res.status(400).json({ error: 'No link provided.' });
  }

  const spreadsheetId = extractSheetId(sheetLink);

  if (!spreadsheetId) {
    return res.status(400).json({ error: 'Invalid Google Sheets link format.' });
  }

  console.log('Testing spreadsheet ID:', spreadsheetId);
  const isValid = await validateGoogleSheetLink(spreadsheetId);

  if (!isValid) {
    return res.status(400).json({ error: 'Invalid sheets link.' });
  }

  req.session.sheetId = spreadsheetId;
  res.status(200).json({ message: 'Correct sheets link.', succes: "true", sheetId: spreadsheetId });
});

function extractSheetId(link) {
  const match = link.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}

export default router;
