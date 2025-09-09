function archiveAndResetPicks() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const picksSheet = ss.getSheetByName("Picks");
  const resultsSheet = ss.getSheetByName("Results");

  if (!picksSheet || !resultsSheet) {
    throw new Error("One or more required sheets are missing.");
  }

  // Define the exact range: Rows 2–11, Columns B–E
  const dataRange = picksSheet.getRange(2, 2, 10, 4); // B2:E11
  const picksData = dataRange.getValues();

  // Archive picks if not empty
  const hasData = picksData.some(row => row.some(cell => cell !== "")); 
  if (hasData) {
    const insertRow = resultsSheet.getLastRow() + 1;
    resultsSheet.insertRowsAfter(resultsSheet.getLastRow(), picksData.length);
    resultsSheet.getRange(insertRow, 1, picksData.length, picksData[0].length).setValues(picksData);
  }

  // Get the current week number from Dashboard!I5
  const currentWeek = picksSheet.getRange("I5").getValue();

  // Reset picks: overwrite values in B2:E11
  for (let i = 0; i < picksData.length; i++) {
    picksData[i][0] = currentWeek; // Column B (Week number)
    // Column C = Player name → leave as is
    picksData[i][2] = "";          // Column D (Picked Team)
    picksData[i][3] = "";          // Column E (Submission Time)
  }

  dataRange.setValues(picksData);

  // 🔓 Unlock the sheet
  const protections = picksSheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
  protections.forEach(p => {
    if (p.canEdit()) p.remove();
  });

  Logger.log(`Picks reset for Week ${currentWeek}, archived to Results, sheet unlocked.`);
}