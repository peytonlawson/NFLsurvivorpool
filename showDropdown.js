function onEdit(e) {
  if (!e || !e.range) return; // Prevents running manually

  const sheet = e.range.getSheet();
  const range = e.range;

  // Only trigger on "Players" sheet and Column C
  if (sheet.getName() !== "Players" || range.getColumn() !== 3) return;

  const row = range.getRow();
  const playerName = range.getValue();
  const statusCell = sheet.getRange(row, 3); // Column C

  // Trim spaces to detect truly empty cells
  if (playerName && playerName.toString().trim() !== "") {
    // Add dropdown to the status cell
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Active', 'Eliminated'], true)
      .setAllowInvalid(false)
      .build();
    statusCell.setDataValidation(rule);
  } else {
    // Clear dropdown if name is removed or empty
    statusCell.clearDataValidations();
    statusCell.clearContent();
  }
}
