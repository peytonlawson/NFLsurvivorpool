function checkEliminationsFromPicks() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const picksSheet = ss.getSheetByName("Picks");
  const playersSheet = ss.getSheetByName("Players");
  const teamMap = getTeamMap();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Picks");
  const weekValue = sheet.getRange("I5").getValue();

  // Scrape recent NFL game results
  const response = UrlFetchApp.fetch("https://www.thesportsdb.com/api/v1/json/123/eventsround.php?id=4391&r=" + weekValue);
  const data = JSON.parse(response.getContentText());
  const recentGames = data.events;

  // Build a set of the winning teams
  const winners = new Set();
  recentGames.forEach(game => {
    const homeScore = parseInt(game.intHomeScore);
    const awayScore = parseInt(game.intAwayScore);
    const homeTeam = game.strHomeTeam.toUpperCase();
    const awayTeam = game.strAwayTeam.toUpperCase();

    // Skip if scores are missing (game not played yet)
    if (isNaN(homeScore) || isNaN(awayScore)) return;
    
    if (homeScore > awayScore) {
      winners.add(homeTeam);
    } else if (awayScore > homeScore) {
      winners.add(awayTeam);
    }
  });

  // 3. Get current picks
  const picksData = picksSheet.getRange(2, 3, picksSheet.getLastRow() - 1, 2).getValues(); // B = player, C = picked team
  const eliminatedPlayers = [];

picksData.forEach(([playerName, team]) => {
  if (!playerName || !team) return;

  const fullTeamName = teamMap.get(team.toUpperCase());
  if (!fullTeamName) {
    Logger.log(`Unknown abbreviation: ${team} for player ${playerName}`);
  }

  if (!fullTeamName || !winners.has(fullTeamName)) {
    eliminatedPlayers.push(playerName);
  }
  
const lastRow = playersSheet.getLastRow();
const playersData = playersSheet.getRange(2, 2, lastRow - 1, 2).getValues(); // columns B (name), C (status)

for (let i = 0; i < playersData.length; i++) {
  const playerName = playersData[i][0]; // column B
  if (eliminatedPlayers.includes(playerName)) {
    playersSheet.getRange(i + 2, 3).setValue("🔴 Eliminated"); // column C = status
    playersSheet.getRange(i + 2, 4).setValue("Week " + weekValue)
  }
}

});

  Logger.log(`Eliminated players: ${eliminatedPlayers.join(", ")}`);
}

function getTeamMap() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data/Admin");

  // B1:C32 = 32 rows, 2 columns (abbreviation, full name)
  const data = sheet.getRange(1, 2, 32, 2).getValues(); // Columns B & C
  const map = new Map();

  data.forEach(([abbr, full]) => {
    if (abbr && full) {
      map.set(abbr.toUpperCase(), full.toUpperCase()); // normalize for comparison
    }
  });

  return map;
}
