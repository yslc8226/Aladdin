
var bg, bg2, bg3;
var aladdin, aladdinImg;
var genie, genieImg;
var carpet, carpetImg;
var playBttn, playBttnImg;
var gameState = "start";
var edges, rock, rock2, rockImg, rockGrp , rock2Img, rock2Grp;
var coin, coinImg, coinGrp;
var gameOver, gameoverImg;
var reset, resetImg;
var fire, fireImg, fireGrp;
var confetti, confettiImg;
var congrats,congratsImg;
var jafar, jafarImg;
var jasmine, jasmineImg;

var coinSnd, dieSnd, fireSnd, jumpSnd, resetSnd;
var score=0;
var lives=3;

function preload(){
    bgImg= loadImage("Images/bg0.jpg");
    bg2Img=loadImage("Images/bg1.jpg");
    bg3Img=loadImage("Images/bg2.jpg");
    aladdinImg=loadImage("Images/aladdin.png");
    genieImg=loadImage("Images/genie.png");
    carpetImg=loadImage("Images/Carpet.png");
    playBttnImg=loadImage("Images/PlayButton.png");
    rockImg=loadImage("Images/rock1.png");
    rock2Img=loadImage("Images/rock2.png");
    coinImg = loadImage("Images/coin.png");
    gameoverImg = loadImage("Images/gameOver.png");
    resetImg = loadImage("Images/reset.png");
    jafarImg = loadImage("Images/Jafar.png");
    fireImg = loadImage("Images/fire.png");
    jasmineImg = loadImage("Images/Jasmine.png");
    confettiImg = loadImage("Images/star.png");
    congratsImg = loadImage("Images/congrats.png");
  
    coinSound = loadSound("Sounds/coin.mp3");
    dieSound = loadSound("Sounds/die.mp3");
    fireSound = loadSound("Sounds/fire.mp3");
    jumpSound = loadSound("Sounds/jump.mp3");
    resetSound = loadSound("Sounds/reset.mp3");
    winSound = loadSound("Sounds/win.mp3");
  }

  function setup(){
    createCanvas(windowWidth, windowHeight);
    edges= createEdgeSprites();

    //start
    setStart()

    //level 1
    setLevelOne()

    //level 2
    setLevelTwo()

    //end
    setEnd()
  }

  function draw(){
    background("white");
    drawSprites();

    //start game state

    if(gameState==="start"){
      startState();
    }
    //level 1 GameState
    if(gameState==="levelOne"){
      playLevelOne();
    }
    //level 2 GameState
    if(gameState==="levelTwo"){
      playLevelTwo();
    }
    //End State
    if(gameState==="end"){
      endState();
    }
    //end2 State
    if(gameState==="end2"){
      end2State();
    }
    //win State
    if(gameState==="win"){
      win();
    }
  }

  function startState(){
    textSize(25);
    fill("blue");
    text("Instructions: \n 1. Use arrow keys to move Aladdin. \n 2.Avoid rocks and reach thousand score in Level 1 \n 3. You have to save Jasmine from Jafar in Level 2", width/2-250,height/2-50);
    bg.visible=true;
    carpet.visbile=true;
    aladdin.visible=true;
    genie.visible=true;
    playBttn.visible=true;

    if(mousePressedOver(playBttn)){
      resetSound.play();
      clear();
      gameState="levelOne";
    }
  }

  function setStart(){
    bg=createSprite(width/2,height/2,width,height);
    bg.addImage(bgImg);
    bg.visible=false;

    carpet=createSprite(width/2-400,height/2+250);
    carpet.addImage(carpetImg);
    carpet.visible=false;
    carpet.scale=0.8;

    genie=createSprite(width/2+400,height/2);
    genie.addImage(genieImg);
    genie.visible=false;
    genie.scale=0.8;

    playBttn=createSprite(width/2,height/2+125);  
    playBttn.addImage(playBttnImg);
    playBttn.visible=false;
    playBttn.scale=0.5;

    aladdin=createSprite(width/2-425,height/2);
    aladdin.addImage(aladdinImg);
    aladdin.visible=false;
    aladdin.scale=0.5;
  }

  function setLevelOne(){
    bg2=createSprite(width/2,height/2-350,width,height);
    bg2.addImage(bg2Img);
    bg2.scale=3.5;
    bg.visible=false;

    carpet2=createSprite(width/2-650,height-50);
    carpet2.addImage(carpetImg);
    carpet.setCollider("rectangle",0,-30,carpet.width-100,carpet.height-300);
    carpet2.scale=0.4;
    carpet2.visible=false;

    aladdin2=createSprite(width/2-650,height-100);
    aladdin2.addImage(aladdinImg);
    aladdin2.scale=0.2;
    aladdin2.visible=false;

    invisbleGround=createSprite(width/2,height-30,width,30);
    invisbleGround.visible=false;

    rockGrp=new Group();
    rock2Grp=new Group();
    coinGrp=new Group();
  }

  function playLevelOne(){
    bg2.visible=true;
    carpet2.visible=true;
    aladdin.visible=true;

    textSize(25);
    textStyle(BOLD);
    fill("black");
    text("Score: "+score,width-200,100);
    text("Level 1", width/2,50);

    if(keyDown(UP_ARROW)){
      aladdin2.velocityY=-10;
      carpet2.velocityY=-10;
    }

    if(keyDown(LEFT_ARROW)){
      aladdin2.x-=5;
      carpet2.x-=5;
    }
    if(keyDown(RIGHT_ARROW)){
      aladdin2.x+=5;
      carpet2.x+=5;
    }

    aladdin2.velocityY+=0.5;
    carpet2.velocityY+=0.5;

    carpet2.collide(edges);
    aladdin2.collide(edges);
    carpet2.collide(invisbleGround);
    aladdin2.collide(carpet2);

    if(score===1000){
      clear();
      rockGrp.destroyEach();
      rock2Grp.destroyEach();
      coinGrp.destroyEach();
      gameState="levelTwo";
    }

    for(var i=0; i<coinGrp.length; i++){
      if (coinGrp.get(i).isTouching(aladdin2)){
        coinSound.play();
        coinGrp.get(i).remove();
        score+=100;
      }
    }
     
    if(rockGrp.isTouching(aladdin2)||rock2Grp.isTouching(aladdin2)){
      dieSound.play();
      gameState="end";
    }

    rocks();
    createCoins();
  }

  function rocks(){
    if(frameCount%100===0){
      rock=createSprite(width,Math.round(random(50,height-350)),20,20);
      rock.addImage(rock1Img);
      rock.scale=0.1;
      rock.velocityX=-5;
      rock.lifetime=300;

      rock2=createSprite(-50,Math.round(random(50,height-350)),20,20);
      rock2.addImage(rock2Img);
      rock2.scale=0.4;
      rock2.velocityX=+5;
      rock2.lifetime=300;

      rock1Grp.add(rock);
      rock2Grp.add(rock2);
    }
  }

  function createCoins(){
    if(frameCount%100===0){
      coin=createSprite(Math.round(random(50,height-350)),-50,20,20);
      coin.addImage(coinImg);
      coin.scale=0.1;
      coin.velocityY=3;
      coin.lifetime=150;

      coinGrp.add(coin);
    }

  }

  function  setLevelTwo(){
    bg3=createSprite(width/2,height/2-350,width,height);
    bg3.addImage(bg3Img);
    bg3.scale=3;
    bg.visbile=false;

    carpet3=createSprite(width/2-650,height-50);
    carpet3.addImage(carpetImg);
    carpet3.setCollider("rectangle",0,-30,carpet.width-100,carpet.heght-300);
    carpet3.scale=0.4;
    carpet3.visbile=false;

    aladdin3=createSprite(width/2-650,height-100);
    aladdin3.addImage(aladdinImg);
    aladdin3.scale=0.2;
    aladdin3.visbile=false;

    jafar=createSprite(width-150,height/2,50,50);
    jafar.addImage(jafarImg);
    jafar.scale=0.5;
    jafar.visbile=false;

    jasmine=createSprite(width-300,height-100,50,50);
    jasmine.addImage(jasmineImg);
    jasmine.scale=0.2;
    jasmine.visbile=false;

    invisbleGround2=createSprite(width-300,height-100,50,50);
    invisbleGround2.visbile=false;

    fireGrp=new Group();
  }

  function playLevelTwo(){
    bg3.visible=true;
    carpet3.visible=true;
    aladdin3.visible=true;
    jasmine.visible=true;
    jafar.visible=true;

    jafar.velocityY=4;
    jafar.bounceOff(invisbleGround2);

    textSize(25);
    fill("white");
    textStyle(BOLD);
    text("LIVES: "+lives,width/2-700,100);

    text("LEVEL 2",width/2,50);

    if(keyDown(UP_ARROW)){
      aladdin3.velocityY=-10;
      carpet3.velocityY=-10;
    }

    if(keyDown(LEFT_ARROW)){
      aladdin3.x=aladdin3.x-5;
      carpet3.x=carpet3.x-5;
    }

    if(keyDown(RIGHT_ARROW)){
      aladdin3.x=aladdin3.x+5;
      carpet3.x=carpet3.x+5;
    }

    aladdin3.velocityY+=0.5;
    carpet3.velocityY+=0.5;

    carpet3.collide(edges);
    aladdin3.collide(edges);
    aladdin3.collide(carpet3);

    carpet3.collide(invisbleGround2);
    
    if(lives===0){
      dieSound.play();
      gameState="end2";

    }

    for(var i=0; i<fireGrp.length; i++){
      if(fireGrp.get(i).isTouching(aladdin3)){
        dieSound.play();
        fireGrp.get(i).remove();
        lives--;
      }
    }

    if(carpet3.isTouching(jasmine)){
      winSound.play();
      gameState="win";
    }

    createFire();

  }


