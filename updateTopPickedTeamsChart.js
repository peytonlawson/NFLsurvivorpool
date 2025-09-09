function updateTopPickedTeamsBarChart() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const resultsSheet = ss.getSheetByName("Results");
  const dashboard = ss.getSheetByName("Dashboard");
  const adminSheet = ss.getSheetByName("Data/Admin");

  //  Get all picks from Results sheet 
  const lastRow = resultsSheet.getLastRow();
  if (lastRow < 2) {
    Logger.log("No results found.");
    return;
  }

  // Column C = team (adjust if your Results layout is different)
  const picks = resultsSheet.getRange(2, 3, lastRow - 1, 1).getValues().flat();

  // Count occurrences of each team
  const counts = {};
  picks.forEach(team => {
    if (team) {
      counts[team] = (counts[team] || 0) + 1;
    }
  });

  if (Object.keys(counts).length === 0) {
    Logger.log("No picks to summarize.");
    return;
  }

  // Sort teams by count, descending
  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8); // take top 8


  // Write summary table to Dashboard!B100 
  const tableStartRow = 100;
  const tableRange = dashboard.getRange(tableStartRow, 2, sorted.length + 1, 2);
  const values = [["Team", "Picks"], ...sorted];
  tableRange.setValues(values);

  // === 4. Create bar chart ===
  removeChartAtPosition(dashboard, 25, 12); // clear old chart at (25, 12)

  const chart = dashboard.newChart()
    .setChartType(Charts.ChartType.BAR)
    .addRange(dashboard.getRange(tableStartRow, 2, sorted.length + 1, 2)) // include header
    .setOption("useFirstColumnAsDomain", true)
    .setOption("title", "Top 8 Most Picked Teams (All Weeks)")
    .setOption("legend", { position: "none" })
    .setPosition(25, 12, 0, 0)
    .build();

  dashboard.insertChart(chart);
}

// helper: remove chart anchored at a specific (row, col)
function removeChartAtPosition(sheet, anchorRow, anchorColumn) {
  const charts = sheet.getCharts();
  for (let i = 0; i < charts.length; i++) {
    try {
      const info = charts[i].getContainerInfo();
      if (info.getAnchorRow() === anchorRow && info.getAnchorColumn() === anchorColumn) {
        sheet.removeChart(charts[i]);
        return;
      }
    } catch (e) {}
  }
}
