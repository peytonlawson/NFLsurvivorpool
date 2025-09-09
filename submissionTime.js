function myOnEdit(e) {
  if (!e || !e.range) return; // safety check

  const sheet = e.range.getSheet();

  // Only run on the "Picks" sheet
  if (sheet.getName() !== "Picks") return;

  const editedCol = e.range.getColumn();
  const editedRow = e.range.getRow();

  // Only trigger when Column D (4) is edited and not the header row
  if (editedCol === 4 && editedRow > 1) {
    const timestampCell = sheet.getRange(editedRow, 5); // Column E
    const timestamp = new Date();
    timestampCell.setValue(timestamp);
    timestampCell.setNumberFormat("MM/dd hh:mm:ss AM/PM"); // ensures proper display
  }
}