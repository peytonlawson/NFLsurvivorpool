function updateAllDropdowns() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const playersSheet = ss.getSheetByName("Players");
  const lastRow = playersSheet.getLastRow();

  for (let r = 3; r <= lastRow; r++) {
    updateDropdownForPlayer(r);
  }
}