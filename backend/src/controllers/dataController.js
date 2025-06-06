import { getSheetData } from '../services/sheets.js';

export async function handleGetData(req, res) {
  const spreadsheetId = req.session?.sheetId;

  if (!spreadsheetId) {
    return res.status(401).json({ error: 'No active Google Sheets session.' });
  }

  try {
    const rows = await getSheetData(spreadsheetId);

    res.status(200).json({
      message: 'Data retrieved successfully',
      data: rows
    });
  } catch (err) {
    console.error('❌ /getData error:', err.message);
    res.status(500).json({ error: 'Failed to fetch data from sheet.' });
  }
}
