function rickRoll() {
  var url = "https://youtu.be/dQw4w9WgXcQ?si=YezcC-9YHM3j-LI5"
  var html = HtmlService.createHtmlOutput(
    '<a href="' + url + '" target="_blank">Click here to send a message to the league commissioner.</a>'
  )
  .setWidth(200)
  .setHeight(80);
  SpreadsheetApp.getUi().showSidebar(html);
}
