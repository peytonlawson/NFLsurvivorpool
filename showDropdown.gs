function onEdit(e) {
  if (!e) return; // Prevents running manually

  const sheet = e.range.getSheet();
  const range = e.range;

  // Only trigger on "Players" sheet and Column A
  if (sheet.getName() !== "Players" || range.getColumn() !== 1) return;

  const row = range.getRow();
  const playerName = range.getValue();
  const statusCell = sheet.getRange(row, 2); // Column B

  if (playerName) {
    // Add dropdown to the status cell
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Active', 'Eliminated'], true)
      .setAllowInvalid(false)
      .build();
    statusCell.setDataValidation(rule);
  } else {
    // Clear dropdown if name is removed
    statusCell.clearDataValidations();
    statusCell.clearContent();
  }
}
