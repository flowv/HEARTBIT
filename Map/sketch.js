//Camera Conrols
let easycam;
let orbit_center;


//Data Import
let csv_table;
let all_tables = [];

//Grapics
let grid;
let path;
let all_paths = [];
let gsrColor;

// gui params
var Walk_01 = true;
var Walk_02 = false;
var Walk_03 = false;
var Walk_04 = false;
var Walk_05 = false;

// gui
var visible = true;
var gui;

//wALKER
let walker;
let all_walkers = [];



function preload() {
  csv_table = loadTable('Walk_01.csv', 'csv', 'header');
  for (let i = 1; i < 6; i++) {
    let filename = 'Walk_0' + i + '.csv';
    all_tables[i - 1] = loadTable(filename, 'csv', 'header');
  }
}

function setup() {

  //path = makeArray(csv_table, 1000, 0);
  for (let i = 0; i < all_tables.length; i++) {
    all_paths[i] = makeArray(all_tables[i], 1000, 0);
  }

  // Make Walker class
  for (let i = 0; i < all_paths.length; i++) {
    all_walkers[i] = new walk(all_paths[i]);
  }
  //walker = new walk(path);

  //Scene Setup
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);
  setAttributes('antialias', true);
  orbit_center = centerPT(all_paths[0]);
  easycam = new Dw.EasyCam(this._renderer, {
    distance: 20,
    center: [orbit_center.x, orbit_center.y, orbit_center.z],
    rotation: [-0.4062399521611455, 0.2934706782748305, -0.6133834150290596, -0.36126259339728]
  });
  perspective(radians(27), width / height, 1, 50000);

  easycam.setRotationConstraint(true, true, true);

  //Grid Setup
  grid = new helpergrid(orbit_center);

  // Chroma Color Scale gsr
  gsrColor = chroma.scale('Spectral');

  // Create Layout GUI
  gui = createGui('HeatBit Walks');
  gui.addGlobals('Walk_01', 'Walk_02', 'Walk_03', 'Walk_04','Walk_05' );

}

function draw() {

  background(32);




  setStyle(style_grid);
  grid.gridcross(20, 1, 100);

  // setStyle(style_dot);
  // all_walkers[0].staticSpheres(0.04, 5);
  //   all_walkers[1].staticSpheres(0.04, 5);

  setStyle(style_walk_1);
  if(Walk_01){
  all_walkers[0].staticPath();}
  if(Walk_02){
  all_walkers[1].staticPath();}
  if(Walk_03){
  all_walkers[2].staticPath();}
  if(Walk_04){
  all_walkers[3].staticPath();}
  if(Walk_05){
  all_walkers[4].staticPath();}


  setStyle(style_gsrlines);
  if(Walk_01){
  all_walkers[0].staticGSRLines(2, 200);}
  if(Walk_02){
  all_walkers[1].staticGSRLines(2, 200);}
  if(Walk_03){
  all_walkers[2].staticGSRLines(2, 200);}
  if(Walk_04){
  all_walkers[3].staticGSRLines(2, 200);}
  if(Walk_05){
  all_walkers[4].staticGSRLines(2, 200);}





}

//CLASS wALKER

function walk(array) {
  this.array = array;

  //draws a static path
  this.staticPath = function staticPath() {
    beginShape();
    noFill();
    for (let i = 0; i < this.array.length; i++) {
      vertex((this.array[i].loc.x), (this.array[i].loc.y), (this.array[i].loc.z));
    }
    endShape();
  }

  // draws mesh shperes
  this.staticSpheres = function(size, detail) {
    for (let i = 0; i < this.array.length; i++) {
      push()
      translate((this.array[i].x), (this.array[i].y), (this.array[i].z));
      sphere(size, detail, detail);
      pop();
    }
  }
  // draws vertical lines GSR
  this.staticGSRLines = function(scale, transparency) {
    for (let i = 0; i < this.array.length; i++) {
      stroke(gsrColor(array[i].gsr_mapped).alpha(transparency).rgba());
      line(array[i].x, array[i].y, array[i].z, array[i].x, array[i].y, array[i].loc.z - array[i].gsr_mapped * scale);
    }
  }

  function movePT(array, counter) {
    let x = counter % array.length;
    plane_cross((array[x].loc), 3);
    console.log("counter: " + array[x].count + " of " + array.length + " x= " + array[x].loc.x + " y=" + array[x].loc.y + " z= " + array[x].loc.z);
  }

}






// FUNCTIONS:

// takes the table and makes the main array of it
function makeArray(table, hor_scale, ver_scale) {
  let pathpoints = [];
  let gsrvalues = [];
  for (let i = 0; i < table.getRowCount(); i = i + 1) {
    let row = table.getRow(i);
    gsrvalues[i] = row.getNum("GSR");
  }
  let gsrmin = Math.min(...gsrvalues);
  let gsrmax = Math.max(...gsrvalues);
  // console.log("minVal" + gsrmin);
  // console.log("maxVal" + gsrmax);
  for (let i = 0; i < table.getRowCount(); i = i + 1) {
    let row = table.getRow(i);
    pathpoints[i] = {
      x: row.getNum("Lat") * hor_scale,
      y: row.getNum("Long") * hor_scale,
      z: row.getNum("Altitude") * ver_scale,
      loc: createVector((row.getNum("Lat") * hor_scale), (row.getNum("Long") * hor_scale), (row.getNum("Altitude") * ver_scale)),
      gsr: row.getNum("GSR"),
      gsr_mapped: map(row.getNum("GSR"), gsrmin, gsrmax, 0, 1, true),
      count: row.getNum("Count"),
      gsrMax: gsrmax,
      gsrMin: gsrmin,
    };
  }
  return pathpoints;
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

let style_gsrlines = {
  stroke: true,
  stroke_weight: .01,
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
