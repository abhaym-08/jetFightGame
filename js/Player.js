class Player{
    constructor(image){
        this.index = null;
        this.positionX = 0;
        this.positionY = 0;
        this.score = 0;
    }
    addPlayer() {
        var playerIndex = "players/player" + this.index;
    
        if (this.index === 1) {
          this.positionX = width / 2 - 100;
        } else {
          this.positionX = width / 2 + 100;
        }
    
        database.ref(playerIndex).set({
          name: this.name,
          positionX: this.positionX,
          positionY: this.positionY,
          rank: this.rank,
          /*score: this.score*/
          
        });
      }
      getPosition() {
        var playerDistanceRef = database.ref("players/player" + this.index);
        playerDistanceRef.on("value", data => {
          var data = data.val();
          this.positionX = data.positionX;
          this.positionY = data.positionY;
        });
      }
      getCount() {
        var playerCountRef = database.ref("playerCount");
        playerCountRef.on("value", data => {
          playerCount = data.val();
        });
      }
    
      updateCount(count) {
        database.ref("/").update({
          playerCount: count
        });
      }
    
      update() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).update({
          positionX: this.positionX,
          positionY: this.positionY,
          rank: this.rank,
          score: this.score,
                                       
        });
      }
    
      static getPlayersInfo() {
        var playerInfoRef = database.ref("players");
        playerInfoRef.on("value", data => {
          allPlayers = data.val();
        });
      }
      getJetsRank() {
        database.ref("carsAtEnd").on("value", data => {
          this.rank = data.val();
        });
      }
    
      static updateJetsRank(rank) {
        database.ref("/").update({
          jetsAtEnd: rank
        });
      }
    }
    
