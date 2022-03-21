class Game{
    constructor(){
        this.resetTitle = createElement("h2");
        this.resetButton = createButton("");

        this.leadeboardTitle = createElement("h2");

        this.leader1 = createElement("h2");
        this.leader2 = createElement("h2");
    }
    getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data) {
          gameState = data.val();
        });
      }
      update(state) {
        database.ref("/").update({
          gameState: state
        });
      }
    
      start() {
        player = new Player();
        playerCount = player.getCount();
    
        form = new Form();
        form.display();
    
        jet1 = createSprite(width / 2 - 50, height - 100);
        jet1.addImage("blackJet", blackJetImg);
        jet1.scale = 2
        jet1.addImage("blast", blastImage); //C42 //SA
    
        jet2 = createSprite(width / 2 + 100, height - 100);
        jet2.addImage("whiteJet", whiteJetImg);
        jet2.scale = 2
        jet2.addImage("blast", blastImage); //C42//SA
    
        jets = [jet1, jet2];
    
        /*fuels = new Group();
        powerCoins = new Group();
        obstacle1 = new Group(); 
        obstacle2 = new Group(); 
        var obstacle1Positions = [
          { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
          { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
          { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
         
          { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
          { x: width / 2, y: height - 5300, image: obstacle1Image },
        ];*/
        drawSprites();
    }
    handleElements() {
        form.hide();
        form.titleImg.position(40, 50);
        form.titleImg.class("gameTitleAfterEffect");
    
        this.resetTitle.html("Reset Game");
        this.resetTitle.class("resetText");
        this.resetTitle.position(width / 2 + 200, 40);
    
        this.resetButton.class("resetButton");
        this.resetButton.position(width / 2 + 230, 100);
    
        this.leadeboardTitle.html("Leaderboard");
        this.leadeboardTitle.class("resetText");
        this.leadeboardTitle.position(width / 3 - 60, 40);
    
        this.leader1.class("leadersText");
        this.leader1.position(width / 3 - 50, 80);
    
        this.leader2.class("leadersText");
        this.leader2.position(width / 3 - 50, 130);
      }
      play() {
        this.handleElements();
        this.handleResetButton();
        
    
        Player.getPlayersInfo();
        player.getJetsRank();
    
        if (allPlayers !== undefined) {
          
    
          
          
          this.showLeaderboard();
    
          //index of the array
          var index = 0;
          for (var plr in allPlayers) {
            //add 1 to the index for every loop
            index = index + 1;
    
            //use data form the database to display the cars in x and y direction
            var x = allPlayers[plr].positionX;
            var y = height - allPlayers[plr].positionY;
            console.log(x)
            console.log(y)
            /*if (currentlife <= 0) {
              cars[index - 1].changeImage("blast");
              cars[index - 1].scale = 0.3;
            }*/
            jets[index - 1].position.x = x;
            jets[index - 1].position.y = y-100;
    
            if (index === player.index) {
              stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
              
              
              /*if (player.life<=0){
                this.blast = true;
                this.playerMoving = false;
              }
              if (this.blast===true){
                this.gameOver
              }*/
              
    
              // Changing camera position in y direction
              camera.position.y = jets[index - 1].position.y;
            }
          }
    
          
    
          // handling keyboard events
          /*if (this.blast ===false){
            this.handlePlayerControls();
          }*/
          
          
        }
        drawSprites()
      }
      handleResetButton() {
        this.resetButton.mousePressed(() => {
          database.ref("/").set({
            carsAtEnd: 0,
            playerCount: 0,
            gameState: 0,
            palyers: {}
          });
          window.location.reload();
        });
      }
      showLeaderboard() {
        var leader1, leader2;
        var players = Object.values(allPlayers);
        if (
          (players[0].rank === 0 && players[1].rank === 0) ||
          players[0].rank === 1
        ) {
          // &emsp;    This tag is used for displaying four spaces.
          leader1 =
            players[0].rank +
            "&emsp;" +
            players[0].name +
            "&emsp;" +
            players[0].score;
    
          leader2 =
            players[1].rank +
            "&emsp;" +
            players[1].name +
            "&emsp;" +
            players[1].score;
        }
    
        if (players[1].rank === 1) {
          leader1 =
            players[1].rank +
            "&emsp;" +
            players[1].name +
            "&emsp;" +
            players[1].score;
    
          leader2 =
            players[0].rank +
            "&emsp;" +
            players[0].name +
            "&emsp;" +
            players[0].score;
        }
    
        this.leader1.html(leader1);
        this.leader2.html(leader2);
      }
    
      handlePlayerControls() {
        if (keyIsDown(UP_ARROW)) {
        
          player.positionY += 10;
          player.update();
        }
        if (keyIsDown(DOWN_ARROW)) {
        
            player.positionY -= 10;
            player.update();
          }
      
    
        if (keyIsDown(LEFT_ARROW) && player.positionX > 0) {
          
          player.positionX -= 5;
          player.update();
        }
    
        if (keyIsDown(RIGHT_ARROW) && player.positionX < width) {
          
          player.positionX += 5;
          player.update();
        }
      }
      
      gameOver() {
        swal({
          title: `Game Over`,
          text: "You lost!",
          imageUrl:
            "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
          imageSize: "100x100",
          confirmButtonText: "Play Again"
        });
      }
    }
