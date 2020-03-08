
var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var map = L.map("map-id", {
  center: [
    40.73, -74.0059
  ],
  zoom: 12
});

graymap.addTo(map);

function getColor(ofense) {
  switch (true) {
  case ofns_desc == 'RAPE':
    return "#ea2c2c";
  case ofns_desc == 'MURDER & NON-NEGL. MANSLAUGHTE':
    return "#ea822c";
  case ofns_desc == 'ROBBERY':
    return "#ee9c00";
  
  default:
    return "#98ee00";
  }
}

d3.json("https://data.cityofnewyork.us/resource/uip8-fykc.json", function(data) {  
  L.geoJson(data, {
    
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    
    style: function(feature){
      return {
        color: "white",
        fillColor: getColor(feature.ofns_desc),

      };
    },
    
    // onEachFeature: function(feature, layer) {
    //   layer.bindPopup("Ofense: " + feature.ofns_desc);
    // }
    // For each station, create a marker and bind a popup with the station's name
    var arrestMarker = L.marker([crime.latitude, crime.longitude])
      .bindPopup("<h3>" + crime.ofns_desc + "<h3><h3>Arrest Date: " + crime.arrest_date + "<h3>");

    // Add the marker to the bikeMarkers array
    arrestMarkers.push(arrestMarker);
  }).addTo(map);
  
  var legend = L.control({
    position: "bottomright"
  });
  
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var grades = [0, 1, 2, 3];
    var colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00"
      
    ];
    
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'>&nbsp&nbsp&nbsp&nbsp</i> " +
        grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
    return div;
  };
  
  legend.addTo(map);
});