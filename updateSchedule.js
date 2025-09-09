function updateSchedule() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const schedSheet = ss.getSheetByName("Schedule of Games");
  const picksSheet = ss.getSheetByName("Picks")
  const weekValue = picksSheet.getRange("I5").getValue();

  // Scrape recent NFL game results
  const response = UrlFetchApp.fetch("https://www.thesportsdb.com/api/v1/json/123/eventsround.php?id=4391&r=" + weekValue);
  const data = JSON.parse(response.getContentText());
  const games = data.events || [];

  if (schedSheet.getLastRow() > 1) {
    schedSheet.getRange(2,2, schedSheet.getLastRow()-1, 7).clearContent();
  }

  games.forEach((game, i) => {
    const row = i + 2 // starting at row 2

    const home = game.strHomeTeam || "";
    const away = game.strAwayTeam || "";

    // get badge URLs
    const homeBadge = game.strHomeTeamBadge;
    const awayBadge = game.strAwayTeamBadge;

    //form date time object (GMT)
    const dateStr = game.dateEvent; // in the format yyyy-mm-dd
    const timeStr = game.strTime; // format HH:MM:SS
    let easternTime = "";

    if (dateStr && timeStr) {
      try {
        const gmtDate = new Date(dateStr + "T" + timeStr + "Z"); // z is GMT
        easternTime = Utilities.formatDate(gmtDate, "America/New_York", "EEE, h:mm a");
      } catch (err) {
        Logger.log("Bad date/time for game: " + home + " vs " + away);
      }
    }

    if (homeBadge) {
      schedSheet.getRange(row, 2).setFormula(`=IMAGE("${awayBadge}")`);
    }
    schedSheet.getRange(row, 3).setValue(away); // column b away team
    schedSheet.getRange(row, 4).setValue("@");
    schedSheet.getRange(row, 5).setValue(home); // column c home team
    schedSheet.getRange(row, 7).setValue(easternTime); // column d is date time in eastern
    if (awayBadge) {
      schedSheet.getRange(row, 6).setFormula(`=IMAGE("${homeBadge}")`);
    }
  } );

  Logger.log("Schedule updated for Week " + weekValue);
}
