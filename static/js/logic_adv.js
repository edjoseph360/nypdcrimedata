
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});
  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});
  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap,
    "Street Map": streetmap,
    "Dark Map": darkmap
  };
var layers = {
  
  RAPE: new L.LayerGroup(),
  MURDER: new L.LayerGroup(),
  ROBBERY: new L.LayerGroup(),
  OTHER: new L.LayerGroup(),
};


var map = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 12,
  layers: [
   
    layers.RAPE,
    layers.MURDER,
    layers.ROBBERY,
    layers.OTHER
  ]
});


lightmap.addTo(map);


var overlays = {
  
  "Rape": layers.RAPE,
  "Murder": layers.MURDER,
  "Robbery": layers.ROBBERY,
  "Other": layers.OTHER
};


L.control.layers(baseMaps, overlays).addTo(map);


var icons = {
  
  RAPE: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "red",
    markerColor: "blue-dark",
    shape: "circle"
  }),
  MURDER: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "blue",
    markerColor: "blue-dark",
    shape: "circle"
  }),
  ROBBERY: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "black",
    markerColor: "orange",
    shape: "circle"
  }),
  OTHER: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "yellow",
    markerColor: "green",
    shape: "circle"
  })
};


d3.json("https://data.cityofnewyork.us/resource/uip8-fykc.json", function(data) {
    for (var i = 0; i < data.length; i++) {
        var element = data[i];
        // console.log(element.latitude)

        var offensecode;
        
        if(element.ofns_desc == "RAPE"){
            offensecode = "RAPE"
        }
        else if (element.ofns_desc == "MURDER & NON-NEGL. MANSLAUGHTE"){
            offensecode = "MURDER"
        }
        else if (element.ofns_desc == "ROBBERY"){
            offensecode = "ROBBERY"
        }
        else {
            offensecode = "OTHER"
        }

        var newMarker = L.marker([element.latitude, element.longitude], {
            icon:icons[offensecode]
        });
        newMarker.addTo(layers[offensecode]);
        
    }
});




