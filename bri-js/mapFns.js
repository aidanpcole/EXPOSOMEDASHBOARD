/* global layerGroup, map, PMTFVlegend,
getTableData, getLegend, sidebarContentController, intialTableData,
dataT, showmeHistogram, addHistInput, checkies, showdown */
let dlist;
/* === MY DATA ON GITHUB === */
const mapvars = {
  PMTFV: "https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/pm25_quants.geojson",
  OZONE: "https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/ozone_quants.geojson",
  NOTWO: "https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/no2_quants.geojson",
  LIGHT: "https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/light_quants.geojson"
};

//const pointLayers = ["coolingCenters", "emergencyP", "pools", "parks", "hosp"]; // i think this needs to be a dictionary
const polygonLayers = ["PMTFV","OZONE","NOTWO","LIGHT"]; // with string name and var



let tableData;

// =================== Functions ==========///
function onEachFeaturePMTFV(feature, layer) {
// use feature.properties to construct popup html
  let popupContent = '<table class="popupTable"><th><h3>District Stats</h3></th>';
  for (let p of Object.keys(feature.properties)) {
    popupContent += `<tr><td>${p}</td><td>${feature.properties[p]}</td></tr>`;
  }
  popupContent += '</table>';
  layer.bindPopup(popupContent);
  // var HVIScore = `<h2> Heat Vulnerability Score: ${feature.properties.rTotalVulScore} </h2>`;
  // layer.bindPopup(HVIScore);
}

function onEachFeatureOZONE(feature, layer) {
// use feature.properties to construct popup html
  let popupContent = '<table class="popupTable"><th><h3>District Stats</h3></th>';
  for (let p of Object.keys(feature.properties)) {
    popupContent += `<tr><td>${p}</td><td>${feature.properties[p]}</td></tr>`;
  }
  popupContent += '</table>';
  layer.bindPopup(popupContent);
  // var HVIScore = `<h2> Heat Vulnerability Score: ${feature.properties.rTotalVulScore} </h2>`;
  // layer.bindPopup(HVIScore);
}

function onEachFeatureNOTWO(feature, layer) {
// use feature.properties to construct popup html
  let popupContent = '<table class="popupTable"><th><h3>District Stats</h3></th>';
  for (let p of Object.keys(feature.properties)) {
    popupContent += `<tr><td>${p}</td><td>${feature.properties[p]}</td></tr>`;
  }
  popupContent += '</table>';
  layer.bindPopup(popupContent);
  // var HVIScore = `<h2> Heat Vulnerability Score: ${feature.properties.rTotalVulScore} </h2>`;
  // layer.bindPopup(HVIScore);
}

function onEachFeatureLIGHT(feature, layer) {
// use feature.properties to construct popup html
  let popupContent = '<table class="popupTable"><th><h3>District Stats</h3></th>';
  for (let p of Object.keys(feature.properties)) {
    popupContent += `<tr><td>${p}</td><td>${feature.properties[p]}</td></tr>`;
  }
  popupContent += '</table>';
  layer.bindPopup(popupContent);
  // var HVIScore = `<h2> Heat Vulnerability Score: ${feature.properties.rTotalVulScore} </h2>`;
  // layer.bindPopup(HVIScore);
}



// === Style  === //
function style(feature) {
  return {
    fillColor: '#fff9db',
    weight: 0.5,
    opacity: 0.7,
    color: "gray",
    fillOpacity: 0.5,
    colorOpacity: 0.1,
  };
}


// === realted styles for mapping ==//

const stylevars = {
  PMTFV: style,
  OZONE: style,
  NOTWO: style,
  LIGHT: style,
};

const bindingsvars = {
  PMTFV: onEachFeaturePMTFV,
  OZONE: onEachFeatureOZONE,
  NOTWO: onEachFeatureNOTWO,
  LIGHT: onEachFeatureLIGHT,
};



