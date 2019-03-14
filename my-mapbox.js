// Map via Mapbox GL

$(document).ready(init);

function init(jQuery) {
  CurrentYear();
  initMap();

  /*
  // user clicks some button
  $('#someButton').on('click', function () {
      // do something here
  });

  */
}

function CurrentYear() {
  var thisYear = new Date().getFullYear()
  $("#currentYear").text(thisYear);
}

var mapCoordinates = [42.885441,-78.878464];
var mapZoom = 11;

// the key from the Mapbox examples (not mine)
var mapAccessToken = "pk.eyJ1IjoibWV0cmljb24iLCJhIjoiY2l3eTQxMWl3MDBmYTJ6cWg3YmZtdjdsMSJ9.2vDbTw3ysscpy3YWkHo6aA";

var map = null;
var geocoder = null;

function initMap() {
  map = MapGL();
}

function MapGL() {
  mapboxgl.accessToken = mapAccessToken;

  // initialize map
  var newMap = new mapboxgl.Map({
      container: "map", // container id
      // style: "mapbox://styles/mapbox/streets-v9", //stylesheet location
      style: 'mapbox://styles/mapbox/light-v9',
      // center: [-37.809820, 144.96983],

      center: [ 144.96983,-37.809820],
      zoom: 15.5,
      pitch: 45,
      bearing: -0,
  });

  // geocoding
  newMap.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
  }));





  
  // event handlers
  newMap.on("load", mapLoaded);


  return newMap;
}

function mapLoaded() {
  // do stuff here

// Insert the layer beneath any symbol layer.
var layers = map.getStyle().layers;
 
var labelLayerId;
for (var i = 0; i < layers.length; i++) {
if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
labelLayerId = layers[i].id;
break;
}
}
 

  map.addLayer({
    'id': '3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
    'fill-extrusion-color': '#aaa',
     
    // use an 'interpolate' expression to add a smooth transition effect to the
    // buildings as the user zooms in
    'fill-extrusion-height': [
    "interpolate", ["linear"], ["zoom"],
    15, 0,
    15.05, ["get", "height"]
    ],
    
    'fill-extrusion-base': [
    "interpolate", ["linear"], ["zoom"],
    15, 0,
    15.05, ["get", "min_height"]
    ],

    'fill-extrusion-opacity': .6
    }
    }, labelLayerId);

  
}