function createFire(){
  if(frameCount%40===0){
    fire=createSprite(width-150,Math.round(random(50,height-50)),75,20);
    fire.velocityX=-25;
    fire.addImage(fireImg);
    fire.scale=0.2;
    fire.lifetime=1000;

    jafar.y=fire.y;

    fireGrp.add(fire);
    fireSound.play();
  }
}

function setEnd(){
    gameOver=createSprite(width/2,height/2,100,100);
    gameOver.addImage(gameoverImg);
    gameOver.scale=2;
    gameOver.visible=false;

    reset=createSprite(width/2,height/2,100,100);
    reset.addImage(resetImg);
    reset.scale=0.5;
    reset.visible=false;
}

function endState(){
  rockGrp.destroyEach();
  rockGrp2.destroyEach();
  coinGrp.destroyEach();
  aladdin2.setVelocity(0,0);
  carpet2.setVelocity(0,0);
  gameOver.visible=true;
  reset.visible=true;

  if(mousePressedOver(reset)){
    resetSound.play();
    score=0;
    gameState="levelOne"; 
    gameOver.visible=false;
    reset.visible=false;


  }
}

function end2State(){
  fireGrp.destroyEach();

  aladdin3.setVelocity(0,0);
  carpet3.setVelocity(0,0);
  jafar.setVelocity(0,0);

  gameOver.visible=true;
  reset.visible=true;

  if(mousePressedOver(reset)){
    resetSound.play();
    lives=3;
    gameState="levelTwo";
    gameOver.visible=false;
    reset.visible=false;
  }
}

function win(){
  fireGrp.destroyEach();

  aladdin3.setVelocity(0,0);
  carpet3.setVelocity(0,0);
  
  jafar.visible=false;
  reset.visible=true;

  if(frameCount%15===0){
    confetti=createSprite(Math.round(random(50,width-100)),-10,100,100);
    confetti.addImage(confettiImg);
    confetti.scale=0.1;
    confetti.velocityY=5;
  }

  imageMode(CENTER);
  image(congratsImg,width/2,height/2-150,500,300);

  if(mousePressedOver(reset)){
    resetSound.play();
    location.reload();
    
  }

}
  
