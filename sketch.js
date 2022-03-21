var gameState;
var backgroundImg, blackJetImg, whiteJetImg;
var database, allPlayers, blastImage, form, player, playerCount
var jets = []
var jet1, jet2;

function preload(){
  blackJetImg = loadImage("black-jet.png")
  whiteJetImg = loadImage("white-jet.png")
  backgroundImg = loadImage("graySquare.png")
  blastImage = loadImage("blast.png")


}


function setup() {
  createCanvas(windowWidth, windowHeight);
  createSprite(400, 200, 50, 50);

  database = firebase.database()

  game = new Game();
  game.getState();
  game.start();



}
function draw() {
  background(backgroundImg); 
  if (playerCount === 2){
    game.update(1)
    
  }
  if (gameState===1){
    game.play()
  }
  if (gameState===2){
    game.showLeaderboard()
    game.end()
  }
  
  


}