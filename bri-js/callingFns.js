/* global initializeMap, initializeDataTable */
/* 1. === Setting up Map === */
/* set up with zoom 5, may change, changed lat
and long from 34,0836417742618, -118.5298649280784 */
var bounds = new L.LatLngBounds(
    new L.LatLng(6.4430506, 58.7873306),
    new L.LatLng(36.1958244, 99.3334311));

var maxbounds = new L.LatLngBounds(
    new L.LatLng(-10.138541709445434, 10.24718978124926),
    new L.LatLng(65.929460176933446, 160.11828353124895)
)

let map = L.map('map', {zoomControl: false, center: bounds.getCenter(),maxBounds: maxbounds,maxBoundsViscosity: 1.0, maxZoom:9, minZoom:4 }).setView([21.31944, 79.0604], 3);
map.fitBounds(bounds);

const basemap = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
const attribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.';
var WhiteCanvas = L.tileLayer(basemap, {
  attribution,
});

var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, ' +
    'AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var Esri_DarkGreyCanvas = L.tileLayer(
    "http://{s}.sm.mapstack.stamen.com/" +
    "(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" +
    "{z}/{x}/{y}.png",
    {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, ' +
        'NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    }
);

let baseLayers = {
    "Satellite": Esri_WorldImagery,
    "Grey Canvas": Esri_DarkGreyCanvas,
    "White Canvas": WhiteCanvas
};

var layerControl = L.control.layers(baseLayers, null, {position: 'bottomright',collapsed:false}).addTo(map);
map.addLayer(WhiteCanvas);
map.addControl(layerControl);


sidebarContentController("story-slide");

L.control.browserPrint({position: 'bottomright'}).addTo(map);

let dataT = [];


var layerJan = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Monthly-Timelapse/main/data/DataForMap/Jan_2021.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2021-Jan"
});

var layerFeb = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Monthly-Timelapse/main/data/DataForMap/Feb_2021.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2021-Feb"
});

var layerMar = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Monthly-Timelapse/main/data/DataForMap/Mar_2021.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2021-Mar"
});

var layerApr = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Monthly-Timelapse/main/data/DataForMap/Apr_2021.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2021-Apr"
});

var layerMay = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Monthly-Timelapse/main/data/DataForMap/May_2021.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2021-May"
});

var layerJun = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Monthly-Timelapse/main/data/DataForMap/Jun_2021.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2021-Jun"
});

var layerJul = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Monthly-Timelapse/main/data/DataForMap/Jul_2021.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2021-Jul"
});

var layerAug = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Monthly-Timelapse/main/data/DataForMap/Aug_2021.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2021-Aug"
});

var layerSep = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Monthly-Timelapse/main/data/DataForMap/Sep_2021.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2021-Sep"
});

var layerOct = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Monthly-Timelapse/main/data/DataForMap/Oct_2021.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2021-Oct"
});

var layerNov = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Monthly-Timelapse/main/data/DataForMap/Nov_2021.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2021-Nov"
});

var layerDec = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/Monthly-Timelapse/main/data/DataForMap/Dec_2021.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2021-Dec"
});



layerGroup = L.layerGroup([layerJan,layerFeb,layerMar,layerApr,layerMay,layerJun,layerJul,layerAug,layerSep,layerOct,layerNov,layerDec]);
var sliderControl = L.control.sliderControl({position: "topright", layer: layerGroup, timeAttribute: 'time', follow: 1, startTimeIdx: 0, timeStrLength: 4, alwaysShowDate: true});
map.addControl(sliderControl);
setInterval(function(){
            var current = $('#leaflet-slider').slider("value");
            var max = sliderControl.options.maxValue + 1;
            var step = ++current % max;
            $('#leaflet-slider').slider("value", step);
            sliderControl.slide(null, {value: step});
        }, 1500);
sliderControl.startSlider();
initializeMap();
L.Control.geocoder({position: 'topright', placeholder: 'Search for location...'}).addTo(map);
L.control.zoom({
  position: 'bottomright'
}).addTo(map);


map.setView([21.79, 78.43], 5);

const markerImage = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

//L.MarkerClusterGroup instead of L.featureGroup
function addMarkers(url) { // THIS IS for pools, cooling centers and hosp
  let markersClust = new L.featureGroup();
  let iconuse;
  iconuse = markerImage;
  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      L.geoJSON(data, {
        onEachFeature(feature) {
          let popupContent = `<h4> ${feature.properties.Name} </h4>
        <p>India Rank: ${feature.properties.IRank} <br>
        World Rank: ${feature.properties.WRank} <br>
        PM 2.5 Concentration: ${feature.properties.Concentration} <br> </p>`;
          let marker = L.marker(
            [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
            { icon: iconuse }
          ).bindPopup(popupContent);
          markersClust.addLayer(marker);
        }
      });
      map.addLayer(markersClust);
    });
}


///addMarkers("https://raw.githubusercontent.com/aidanpcole/Monthly-Timelapse/main/data/DataForMap/15mostpollutedcities.geojson");



$.getJSON("https://raw.githubusercontent.com/aidanpcole/Monthly-Timelapse/main/data/DataForMap/wind-global.json", function(data) {
  var velocityLayer = L.velocityLayer({
    displayValues: false,
    displayOptions: {
      velocityType: "Global Wind",
      position: "bottomright",
      emptyString: "No wind data"
    },
    data: data,
    maxVelocity: 15
  });

  layerControl.addOverlay(velocityLayer, "Wind - Global");
});