/// .addTo(map) used to be .addTo(layerGroup)
function updateMap(url, styleType, bindings) {
			map.eachLayer(function(layer) {
  	if (!!layer.toGeoJSON) {
    map.removeLayer(layer);
  	}
		});
  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      dlist = data;
      L.geoJSON(data, {
        style: styleType,
        onEachFeature: bindings
      }).addTo(map);
    });
}






function initializeMap() {
  console.log("INITIALIZEMAP FN");
  updateMap(mapvars.PMTFV, stylevars.PMTFV, onEachFeaturePMTFV);
  sidebarContentController("story-slide");
}

function check(box) {
  let b = box;
  b.checked = true;
}

function uncheck(box) {
  let b = box;
  b.checked = false;
}

function disable(box) {
  let b = box;
  b.enabled = false;
}
// === Determine & Update Map From Check boxes == //
function determineMap() {
		map.eachLayer(function(layer) {
  	if (!!layer.toGeoJSON) {
    map.removeLayer(layer);
  	}
		});
  console.log("IN DETERMINE MAP");
  let names = [];
  checkies.forEach(c => {
    if (c.checked === true) {
      let n = c.id;
      names.push(n);
    }
  });
  console.log(names);
  names.forEach(name => {
//    if (pointLayers.includes(name)) {
//      if (name === "parks") {
//        updateMappointParks(mapvars[name], name, emptyCallback);
//      }
//      if (name === "emergencyP") {
//        updateMappointEmergency(mapvars[name], name, emptyCallback);
//      }
//      updateMappointPCH(mapvars[name], name, emptyCallback);
//    }
    if (polygonLayers.includes(name)) {
      updateMap(mapvars[name], stylevars[name], bindingsvars[name]);
    }
  });
}

//checkies 3 and onward not incorporated in original
function anyChecked() {

  let trues = [];

  let l1 = checkies[0];
  let l2 = checkies[1];
  let l3 = checkies[2];
  let l4 = checkies[3];

  let cs = [l1, l2, l3, l4];
//  if (cs[3].checked) {
//    console.log("includes resources");
//    check(l5);
//    check(l6);
//    check(l7);
//    check(l8);
//    check(l9);
//  }

  cs.forEach(c => {
    if (c.checked === true) {
      trues.push("y");
    }
  });
  return trues;
}

function onCheck() {
  console.log("checkbox checked!");
  let trues = anyChecked();
  console.log(trues);
  if (trues.length > 0) {
    determineMap();
    determinePics();
    determineTime();
  }
}

//function resourceCheck() {
//  if (!checkies[3].checked) {
//    console.log("resources unchecked");
//    uncheck(checkies[4]);
//    uncheck(checkies[5]);
//    uncheck(checkies[6]);
//    uncheck(checkies[7]);
//    uncheck(checkies[8]);
//    layerGroup.clearLayers();
//  }
//  onCheck();
//}


function PMTFVCheck() {
  if (checkies[0].checked) {
    uncheck(checkies[1]);
    uncheck(checkies[2]);
    uncheck(checkies[3]);
    disable(checkies[1]);
    disable(checkies[2]);
    disable(checkies[3]);
  }
  // onCheck();
}

function OZONECheck() {
  if (checkies[1].checked) {
    uncheck(checkies[0]);
    uncheck(checkies[2]);
    uncheck(checkies[3]);
    disable(checkies[0]);
    disable(checkies[2]);
    disable(checkies[3]);
  }
  // onCheck();
}

function NOTWOCheck() {
  if (checkies[2].checked) {
    uncheck(checkies[0]);
    uncheck(checkies[1]);
    uncheck(checkies[3]);
    disable(checkies[0]);
    disable(checkies[1]);
    disable(checkies[3]);
  }
  // onCheck();
}

function LIGHTCheck() {
  if (checkies[3].checked) {
    uncheck(checkies[0]);
    uncheck(checkies[1]);
    uncheck(checkies[2]);
    disable(checkies[0]);
    disable(checkies[1]);
    disable(checkies[2]);
  }
  // onCheck();
}




