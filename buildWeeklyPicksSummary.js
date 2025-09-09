function updateWeeklyPicksChart() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const picksSheet = ss.getSheetByName("Picks");
  const dashboard = ss.getSheetByName("Dashboard");

  const weekValue = picksSheet.getRange("I5").getValue(); // Current week
  const picksData = picksSheet.getRange(2, 2, 10, 3).getValues(); 
  // Columns: B=Week, C=Player, D=Team

  // Filter for current week only
  const thisWeek = picksData.filter(row => row[0] === weekValue);

  // Count picks by team
  const counts = {};
  thisWeek.forEach(row => {
    const team = row[2];
    if (!team) return;
    counts[team] = (counts[team] || 0) + 1;
  });

  // Write to Dashboard summary table at row 50 (F:G)
  const startRow = 50;
  const startCol = 6; // Column F
  const output = [["Team", "Pick Count"]];
  for (let team in counts) {
    output.push([team, counts[team]]);
  }

  const range = dashboard.getRange(startRow, startCol, output.length, 2);
  range.clearContent();
  range.setValues(output);

  const chartRow = 2;
  const chartCol = 12;
  // Remove old charts
  dashboard.getCharts().forEach(chart => {
    const pos = chart.getContainerInfo();
    if (pos.getAnchorRow() === chartRow && pos.getAnchorColumn() === chartCol) {
      dashboard.removeChart(chart);
    }
  });


  // Add new pie chart pointing to summary table
  const chart = dashboard.newChart()
    .setChartType(Charts.ChartType.PIE)
    .addRange(dashboard.getRange(startRow, startCol, output.length, 2))
    .setOption('title', "This Week's Picks (Week " + weekValue + ")")
    .setPosition(chartRow, chartCol, 0, 0) // Place top-right of Dashboard
    .build();

  dashboard.insertChart(chart);

  Logger.log(`Weekly picks chart updated for Week ${weekValue}`);
}
