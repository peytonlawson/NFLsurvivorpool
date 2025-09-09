function onEdit(e) {
  const sheet = e.range.getSheet();
  if (sheet.getName() !== "Picks") return;

  const editedRow = e.range.getRow();
  const editedCol = e.range.getColumn();

  // Only watch edits in Column C (team pick)
  if (editedCol !== 4 || editedRow < 2) return;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const resultsSheet = ss.getSheetByName("Results");
  const picksSheet = sheet;

  const player = picksSheet.getRange(editedRow, 3).getValue(); // Column C: player name
  const pickedAbbr = e.value?.toUpperCase(); // Abbreviated pick (e.g., "DAL")

  if (!player || !pickedAbbr) return;

  // === Get previous picks for this player ===
  const resultsData = resultsSheet.getRange(2, 2, resultsSheet.getLastRow() - 1, 2).getValues(); // B: player, C: team
  const previousAbbrs = resultsData
    .filter(([rPlayer, rTeam]) => rPlayer === player)
    .map(([_, rTeam]) => rTeam.toUpperCase());

  if (previousAbbrs.includes(pickedAbbr)) {
    // === Lookup full name for user-friendly error ===
    const fullName = getFullTeamName(pickedAbbr) || pickedAbbr; // fallback to abbreviation if not found

    SpreadsheetApp.getUi().alert(`❌ OOPS!!! ❌\nYou’ve already picked the ${fullName}. Choose a different team.`);

    // Clear the invalid pick
    picksSheet.getRange(editedRow, 4).clearContent();
  }
}

function getFullTeamName(abbr) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data/Admin");
  const data = sheet.getRange(1, 2, 32, 2).getValues(); // Columns B (abbr), C (full), rows 1–32

  for (let i = 0; i < data.length; i++) {
    const [abbrCell, fullName] = data[i];
    if (abbrCell.toString().toUpperCase() === abbr.toUpperCase()) {
      return fullName;
    }
  }
  return null; // not found
}
