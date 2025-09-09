function lockPicksSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Picks");
  const me = Session.getEffectiveUser().getEmail(); // You (the admin)

  // Remove existing protections on the sheet
  const protections = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
  protections.forEach(p => {
    if (p.canEdit()) p.remove();
  });

  // Apply new protection to lock the entire sheet
  const protection = sheet.protect().setDescription("Lock picks after deadline");
  protection.removeEditors(protection.getEditors());
  protection.addEditor(me); // Only you can edit
  protection.setWarningOnly(false); // Fully locked

  Logger.log(`Picks sheet locked at ${new Date().toLocaleString()}`);
}
