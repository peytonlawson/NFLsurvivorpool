function updateDropdownForPlayer(row) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const resultsSheet = ss.getSheetByName("Results");
  const playersSheet = ss.getSheetByName("Players");

  const playerName = playersSheet.getRange(row, 2).getValue(); // Column B
  if (!playerName) {
    Logger.log(`No player name in row ${row}`);
    return;
  }

  const resultsData = resultsSheet.getRange(2, 2, resultsSheet.getLastRow() - 1, 2).getValues();
  const teamsPicked = [...new Set(
    resultsData
      .filter(entry => entry[0] === playerName)
      .map(entry => entry[1])
      .filter(team => team)
  )];

  Logger.log(`Row ${row} - Player: ${playerName}, Teams picked: ${teamsPicked.join(", ")}`);

  const targetCell = playersSheet.getRange(row, 5); // Column E

  if (teamsPicked.length === 0) {
    targetCell.clearDataValidations();
    Logger.log("No picks found — validation cleared.");
    return;
  }

  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(teamsPicked, true)
    .setAllowInvalid(false)
    .build();

  targetCell.setValue(teamsPicked.join(", "));
  Logger.log(`Validation set with: ${teamsPicked.join(", ")}`);
}

function updateAllDropdowns() {
  const playersSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Players");
  const lastRow = playersSheet.getLastRow();

  for (let r = 3; r <= lastRow; r++) {
    updateDropdownForPlayer(r);
  }
}
