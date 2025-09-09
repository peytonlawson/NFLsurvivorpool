function updateNFLWeek() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Picks");
  const cell = sheet.getRange("I5");

  // Set the NFL season start date (Week 1)
  const seasonStart = new Date("2025-09-02T00:00:00Z"); // Adjust for your start date
  const today = new Date();

  // Calculate number of full weeks since the season started
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeksElapsed = Math.floor((today - seasonStart) / msPerWeek);

  // Week number = weeksElapsed + 1 (since Week 1 is the start week)
  const currentWeek = Math.max(1, weeksElapsed + 1);

  cell.setValue(currentWeek);
}