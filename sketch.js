var PLAY=1
var END=0
var gameState=PLAY
var ground,groundImage,InvisibleGround
var girl,girlRunning,girlCollided,girlImage
var zombie,zombieRunning,zombieAttacks
var obstaclesGroup,obstacles1,obstacles2,obstacles3,obstacles4
var score=0
var gameOver,restart,gameOverImage,restartImage
var jumpSound,dieSound,checkPointSound


function preload(){
   ground_image=loadImage("Background.png");
     girl_running=loadAnimation("Run(1).png","Run(2).png","Run(3).png","Run(4).png","Run(5).png","Run(6).png",
     "Run(7).png","Run(8).png","Run(9).png","Run(10).png","Run(11).png","Run(12).png","Run(14).png",
     "Run(15).png","Run(16).png","Run(17).png","Run(18).png","Run(19).png","Run(20).png");
     zombie_running=loadAnimation("Walk(1).png","Walk(2).png","Walk(3).png","Walk(4).png","Walk(5).png",
     "Walk(6).png","Walk(7).png","Walk(8).png","Walk(9).png","Walk(10).png");
     zombie_attack=loadAnimation("Attack(2).png","Attack(3).png","Attack(4).png","Attack(5).png",
     "Attack(6).png","Attack(7).png","Attack(8).png");
     obstacle1=loadImage("obstacle1.png");
     zombie_idle=loadImage("Stand.png");
     jumpSound = loadSound("jump.mp3")
     dieSound = loadSound("die.mp3")
     checkPointSound = loadSound("checkPoint.mp3")
     gameOverImage=loadImage("gameOver1.png");
     restartImage=loadImage("restart1.png");
     girl_collided=loadImage("Dead(30).png");
     girlImage=loadImage("Idle(1).png");
   }

   function setup() {
      createCanvas(600,500);
       
     ground=createSprite(0,0,0,0);
       ground.shapeColor="white";
     ground.addImage("ground_image",ground_image);
     ground.scale=1.4;
        ground.velocityX=-1
       
        girl=createSprite(300,420,600,10);
       girl.addAnimation("girl_running",girl_running);
       girl.addImage("girl_collided",girl_collided);
       girl.addImage("girlImage",girlImage);
       girl.scale=0.2;
      // girl.velocityX=2;
       girl.debug=false;
       girl.setCollider("rectangle",0,0,girl.width,girl.height)
       
       
       zombie=createSprite(50,410,600,10);
       zombie.addAnimation("zombie_running",zombie_running);
       zombie.addAnimation("zombie_attack",zombie_attack);
       zombie.addImage("zombie_idle",zombie_idle);
       zombie.scale=0.2;
       zombie.debug=false;
      InvisibleGround=createSprite(300,470,600,10)
      InvisibleGround.visible=false
      gameOver=createSprite(300,100)
      gameOver.addImage(gameOverImage)
      restart=createSprite(300,180)
      restart.addImage(restartImage)
      obstaclesGroup=new Group()
      score=0
      }


function draw() {
 background("black");
  girl.velocityY=girl.velocityY+0.8
  girl.collide(InvisibleGround)
  zombie.velocityY=girl.velocityY+0.8
  zombie.collide(InvisibleGround)
 if(gameState===PLAY){
gameOver.visible=false
restart.visible=false
score=score+1
spawnObstacles()
if(obstaclesGroup.isTouching(zombie)){
  zombie.velocityY=-12
}
ground.velocityX=-(4+3*score/50)
if(ground.x<0){
  ground.x=ground.width/2
}
if(score>0 && score%50===0){
  checkPointSound.play()
}
if(keyDown ('space')&& girl.y>=220){
girl.velocity=-12
jumpSound.play()
}
if(girl.isTouching(obstaclesGroup)){
  gameState=END
dieSound.play()
}
}
else if(gameState===END){
gameOver.visible=true
restart.visible=true
ground.velocityX=0
ground.velocity=0
girl.changeImage('girlImage',girlImage)
zombie.changeAnimation('zombieAttack',zombie_attack)
obstaclesGroup.setLifetimeEach(-1)
obstaclesGroup.setVelocityXEach(0)

}
 
  
 
  drawSprites();
  fill("lightpink");
  textSize(20);
   text("Score: "+ score, 500,50);
}

function spawnObstacles(){
  if(frameCount%60===0){
var obstacles=createSprite(600,460,10,40)
obstacles.velocityX=-6
var rand=Math.round(random(1,4))
obstacles.addImage(obstacle1)
obstacles.scale=0.1
obstaclesGroup.add(obstacles)
obstacles.setCollider("circle",0,0,1)
  }
}
function reset(){
  gameState=PLAY
gameOver.visible=false
restart.visible=false
girl.changeAnimation('girlRunning',girl_running)
obstaclesGroup.destroyEach()
score=0
zombie.X=50
}