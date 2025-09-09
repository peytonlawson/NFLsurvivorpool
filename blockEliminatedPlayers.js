function blockEliminatedPlayers() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const playersSheet = ss.getSheetByName("Players");
  const picksSheet = ss.getSheetByName("Picks");
  const me = Session.getEffectiveUser();

  const playerData = playersSheet.getRange(3, 2, 10, 2).getValues();

  const eliminatedPlayers = playerData
    .filter(row => row[1] && row[1].toString().includes("Eliminated"))
    .map(row => row[0]);

  Logger.log("Eliminated players: " + eliminatedPlayers.join(", "));

  picksSheet.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(p => p.remove());

  for (let r = 0; r < 10; r++) {
    const playerName = picksSheet.getRange(r+2, 3).getValue();
    if (eliminatedPlayers.includes(playerName)) {
      const teamCell = picksSheet.getRange(r+2, 4);
      const protection = teamCell.protect();

      protection.setDescription(`Eliminated player ${playerName}`);
      protection.addEditor(me);
      protection.removeEditors(protection.getEditors().filter(u => u.getEmail() !== me.getEmail()));
    }
  }
  Logger.log("Locked picked cells for eliminated players.");
}
