window.onload = function(){
  getRootElement()
  init()
}

//settings
var numOfCircles = 30
var secondsToSync = 30
var circleColour = '#8ED6FF'

//Global var's
var canvas
var context
var myCircleArray = []

//Finds the lement with class = "loading_image" to be the parent of the canvas
function getRootElement() {
  var elems = document.getElementsByTagName("div")
  for (var i = 0; i < elems.length; i++) {
    if (elems[i].getAttribute("class") == "loading_image") {
      var root = elems[i]
      insertCanvas(root)
      break
    }
  }
}

//Used to change teh settings and reset the animation
function changeSettings(){
  numOfCircles = document.getElementById("cir").value
  secondsToSync = document.getElementById("syn").value
  circleColour = document.getElementById("col").value
  init()
}

//Inserts the canvas object as a child filling to its parents size
function insertCanvas(root){
  canvas = document.createElement("canvas")


  canvas.width  = root.clientWidth;
  canvas.height = root.clientHeight;

  root.appendChild(canvas)
}

//Initialize
function init() {

  //get the context
  context = canvas.getContext('2d');

  //clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  //Initial calulations of sizes
  //radius is 90% of the width assigned to each circle, allows for 10% spacing between circles
  var circleRadius = (canvas.width / (numOfCircles * 2)) * 0.9
  var collumnWidth = (canvas.width / numOfCircles)
  //number of miliseconds for all circles to sync again
  var timeToSync = secondsToSync * 1000 //seconds

  for (var i = 0; i < numOfCircles; i++) {
    myCircleArray[i] = {
      x: (collumnWidth * i) + (collumnWidth / 2),
      y: canvas.height / 2,
      radius: circleRadius,
      columnX: (collumnWidth * i),
      borderWidth: 1,
      period: timeToSync / (10 + i)
    };

    //Draw the circle
    drawCircle(myCircleArray[i], context);
  }

  //The Window.requestAnimationFrame() method tells the browser that you wish
  //to perform an animation and requests that the browser call a specified function
  //to update an animation before the next repaint. The method takes as an argument
  //a callback to be invoked before the repaint.
  window.requestAnimFrame = (
    function(callback) {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    }
  )();

  // wait one second before starting animation
  setTimeout(function() {
    var startTime = (new Date()).getTime();
    for (var i = 0; i < numOfCircles; i++) {
      animate(myCircleArray[i], canvas, context, startTime);
    }
  }, 1000);

}

//Draws columns between the circles
function drawCollums(canvas) {
  var collumnWidth = (canvas.width / numOfCircles)

  for (var i = 1; i < numOfCircles; i++) {
    context.beginPath();
    context.moveTo(collumnWidth * i, 0);
    context.lineTo(collumnWidth * i, canvas.height);
    context.stroke();
  }

}

//Method to draw a circle on the canvas
function drawCircle(myCircle, context) {
  context.beginPath();
  context.arc(myCircle.x, myCircle.y, myCircle.radius, 0, 2 * Math.PI, false);
  context.fillStyle = circleColour;
  context.fill();
  context.lineWidth = myCircle.borderWidth;
  context.strokeStyle = 'black';
  context.stroke();
}

//Calculates the next position of the circle and updates myCircle accordingly
function animate(myCircle, canvas, context, startTime) {
  // update
  var time = (new Date()).getTime() - startTime;

  //max movement up & down
  var amplitude = (canvas.height / 2) - myCircle.radius;

  var centerY = canvas.height / 2;
  //algorithm used http://www.wolframalpha.com/input/?i=plot+50+*+sin%28100+*+2+*+PI+%2F+4000%29+%2B+x+from+x+%3D+-5+to+5
  var nextY = amplitude * Math.sin(time * 2 * Math.PI / myCircle.period) + centerY;
  myCircle.y = nextY;

  // clear the circles column
  var collumnWidth = (canvas.width / numOfCircles)
  context.clearRect(myCircle.columnX, 0, myCircle.columnX + collumnWidth, canvas.height);

  // draw00
  drawCircle(myCircle, context);

  // request new frame
  requestAnimFrame(
    function() {
      animate(myCircle, canvas, context, startTime);
    }
  );
}
