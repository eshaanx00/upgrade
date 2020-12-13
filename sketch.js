var ghost ,ghostimg,gJ
var invisG
var game="play"
var oB,oBimg,oBG
var score = 0
var backgroundImg
var bg="bg2.jpg"
function preload(){
ghostimg = loadImage("ghost-standing.png")
oBimg=loadImage("door.png")
gJ=loadImage("ghost-jumping.png")
getbg();
}

function setup() {
    createCanvas(600,400)
 ghost = createSprite(100,300,50,50)
 ghost.addImage("ghost",ghostimg)
 ghost.scale=0.4
 invisG = createSprite(300,360,600,15)
 invisG.visible=false
 oBG=createGroup();
 ghost.debug=false
 ghost.setCollider("rectangle",0,0,196,300)
}

function draw() {
    if(backgroundImg)
    background(backgroundImg)
    fill("green")
    text("score "+score,20,20)
  
    if(game==="play"){
if(keyDown("up")&&ghost.y>290){
    //console.log(ghost.y)
ghost.velocityY=-15

}
sO();
score=score+Math.round(frameCount/300)

ghost.velocityY=ghost.velocityY+1
if(oBG.isTouching(ghost)){
game = "end"
oBG.destroyEach();
}
    }
    else if(game==="end"){
        textSize(20)
text("I AM SORRY BUT U LOOSE",200,200)
text("YOUR SCORE WAS "+score,200,300)
ghost.visible=false
text("PRESS SPACE TO RESET",200,150)
if(keyDown("space")){
    game="play"
    ghost.visible=true
    score=0
}
    }
    
    ghost.collide(invisG);
    
drawSprites();
}
function sO(){
    if(frameCount%100===0){
oB=createSprite(600,330,0,0)
oB.addImage("Ob",oBimg)
oB.velocityX=-(6+score/100)
oB.lifetime=500
oBG.add(oB)
oB.scale=0.6
    }
}
async function getbg(){
    var locate=await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var n12= await locate.json();
    var hour=n12.datetime
    var hour1=hour.slice(11,13);
    if(hour1>=06&&hour1<=16){
bg="bg.png"
    }
    else{
        bg="bg2.jpg"
    }
    backgroundImg=loadImage(bg);
}
