function archiveAndResetPicks() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const picksSheet = ss.getSheetByName("Picks");
  const resultsSheet = ss.getSheetByName("Results");

  if (!picksSheet || !resultsSheet) {
    throw new Error("One or more required sheets are missing.");
  }

  const lastRow = picksSheet.getLastRow();
  const lastCol = picksSheet.getLastColumn();

  // Archive picks (if any)
  if (lastRow >= 2) {
    const picksData = picksSheet.getRange(2, 2, lastRow - 1, lastCol).getValues();
    const insertRow = resultsSheet.getLastRow() + 1;
    resultsSheet.insertRowsAfter(resultsSheet.getLastRow(), picksData.length);
    resultsSheet.getRange(insertRow, 1, picksData.length, lastCol).setValues(picksData);
  }

  // Get the current week number from Dashboard!B1
  const currentWeek = picksSheet.getRange("I5").getValue();

  // Loop through each row to reset picks and submission time, and prefill week number
  const dataRange = picksSheet.getRange(2, 2, lastRow - 1, 4); // Columns A–D
  const values = dataRange.getValues();

  for (let i = 0; i < values.length; i++) {
    values[i][0] = currentWeek; // Week number
    values[i][2] = "";           // Clear Picked Team
    values[i][3] = "";           // Clear Submission Time
  }

  dataRange.setValues(values);

  // 🔓 Unlock the sheet
  const protections = picksSheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
  protections.forEach(p => {
    if (p.canEdit()) p.remove();
  });

  Logger.log(`Picks reset for Week ${currentWeek}, sheet unlocked.`);
}
