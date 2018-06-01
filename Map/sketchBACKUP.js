//Camera Conrols
let easycam;
let orbit_center;


//Data Import
let csv_table;

//Grapics
let grid;
let path;
let gsrColor;

// gui params
var first_Walk =  ['Walk_01.csv', 'Walk_02.csv', 'Walk_03.csv', 'Walk_04.csv', 'Walk_05.csv'];
var second_Walk =  ['None', 'Walk_01.csv', 'Walk_02.csv', 'Walk_03.csv', 'Walk_04.csv', 'Walk_05.csv'];
var first_color = '#eeee00';
var second_color = '#eeee00';

// gui
var visible = true;
var gui, gui2;


function preload() {
  csv_table = loadTable('Walk_01.csv', 'csv', 'header');
}

function setup() {
  blendMode(LIGHTEST);
  path = makeArray(csv_table, 1000, 0);

  //Scene Setup
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);
  setAttributes('antialias', true);
  orbit_center = centerPT(path);
  easycam = new Dw.EasyCam(this._renderer, {
    distance: 20,
    center: [orbit_center.x, orbit_center.y, orbit_center.z],
    //rotation: [-0.470169402180149,0.7588677461713186,0.40349861729492514,0.20062238886901143],
    rotation: [-0.4062399521611455, 0.2934706782748305, -0.6133834150290596, -0.36126259339728]
    //rotation: [0, 0, 0, 0]
  });
  perspective(radians(27), width / height, 1, 50000);


  easycam.setRotationConstraint(true, true, true);

  //Grid Setup
  grid = new helpergrid(orbit_center);

  // Chroma Color Scale gsr
  gsrColor = chroma.scale('Spectral');

  // Create Layout GUI
  gui = createGui('HeatBit Walks');
  gui.addGlobals('first_Walk', 'first_color', 'second_Walk', 'second_color',);
}

function draw() {

  background(32);



  strokeWeight(0.1);
  // grid.compass3d(1);

  setStyle(style_grid);
  grid.gridcross(20, 1, 100);

  setStyle(style_dot);
  staticSpheres(path, 0.05);



  setStyle(style_walk_1);
  staticPath(path);
  staticGSRLines(path, 2);

  console.log("dist: " + easycam.getDistance());
  console.log("rotation: " + easycam.getRotation());

  //easycam.rotateX(0.01);

}




// FUNCTIONS:



// takes the table and does an array of it
function makeArray(table, hor_scale, ver_scale) {
  let pathpoints = [];
  let gsrvalues = [];
  for (let i = 0; i < table.getRowCount(); i = i + 1) {
    let row = table.getRow(i);
    gsrvalues[i] = row.getNum("GSR");
  }
  let gsrmin = Math.min(...gsrvalues);
  let gsrmax = Math.max(...gsrvalues);
  console.log("minVal" + gsrmin);
  console.log("maxVal" + gsrmax);
  for (let i = 0; i < table.getRowCount(); i = i + 1) {
    let row = table.getRow(i);
    pathpoints[i] = {
      x: row.getNum("Lat") * hor_scale,
      y: row.getNum("Long") * hor_scale,
      z: row.getNum("Altitude") * ver_scale,
      loc: createVector((row.getNum("Lat") * hor_scale), (row.getNum("Long") * hor_scale), (row.getNum("Altitude") * ver_scale)),
      gsr: row.getNum("GSR"),
      gsr_mapped: map(row.getNum("GSR"), gsrmin, gsrmax, 0, 1, true),
      count: row.getNum("Count")
    };
  }
  return pathpoints;
}

// draws the static path
function staticPath(array) {
  beginShape();
  noFill();
  for (let i = 0; i < array.length; i++) {
    vertex((array[i].loc.x), (array[i].loc.y), (array[i].loc.z));
  }
  endShape();
}

// draws mesh shperes
function staticSpheres(array, size) {
  for (let i = 0; i < array.length; i++) {
    push()
    translate((path[i].x), (path[i].y), (path[i].z));
    sphere(size);
    pop();
  }
}

// draws vertical lines GSR
function staticGSRLines(array, scale) {
  strokeWeight(.01);
  noFill();
  for (let i = 0; i < array.length; i++) {
    stroke(gsrColor(array[i].gsr_mapped).alpha(200).rgba());
    line(array[i].x, array[i].y, array[i].z, array[i].x, array[i].y, array[i].loc.z - array[i].gsr_mapped * scale);
  }
}

//takes the array from above and returns the center point of all points
function centerPT(array) {
  let x = 0;
  let y = 0;
  let z = 0;
  for (let i = 0; i < array.length; i++) {
    x = x + array[i].x;
    y = y + array[i].y;
    z = z + array[i].z;
  }
  return createVector((x / array.length), (y / array.length), (z / array.length));
}

