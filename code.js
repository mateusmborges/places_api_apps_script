function extractData() {
  const apiKey = PropertiesService.getScriptProperties("apiKey");

  const url = "https://places.googleapis.com/v1/places:searchText";

  const params = {
    method: "POST",
    payload: JSON.stringify({
      textQuery: "Autoescolas em Assis"
    }),
    headers: {
      "Content-type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.rating,places.userRatingCount"
    },
    muteHttpExceptions: true
  }

  const response = UrlFetchApp.fetch(url, params);

  const jsonResponse = JSON.parse(response);

  const header = [["Name", "Address", "Rating", "Rating Count"]];

  const data = jsonResponse['places'].map(function(place){
    const name = place.displayName.text;
    const address = place.formattedAddress;
    const rating = place.rating;
    const ratingCount = place.userRatingCount;
    return [name, address, rating, ratingCount];
  });

  const allData = header.concat(data);

  SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data").getRange(1,1,allData.length,allData[0].length).setValues(allData);
}
