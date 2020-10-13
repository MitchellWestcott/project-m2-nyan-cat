// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // console.log(this.player);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    this.bonuses = [];
    // this.lasers = [];
    this.score = new Text(this.root, GAME_HEIGHT-460, GAME_WIDTH-780);
    this.initialScore = 0;
    this.score.update(`TWEETS AVOIDED: ${this.initialScore}`);
    this.encouragement = new Text(this.root, GAME_HEIGHT-460, GAME_WIDTH-745);
    this.encouragement.update('');

    this.coffees = new Text(this.root, 610, 10);
    this.motivation = 0;
    this.coffees.update(`Motivation: ${this.motivation}`);
    
    // this.score.update(`TWEETS AVOIDED: ${this.initialScore}`);
    // console.log(this.lasers);
    // We add the background image to the game
    addBackground(this.root);
  }


  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    if (this.initialScore >= 10 && this.initialScore <15) {
      this.encouragement.update(`I came here for memes what is this`);
    } else if (this.initialScore >= 35 && this.initialScore < 45) {
      this.encouragement.update(`oh my god are you kidding me`);
    } else if (this.initialScore >= 60 && this.initialScore < 80) {
      this.encouragement.update(`wow`);
    } else  if (this.initialScore >= 95 && this.initialScore < 105) {
      this.encouragement.update(`I really should just log off`); 
    } else {
      this.encouragement.update('');
    }

    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();

    
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
      });

    this.bonuses.forEach((bonus) => {
      bonus.update(timeDiff);
    });


    this.enemies = this.enemies.filter((enemy) => {
      if (enemy.destroyed) {
        this.score.update(`TWEETS AVOIDED: ${this.initialScore +=1}`);
      }
      return !enemy.destroyed;
    });

    this.bonuses = this.bonuses.filter((bonus) => {
      if (bonus.destroyed) {
      }
      return !bonus.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
      // this.bonuses.push(new Bonus(this.root, spot));
    }

    while (this.bonuses.length < BONUS_MAX) {
      const bonusSpot = nextBonusSpot(this.bonuses);
      this.bonuses.push(new Bonus(this.root, bonusSpot));
    }



    if (this.isPlayerDead()) {
      body.append(startGame);
      startGame.style.background = `url(images/losebutton.png) no-repeat center fixed`;
      this.initialScore = 0;
      return;
    }

    if (this.motivation > 275) {
      body.append(startGame);
      startGame.style.background = '#0827F5';
      startGame.style.width = '100vw';
      startGame.style.height = '100vh';
      startGame.innerText = `That's enough. \n Log Off.`;
      startGame.style.color = 'white';
      startGame.style.zIndex = '1000000';
      startGame.removeEventListener('mousedown');
      return;
    }

    if (this.getBonus()) {
      // add new text top right
      this.coffees.update(`Motivation: ${this.motivation += 1}`);
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };
  
  getBonus = () => {
    let gotBonus = false;
    this.bonuses.forEach((bonus) => {
      let playerModel = this.player;
      playerModel.width = PLAYER_WIDTH;
      playerModel.height = PLAYER_HEIGHT -80;
      let bonusModel = bonus;
      bonusModel.width = BONUS_WIDTH;
      bonusModel.height = BONUS_HEIGHT;
      if (
        playerModel.x < bonusModel.x + bonusModel.width &&
        playerModel.x + playerModel.width > bonusModel.x &&
        playerModel.y < bonusModel.y + bonusModel.height &&
        playerModel.y + playerModel.height > bonusModel.y) {
        // console.log("collision model working");
        // playAudio('./audio/placeholder')
        gotBonus = true;
        }
    })
    return gotBonus;
  }
  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.

  isPlayerDead = () => {
    let gameOver = false;
    this.enemies.forEach((enemy) => {
      let playerModel = this.player;
      playerModel.width = PLAYER_WIDTH;
      playerModel.height = PLAYER_HEIGHT;
      let enemyModel = enemy;
      enemyModel.width = ENEMY_WIDTH;
      enemyModel.height = ENEMY_HEIGHT;
      if (
        playerModel.x < enemyModel.x + enemyModel.width &&
        playerModel.x + playerModel.width > enemyModel.x &&
        playerModel.y < enemyModel.y + enemyModel.height &&
        playerModel.y + playerModel.height > enemyModel.y) {
        // console.log("collision model working");
        // playAudio('./audio/placeholder')
        gameOver = true;
        }
    })
    return gameOver;
  }
}