var bounds = new L.LatLngBounds(
    new L.LatLng(5.6142297, 59.2023728),
    new L.LatLng(35.7247002, 100.0302299));
    
/* PM LAYERS */
var layerPM_2010 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/PM_2010.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2010"
});

var layerPM_2011 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/PM_2011.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2011"
});

var layerPM_2012 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/PM_2012.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2012"
});

var layerPM_2013 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/PM_2013.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2013"
});

var layerPM_2014 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/PM_2014.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2014"
});

var layerPM_2015 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/PM_2015.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2015"
});

var layerPM_2016 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/PM_2016.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2016"
});

var layerPM_2017 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/PM_2017.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2017"
});

var layerPM_2018 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/PM_2018.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2018"
});

var layerPM_2019 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/PM_2019.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2019"
});

/* OZONE LAYERS */
var layerOZONE_1990 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_1990.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "1990"
});

var layerOZONE_1991 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_1991.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "1991"
});

var layerOZONE_1992 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_1992.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "1992"
});

var layerOZONE_1993 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_1993.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "1993"
});

var layerOZONE_1994 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_1994.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "1994"
});

var layerOZONE_1995 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_1995.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "1995"
});

var layerOZONE_1996 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_1996.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "1996"
});

var layerOZONE_1997 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_1997.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "1997"
});

var layerOZONE_1998 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_1998.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "1998"
});

var layerOZONE_1999 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_1999.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "1999"
});

var layerOZONE_2000 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2000.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2000"
});

var layerOZONE_2001 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2001.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2001"
});

var layerOZONE_2002 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2002.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2002"
});

var layerOZONE_2003 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2003.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2003"
});

var layerOZONE_2004 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2004.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2004"
});

var layerOZONE_2005 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2005.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2005"
});

var layerOZONE_2006 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2006.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2006"
});

var layerOZONE_2007 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2007.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2007"
});

var layerOZONE_2008 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2008.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2008"
});

var layerOZONE_2009 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2009.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2009"
});

var layerOZONE_2010 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2010.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2010"
});

var layerOZONE_2011 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2011.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2011"
});

var layerOZONE_2012 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2012.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2012"
});

var layerOZONE_2013 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2013.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2013"
});

var layerOZONE_2014 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2014.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2014"
});

var layerOZONE_2015 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2015.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2015"
});

var layerOZONE_2016 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2016.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2016"
});

var layerOZONE_2017 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2017.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2017"
});

var layerOZONE_2018 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2018.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2018"
});

var layerOZONE_2019 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2019.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2019"
});

var layerOZONE_2020 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/OZONE_2020.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2020"
});

/* NO2 LAYERS */
var layerNO_1990 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/NO_1990.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "1990"
});

var layerNO_1995 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/NO_1995.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "1995"
});

var layerNO_2000 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/NO_2000.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2000"
});

var layerNO_2005 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/NO_2005.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2005"
});

var layerNO_2006 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/NO_2006.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2006"
});

var layerNO_2007 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/NO_2007.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2007"
});

var layerNO_2008 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/NO_2008.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2008"
});

var layerNO_2009 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/NO_2009.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2009"
});

var layerNO_2010 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/NO_2010.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2010"
});

var layerNO_2011 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/NO_2011.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2011"
});

var layerNO_2012 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/NO_2012.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2012"
});

var layerNO_2013 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/NO_2013.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2013"
});

var layerNO_2014 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/NO_2014.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2014"
});

var layerNO_2015 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/NO_2015.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2015"
});

var layerNO_2016 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/NO_2016.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2016"
});

var layerNO_2017 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/NO_2017.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2017"
});

var layerNO_2018 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/NO_2018.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2018"
});

var layerNO_2019 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/NO_2019.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2019"
});

var layerNO_2020 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/NO_2020.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2020"
});

/* LIGHT LAYERS */
var layerLIGHT_2012 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/LIGHT_2012.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2012"
});

var layerLIGHT_2013 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/LIGHT_2013.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2013"
});

var layerLIGHT_2014 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/LIGHT_2014.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2014"
});

