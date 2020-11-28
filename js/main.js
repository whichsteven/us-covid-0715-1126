// Create a map object.
var mymap = L.map('map', {
  center: [46, -122],
  zoom: 3,
  maxZoom: 10,
  minZoom: 4,
  detectRetina: true
});

// Add a base map.
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mymap);


// Set function for color ramp
colors = chroma.scale('Oranges').colors(5);

function setColor(count) {
  var id;
  if (count > 80) {
    id = 4;
  } else if (count > 60) {
    id = 3;
  } else if (count > 40) {
    id = 2;
  } else if (count > 20) {
    id = 1;
  } else {
    id = 0;
  }
  return colors[id];
}


// Set style function that sets fill color.md property equal to the counts of airports
function style_case(feature) {
  return {
    fillColor: setColor(feature.properties.new_case_rate),
    fillOpacity: 0.8,
    weight: 1,
    opacity: 0.3,
    color: '#000000'
  };
}

// Add county polygons
// create counties variable, and assign null to it.
var case_rate;
case_rate = L.geoJson.ajax("assets/new-case-rate.geojson", {
  style: style_case,
  attribution: 'COVID-19 Case Data &copy; the New York Times | U.S. Counties &copy; U.S. Census Bureau | Base Map &copy; CartoDB | Made By Steven Bao'
}).addTo(mymap);


// Create Leaflet Control Object for Legend
var legend = L.control({
  position: 'bottomleft'
});

// Function that runs when legend is added to map
legend.onAdd = function() {

  // Create Div Element and Populate it with HTML
  var div = L.DomUtil.create('div', 'legend');
  div.innerHTML += '<b>Incidence Rate (Cases per 1,000 Residents) from Jul. 15th, 2020 to Nov. 26th, 2020</b><br/>';
  div.innerHTML += '<i style="background: ' + colors[4] + '; opacity: 0.8"></i><p>80+ cases per 1,000 residents</p>';
  div.innerHTML += '<i style="background: ' + colors[3] + '; opacity: 0.8"></i><p>60-80 cases per 1,000 residents</p>';
  div.innerHTML += '<i style="background: ' + colors[2] + '; opacity: 0.8"></i><p>40-60 cases per 1,000 residents</p>';
  div.innerHTML += '<i style="background: ' + colors[1] + '; opacity: 0.8"></i><p>20-40 cases per 1,000 residents</p>';
  div.innerHTML += '<i style="background: ' + colors[0] + '; opacity: 0.8"></i><p>0-20 cases per 1,000 residents</p>';
  div.innerHTML += '<p style="font-size: 10px;">For each interval above, the lower bound is inclusive, while the upper bound is exclusive.</p>';
  // Return the Legend div containing the HTML content
  return div;
};

// Add a scale bar to map
L.control.scale({
  position: 'bottomright'
}).addTo(mymap);

// Add a legend to map
legend.addTo(mymap);
