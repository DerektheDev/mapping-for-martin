function tilestache(template) {

  function pad(s, n, c) {
    var m = n - s.length;
    return (m < 1) ? s : new Array(m + 1).join(c) + s;
  }

  function format(i) {
    var s = pad(String(i), 6, "0");
    return s.substr(0, 3) + "/" + s.substr(3);
  }

  return function(c) {
    var max = 1 << c.zoom,
      column = c.column % max; // TODO assumes 256x256
    if (column < 0) column += max;
    return template.replace(/{(.)}/g, function(s, v) {
      switch (v) {
        case "Z":
          return c.zoom;
        case "X":
          return format(column);
        case "Y":
          return format(c.row);
      }
      return v;
    });
  };
}

function init() {

  var svg = org.polymaps.svg("svg");
  var parent = document.getElementById('map').appendChild(svg);

  var map = org.polymaps.map();
  map.container(parent);


  var wc_tiles = org.polymaps.image();
  wc_tiles.url('http://tile.stamen.com/watercolor/{Z}/{X}/{Y}.png');
  // these are the watercolor tiles

  var road_tiles = org.polymaps.image();
  road_tiles.url('http://tile.stamen.com/toner-lines/{Z}/{X}/{Y}.png');
  // these are the roads

  var label_tiles = org.polymaps.image();
  label_tiles.url('http://tile.stamen.com/terrain-labels/{Z}/{X}/{Y}.png');
  // these are the labels

  // map.zoomRange([5, 15]);
  map.zoomRange([1, 20]);

  map.center({
    lat: 42.3596,
    lon: -71.0606
  });

  map.zoom(15);

  map.add(wc_tiles);
  // map.add(road_tiles);
  map.add(label_tiles);

  var controls = org.polymaps.interact();
  map.add(controls);

  var hash = org.polymaps.hash();
  map.add(hash);

  var compass = org.polymaps.compass();
  compass.zoom("small");
  compass.pan("none");
//  map.add(compass);
}
