const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var player, playerBase, playerArcher, arrow;
var baseimage;
var arrows = [];

var board1, board2;

function preload() {
  backgroundImg = loadImage("assets/background.png");
  baseimage = loadImage("assets/base.png");
  playerimage = loadImage("assets/player.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  var player_options = {
    isStatic: true
  }

  //create player base body
  playerBase = Bodies.rectangle(200, 380, 100, 150, player_options);
  World.add(world, playerBase);

  //create player body
  player = Bodies.rectangle(230, playerBase.position.y - 160, 50, 180, player_options);
  World.add(world, player);

  playerArcher = new PlayerArcher(300, 275, 100, 75, -90);

  board1 = new Board(width - 300, 330, 50, 200);
  board2 = new Board(width - 550, height - 300, 50, 200);
}

function draw() {
  background(backgroundImg);

  //show the player image using image() function
  image(playerimage, player.position.x, player.position.y, 50, 180);

  //show the playerbase image using image() function
  image(baseimage, playerBase.position.x, playerBase.position.y, 100, 150);

  playerArcher.display();

  Engine.update(engine);

  // Title
  push();
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);
  pop();

  push();
  fill(255);
  textSize(20);
  text("Press Right Arrow to shoot.", 10, 20);
  pop();

  for (var i = 0; i < arrows.length; i++) {
    showArrows(arrows[i]);
  }

  board1.display()
  board2.display();

  checkCollision();
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    arrow = new Arrow(330, 277, 75, 25, playerArcher.angle);
    arrow.trajectory = [];
    Matter.Body.setAngle(arrow.body, playerArcher.angle);
    arrows.push(arrow);
    console.log("arrow ready");
  }
}

function checkCollision() {
  for (var i = 0; i < arrows.length; i++) {
    if (arrows[i] === undefined) {
      arrows[i].display();

      d1 = dist(playerArrows[i].body.position.x, playerArrows[i].body.position.y, board1.body.position.x, board1.body.position.y)
      if (d1 <= 100) {
        console.log("collision");
      }

      var board1Collision = Matter.SAT.collides(
        board1.body,
        playerArrows[i].body
      );

      var board2Collision = Matter.SAT.collides(
        board2.body,
        playerArrows[i].body
      );

      if (board1Collision.collided || board2Collision.collided) {
        console.log("yes");
      }
    }
  }
}

function showArrows(arrow) {
  if (arrow) {
    arrow.display();
  }
}

function keyReleased() {
  if (keyCode == RIGHT_ARROW) {
    arrow.shoot(playerArcher.body.angle);
    console.log("shot arrow");
  }
}