var layerLIGHT_2015 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/LIGHT_2015.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2015"
});

var layerLIGHT_2016 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/LIGHT_2016.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2016"
});

var layerLIGHT_2017 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/LIGHT_2017.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2017"
});

var layerLIGHT_2018 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/LIGHT_2018.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2018"
});

var layerLIGHT_2019 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/LIGHT_2019.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2019"
});

var layerLIGHT_2020 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/LIGHT_2020.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2020"
});

var layerLIGHT_2021 = new L.ImageOverlay("https://raw.githubusercontent.com/aidanpcole/EXPOSOMEDASHBOARD/main/data/DataForMap/LIGHT_2021.png", bounds, {
    opacity: 1.0,
    interactive: false,
    time: "2021"
});


/* make a layergroup for each type of pollution and then use checkies to decide which layergroup is shown */
PMTFVP = L.layerGroup([layerPM_2010,layerPM_2011,layerPM_2012,layerPM_2013,layerPM_2014,layerPM_2015,layerPM_2016,layerPM_2017,layerPM_2018,layerPM_2019]);
OZONEP = L.layerGroup([layerOZONE_1990,layerOZONE_1991,layerOZONE_1992,layerOZONE_1993,layerOZONE_1994,layerOZONE_1995,layerOZONE_1996,layerOZONE_1997,layerOZONE_1998,layerOZONE_1999,layerOZONE_2000,layerOZONE_2001,layerOZONE_2002,layerOZONE_2003,layerOZONE_2004,layerOZONE_2005,layerOZONE_2006,layerOZONE_2007,layerOZONE_2008,layerOZONE_2009,layerOZONE_2010,layerOZONE_2011,layerOZONE_2012,layerOZONE_2013,layerOZONE_2014,layerOZONE_2015,layerOZONE_2016,layerOZONE_2017,layerOZONE_2018,layerOZONE_2019,layerOZONE_2020]);
NOTWOP = L.layerGroup([layerNO_1990,layerNO_1995,layerNO_2000,layerNO_2005,layerNO_2006,layerNO_2007,layerNO_2008,layerNO_2009,layerNO_2010,layerNO_2011,layerNO_2012,layerNO_2013,layerNO_2014,layerNO_2015,layerNO_2016,layerNO_2017,layerNO_2018,layerNO_2019,layerNO_2020]);
LIGHTP = L.layerGroup([layerLIGHT_2012,layerLIGHT_2013,layerLIGHT_2014,layerLIGHT_2015,layerLIGHT_2016,layerLIGHT_2017,layerLIGHT_2018,layerLIGHT_2019,layerLIGHT_2020,layerLIGHT_2021]); 


const picsvars = {
  PMTFV: PMTFVP,
  OZONE: OZONEP,
  NOTWO: NOTWOP,
  LIGHT: LIGHTP,
};

function determinePics() {
	let pics = [];
	let names = [];
	checkies.forEach(c => {
		if (c.checked === true) {
			let n = c.id;
			names.push(n);
		}
	});
	console.log(names);
	names.forEach(name => {
		if (polygonLayers.includes(name)) {
			pics = picsvars[name];
		}
	});
	console.log(pics);
	return pics
}




/* need an initial pic function with pm2.5 pics initially loaded and then determine pics based on change in check box*/
function determineTime() {
	/* need to remove the initial pm 2.5 slider and update based on checks*/
	let picboyoink = determinePics();
	let picGroup = L.layerGroup(picboyoink);
	let newsliderControl = L.control.sliderControl({position: "topright", layer: picGroup, timeAttribute: 'time', follow: 1, startTimeIdx: 0, timeStrLength: 4, alwaysShowDate: true});
	map.addControl(newsliderControl);
	setInterval(function(){
            var current = $('#leaflet-slider').slider("value");
            var max = newsliderControl.options.maxValue + 1;
            var step = ++current % max;
            $('#leaflet-slider').slider("value", step);
            newsliderControl.slide(null, {value: step});
        }, 1500);
  newsliderControl.startSlider();
}





