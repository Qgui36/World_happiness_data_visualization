var svgWidth = 1200
var svgHeight= 600

var url = "http://127.0.0.1:5000/data"

var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 5,
  id: "mapbox.streets",
  accessToken: "pk.eyJ1IjoibG10YXlsb3I4NSIsImEiOiJjanZwdDdycWIwNTl2M3ltcTZ5NnQ2MHRvIn0.aPTs7NF0kMJxvoG5tCyWAg"
});

var myMap = L.map("map", {
  center: [20, 30],
  zoom: 2,
  layers: streetmap
});

d3.json(url).then(function(data) {
  console.log(data)
  var heatArray = []

  for (var i = 0; i < data.length; i++) {
    heatArray.push([data[i].Lat, data[i].Lng, data[i].Happiness_Score]);
  }
  console.log(heatArray);
  var heat = L.heatLayer(heatArray, {
    radius: 30,
    blur: 25
  }).addTo(myMap);
})
