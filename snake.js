var s;
var loc = 20;
var food;
var score = 0;
// var timer = new Date();

function setup() {
  createCanvas(400, 400);
  frameRate(10);
  pickLocation();
  s = new Snake();
};

function draw() {
  background(55);
  s.update();
  s.show();
  if (s.eat(food)){
    pickLocation();
    s.total += 1;
  }
  fill(255, 0, 100);
  rect(food.x, food.y, loc, loc);
};

function keyPressed(){
  if(s.xspeed){
    if(keyCode === UP_ARROW){
      s.dir(0, -1);
    }else if (keyCode === DOWN_ARROW){
      s.dir(0, 1);
    }
  }else{
    if (keyCode === RIGHT_ARROW){
      s.dir(1, 0);
    }else if (keyCode === LEFT_ARROW){
      s.dir(-1, 0);
    }
  };
};

function pickLocation(){
  var rows = floor(width/loc);
  var cols = floor(height/loc);
  
  food = createVector(floor(random(rows)), floor(random(cols)));
  food.mult(loc);
};

function Snake(){
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  
  this.update = function(){
    var isDead = this.death();

    if(!isDead){
      if (this.total === this.tail.length){
        for (var i = 0; i < this.tail.length - 1; i++){
          this.tail[i] = this.tail[i+1];
        }
      } 
      this.tail[this.total - 1] = createVector(this.x, this.y);
      this.x = this.x + this.xspeed*loc;
      this.y = this.y + this.yspeed*loc;
    }else{
      //Speed reduces to zero for both directions when the snake is dead.
      this.xspeed = 0;
      this.yspeed = 0;
    }
    this.x = constrain(this.x, 0, width-loc);
    this.y = constrain(this.y, 0, height-loc);
  };
  
  this.show = function(){
    fill(255);
    for (var i = 0; i < this.tail.length; i++){
        rect(this.tail[i].x, this.tail[i].y, loc, loc);
    }
    rect(this.x, this.y, loc, loc);
  };
  
  this.dir = function(x, y){
    this.xspeed = x;
    this.yspeed = y;
  };
  
  this.eat = function(pos){
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1){
      return true;
    }else{
      return false;
    }
  };
  //When Snake collide with it's own body.
  this.death = function(){
    for(var i=0; i < this.tail.length; i++){
      if(dist(this.x, this.y, this.tail[i].x, this.tail[i].y) < 0.01){
        return true;
      }
    }
    return false;
  };
};