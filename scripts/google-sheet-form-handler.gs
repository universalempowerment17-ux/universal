/**
 * Google Apps Script — saves popup form submissions to a Google Sheet.
 *
 * Setup:
 * 1. Create a Google Sheet with headers in row 1:
 *    Timestamp | Name | Phone | Email
 * 2. Extensions → Apps Script → paste this file → Save
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL into web/.env as VITE_FORM_SUBMIT_URL
 *
 * Download as Excel: File → Download → Microsoft Excel (.xlsx)
 */

const SHEET_NAME = 'Submissions'

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const sheet = getSheet_()
    ensureHeaders_(sheet)

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.phone || '',
      data.email || '',
    ])

    return jsonResponse_({ success: true })
  } catch (err) {
    return jsonResponse_({ success: false, error: err.message })
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
  }
  return sheet
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Email'])
    sheet.getRange(1, 1, 1, 4).setFontWeight('bold')
  }
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
}
