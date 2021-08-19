var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;


var pinkCGroup,yellowCGroup,redCGroup;
var pinkCGImg,yellowCGImg,redCGImg,pinkCGImg2,yellowCGImg2,redCGImg3;

var redcyclist,yellowcyclist,pinkcyclist;

var cyclebell;

var gameoverImage,gameover;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

var obstacle,obstacle1,obstacle2,obstacle3;
function preload(){
  
  obstacle1=loadImage("images/obstacle1.png")
    obstacle2=loadImage("images/obstacle2.png")
    obstacle3=loadImage("images/obstacle3.png")
  
  pathImg = loadImage("images/Road.png");
  
  
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadImage("images/mainPlayer3.png");
  
  
  
  gameoverImage=loadAnimation("images/gameOver.png")
  pinkCGImg=loadAnimation("images/opponent1.png","images/opponent2.png");
  pinkCGImg2=loadImage("images/opponent3.png")
  
  yellowCGImg=loadAnimation("images/opponent4.png","opponent5.png");
  
  redCGImg=loadAnimation("images/opponent7.png","images/opponent8.png")
  
  cyclebellsound=loadSound("sound/bell.mp3");
}

function setup(){
  
createCanvas(displayWidth/2,displayHeight/2);
  
// Moving background
path=createSprite(100,150)
path.addImage(pathImg);
//path.velocityX = -(5+2*distance/150);

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
  pinkCG = createGroup();
  yellowCG =createGroup();
  redCG=createGroup();
  obstaclesGroup=createGroup();
  
    mainCyclist.setCollider("rectangle",0,0,200,mainCyclist.height/2);
  mainCyclist.debug=false;
  
  gameover=createSprite(250,150)
      gameover.addAnimation("gameover",gameoverImage)
}

function draw() {
  
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);


  
  if(gameState===PLAY){
    
    path.velocityX = -(5+2*distance/150);
   gameover.visible=false;
    distance=distance+Math.round(getFrameRate()/50);
  spawnopponent();
    opponent2();
   
    
    if(pinkCG.isTouching(mainCyclist)|| yellowCG.isTouching(mainCyclist)|| redCG.isTouching(mainCyclist)){
    
      gameState=END;
      
    }
    opponent3();
   mainCyclist.y = World.mouseY;
    
    if(keyDown("space")){
      
      cyclebellsound.play();
    }
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
    
    
    
  }
  }
    else if(gameState===END){
      
      text("press up arrow to restart",150,200)
      gameover.visible=true;

      gameover.x=camera.x
     
      if(keyDown("UP_ARROW")){
       
        reset();
       
      }
    
    
      pinkCG.destroyEach();
      path.velocityX=0
      mainCyclist.VelocityX=0;
      pinkCG.setVelocityXEach(0);
      
      pinkCG.setLifetimeEach(-1)
      
       yellowCG.destroyEach();
      path.velocityX=0
      mainCyclist.VelocityX=0;
      yellowCG.setVelocityXEach(0);
      
      yellowCG.setLifetimeEach(-1)
      
       redCG.destroyEach();
      path.velocityX=0
      mainCyclist.VelocityX=0;
     redCG.setVelocityXEach(0);
      
      redCG.setLifetimeEach(-1)
      
      
      
      
      
    }
    
 mainCyclist.x=camera.x
 camera.velocityX=5
}

function reset(){
 gameState=PLAY
  gameover.visible=false;
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  distance=0;
 }

function spawnopponent(){
  if(frameCount % 300 === 0) {
     pinkcyclist = createSprite(500,165,10,40);
    pinkcyclist.addAnimation("opponent1",pinkCGImg)
    pinkcyclist.scale=0.06;
    pinkcyclist.y=Math.round(random(50,250));
    pinkcyclist.velocityX=-(5+2*distance/150);
    
    
  pinkcyclist.lifetime=100;
    pinkCG.add(pinkcyclist)
   
  }
  

}
  function opponent2(){
  
  if(frameCount%170===0){
    
   yellowcyclist = createSprite(500,165,10,40);
    yellowcyclist.addAnimation("opponent2",yellowCGImg)
    yellowcyclist.scale=0.06;
    yellowcyclist.y=Math.round(random(50,250));
    yellowcyclist.velocityX=-(5+2*distance/150);
    
  yellowcyclist.lifetime=100;
    
    yellowCG.add(yellowcyclist)
    
   
  }
      
  }
function opponent3(){
  if(frameCount%220===0){
  redcyclist = createSprite(500,165,10,40);
    redcyclist.addAnimation("opponent2",redCGImg)
    redcyclist.scale=0.06;
   redcyclist.y=Math.round(random(40,250));
    redcyclist.velocityX=-(5+2*distance/150);
    
  redcyclist.lifetime=100;
 redCG.add(redcyclist)
  }
  
}