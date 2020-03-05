function createMap(arrests) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "All Arrests": arrests
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [lightmap, arrests]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {

  // Pull the "stations" property off of response.data
  var crimename = response.data.crimename;

  // Initialize an array to hold bike markers
  var arrestMarkers = [];

  // Loop through the stations array
  for (var index = 0; index < crimename.length; index++) {
    var crime = crimename[index];

    // For each station, create a marker and bind a popup with the station's name
    var arrestMarker = L.marker([crime.latitude, crime.longitude])
      .bindPopup("<h3>" + crime.ofns_desc + "<h3><h3>Arrest Date: " + crime,arrest_date + "<h3>");

    // Add the marker to the bikeMarkers array
    arrestMarkers.push(arrestMarker);
  }

  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(arrestMarkers));
}


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://data.cityofnewyork.us/resource/uip8-fykc.json", createMarkers);
