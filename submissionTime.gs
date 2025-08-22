function onEdit(e) {
  const sheet = e.range.getSheet();
  if (sheet.getName() !== "Picks") return;

  const editedCol = e.range.getColumn();
  const editedRow = e.range.getRow();

  // Column C = Picked Team
  if (editedCol === 3 && editedRow > 1) {
    const timestampCell = sheet.getRange(editedRow, 4); // Column D: Submission Time
    const currentValue = timestampCell.getValue();

    // Optional: Only update if it's empty or to always update on change
    timestampCell.setValue(new Date());
  }
}

