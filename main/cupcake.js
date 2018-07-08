
var canvas1 = document.getElementById("canvas").getContext("2d");

var catcherOne = new Image();
var catcherTwo = new Image();
var catcherThree = new Image();
var catcherFour = new Image();
var background = new Image();
var blood = new Image();
var tile = new Image();
var food = new Image();

// Global Variables

  var score = 0;
  var level = 100;
  var animation = 0;
  var foodTimer = 0;
  var gameOver = false;
  var intervalVar;
  var foodList = [];
  var tileList = [];
  var foodDrop = [0,50,100,150,200,250,300,350,400,450];




  var tileObject = {
    'width' : 50,
    'height': 20
  }

  var foodObject = {
    'width' : 50,
    'height': 50,
    'speed':3
  }

  var catcherObject = {
    'x':100,
    'y':350,
    'width' : 30,
    'height': 50,
    'jump': 0,
    'jumpUnit': 5,
    'onair': false,
    'spd': 0,
    'leftPressed': false,
    'rightPressed': false,
    'gravity': 10,
    'safe': true
  }

background.onload = function() {
  blood.onload = function() {
    catcherOne.onload = function() {
      catcherTwo.onload = function() {
        catcherThree.onload = function() {
          catcherFour.onload = function() {
            food.onload = function() {
              tile.onload = function() {

                drawObject = function(object,x,y,width,height) {
                  canvas1.drawImage(object,x,y,width,height);
                }

                document.onkeydown = function(event) {
                  if (event.keyCode == 37 && catcherObject.x > 0) {
                    catcherObject.spd = -5;
                    catcherObject.leftPressed = true;
                  }
                  if (event.keyCode == 39 && catcherObject.x < 500 - catcherObject.width) {
                    catcherObject.spd = 5;
                    catcherObject.rightPressed = true;
                  }
                  // spacebar for jump. Catcher Object jumps 100 px
                  if (event.keyCode == 32 && !catcherObject.onair && catcherObject.y == 350) {
                    catcherObject.jump = 100;
                    catcherObject.onair = true;
                  }
                }

                document.onkeyup = function(event) {
                  if (event.keyCode == 37) {
                    catcherObject.leftPressed = false;
                  }
                  if (event.keyCode == 39) {
                    catcherObject.rightPressed = false;
                  }
                }


                jump = function() {
                  // condition to move catcher object up
                  if (catcherObject.jump > 0 && catcherObject.onair) {
                    catcherObject.y -= catcherObject.jumpUnit;
                    catcherObject.jump -= catcherObject.jumpUnit;
                  }
                  // condition to move catcher object back down
                  if (catcherObject.jump <= 0 && catcherObject.jump > -100 && catcherObject.onair) {
                    catcherObject.y += catcherObject.jumpUnit;
                    catcherObject.jump -= catcherObject.jumpUnit;
                  }
                }

                updateCatcherPosition = function(){
                  if(catcherObject.leftPressed && catcherObject.x > 0) {
                    catcherObject.x += catcherObject.spd;
                  }
                  if(catcherObject.rightPressed && catcherObject.x < 500 - catcherObject.width) {
                    catcherObject.x += catcherObject.spd;
                  }
                  if(catcherObject.jump <= -100 && catcherObject.onair) {
                    catcherObject.onair = false;
                  }
                }

                updatePosition = function() {
                  canvas1.clearRect(0,0,500,500);
                  drawObject(background,0,0,500,500);

                  if(catcherObject.onair){
                    drawObject(catcherFour,catcherObject.x,catcherObject.y,catcherObject.width,catcherObject.height);
                  }

                  // blinking eyes animation
                  else if (animation == 0) {
                    drawObject(catcherTwo,catcherObject.x,catcherObject.y,catcherObject.width,catcherObject.height);
                    animation = 1;
                  } else {
                    drawObject(catcherOne,catcherObject.x,catcherObject.y,catcherObject.width,catcherObject.height);
                    animation = 0;
                  }
                  for (var i=0;i<tileList.length;i++) {
                    drawObject(tile,tileList[i].x,tileList[i].y,tileObject.width,tileObject.height);
                  }

                  updateCatcherPosition();
                  jump();
                }
                // Game Area code here
                startGame = function()  {
                  score = 0;
                  level = 100;
                  catcherObject.x = 100;
                  catcherObject.y =350;
                  catcherObject.onair = false;
                  catcherObject.leftPressed = false;
                  catcherObject.rightPressed = false;
                  catcherObject.safe = true;
                  animation = 0;
                  foodTimer = 0;
                  gameOver = false;
                  tileList = [];
                  foodList = [];

                  for (var i=0;i<=9;i++) {
                    tileList.push({'x':i*50,'y':400});
                  }
                  intervalVar = setInterval(updatePosition,10);

                }

                startGame();


              }
              tile.src = "images/tile.png";
            }
            food.src = "images/food.png";
          }
          catcherFour.src = "images/catcher4.png";
        }
        catcherThree.src = "images/catcher3.png";
      }
      catcherTwo.src = "images/catcher2.png";
    }
    catcherOne.src = "images/catcher1.png";
  }
  blood.src = "images/blood.png";
}
background.src = "images/background.jpg";