function movePT(array, counter) {
  let x = counter % array.length;
  plane_cross((array[x].loc), 3);
  console.log("counter: " + array[x].count + " of " + array.length + " x= " + array[x].loc.x + " y=" + array[x].loc.y + " z= " + array[x].loc.z);
}

//Sets Color, Linethickness, Fill, etc.
function setStyle(style) {
  strokeWeight(style.stroke_weight);
  stroke(color(style.strokecolor));
  if (style.stroke == false) {
    noStroke()
  }
  fill(color(style.fillcolor));
  if (style.fill == false) {
    noFill()
  }
}

//draws a 3d cross
function cross(vector, size) {
  line(vector.x, vector.y, vector.z, vector.x, vector.y + size, vector.z);
  line(vector.x, vector.y, vector.z, vector.x, vector.y - size, vector.z);
  line(vector.x, vector.y, vector.z, vector.x + size, vector.y, vector.z);
  line(vector.x, vector.y, vector.z, vector.x - size, vector.y, vector.z);
  line(vector.x, vector.y, vector.z, vector.x, vector.y, vector.z + size);
  line(vector.x, vector.y, vector.z, vector.x, vector.y, vector.z - size);
}

//draws a 3d crossplane
function dot(vector, size) {
  push();
  translate(vector);
  plane(size);
  push();
  rotateX(.5 * PI);
  plane(size);
  pop();
  push();
  rotateY(.5 * PI);
  plane(size);
  pop();
  pop();
}

// STYLES:

let style_walk_1 = {
  stroke: true,
  stroke_weight: .01,
  strokecolor: [255, 105, 180],
  fill: false,
  fillcolor: [255, 105, 180]
}

let style_point_white = {
  stroke: true,
  stroke_weight: 3,
  strokecolor: [240],
  fill: false,
  fillcolor: [255, 105, 180]
}

let style_dot = {
  stroke: false,
  stroke_weight: 1,
  strokecolor: [240, 150],
  fill: true,
  fillcolor: [255, 105, 180, 3]
}

let style_grid = {
  stroke: true,
  stroke_weight: .005,
  strokecolor: [255, 100],
  fill: false,
  fillcolor: [255, 105, 180]
}

//CLASS GRID
function helpergrid(vector) {
  this.vector = vector;


  // draws a compass
  this.compass3d = function(size) {
    push();
    translate(this.vector.x, this.vector.y, this.vector.z);
    strokeWeight(size / 30);
    //x axis in red
    stroke(255, 32, 0);
    line(0, 0, 0, size, 0, 0);
    //y axis in green
    stroke(32, 255, 32);
    line(0, 0, 0, 0, size, 0);
    //z axis in blue
    stroke(0, 32, 255);
    line(0, 0, 0, 0, 0, size);
    pop();
  }

  this.compass2d = function(size) {
    push();
    translate(this.vector.x, this.vector.y);

    //x axis in red
    stroke(255, 32, 0);
    line(0, 0, size, 0);
    //y axis in green
    stroke(32, 255, 32);
    line(0, 0, 0, size);
    pop();
  }

  this.gridlines = function(amount, spacing) {
    push();
    translate(this.vector.x, this.vector.y, this.vector.z);
    let width = (amount - 1) * spacing;
    line((width / 2), (width / 2), -(width / 2), (width / 2));
    line((width / 2), (width / 2), (width / 2), -(width / 2));
    line(-(width / 2), -(width / 2), -(width / 2), (width / 2));
    line(-(width / 2), -(width / 2), (width / 2), -(width / 2));
    pop();
  }

  this.gridpoints = function(amount, spacing) {
    let width = (amount - 1) * spacing;
    push();
    translate(this.vector.x - width / 2, this.vector.y - width / 2, this.vector.z);
    for (let x = 0; x < amount; x++) {
      for (let y = 0; y < amount; y++) {
        point(x * spacing, y * spacing);
      }
    }
    pop();
  }

  this.gridcross = function(amount, spacing, percent) {
    let width = (amount - 1) * spacing;
    let ofst = (spacing / 2) * (percent / 100);
    push();
    translate(this.vector.x - width / 2, this.vector.y - width / 2, this.vector.z);
    for (let x = 0; x < amount; x++) {
      for (let y = 0; y < amount; y++) {
        line((x * spacing) - ofst, (y * spacing), (x * spacing) + ofst, y * spacing);
        line((x * spacing), (y * spacing) - ofst, (x * spacing), (y * spacing) + ofst);
      }
    }
    pop();
  }
}
