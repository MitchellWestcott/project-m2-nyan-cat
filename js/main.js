// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById('app'));

let body = document.getElementsByTagName('body')[0];
let appContainer = document.getElementById('app');

appContainer.style.position = `relative`;
appContainer.style.overflow = `none`;
appContainer.style.height = `480px`;
appContainer.style.width = `800px`;
// appContainer.style.border = `0px none`;
// appContainer.style.boxShadow = `box-shadow: 0px 0px 34px 2px rgba(255,234,0,0.3)`;

body.style.background = `#dafaf7`;
body.style.display = `flex`;
body.style.justifyContent = `center`;
body.style.alignItems = `center`;



// const GAME_WIDTH = 800;
// const GAME_HEIGHT = 480;


// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
// let down = false;
const keydownHandler = (event) => {
  // event.code contains a string. The string represents which key was press. If the
  // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)
  if (event.code === 'ArrowLeft') {
    gameEngine.player.moveLeft();
  }

  // If `event.code` is the string that represents a right arrow keypress,
  // then move our hamburger to the right
  if (event.code === 'ArrowRight') {
    gameEngine.player.moveRight();
  }

  // if (event.code === 'ArrowUp') {
  //   // gameEngine.lasers.fireLaser();
  //   playOnce('./audio/pewpew.wav');
  // }
};



// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener('keydown', keydownHandler);

// We call the gameLoop method to start the game
// gameEngine.gameLoop();

const startGame = document.createElement('button');
startGame.style.zIndex = '9000';
startGame.style.background = `url(images/startbuttonimg.png) no-repeat center fixed`;
startGame.style.width = GAME_WIDTH;
startGame.style.height = GAME_HEIGHT;
startGame.style.position = 'absolute';
startGame.style.border = 'none';
// startGame.style.borderRadius = '10px';
body.append(startGame);

function playOnce(url) {
  new Audio(url).play();
}

function playAudio(url) {
var myAudio = new Audio(url); 
myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
myAudio.play();
}

const controlMenu = document.createElement('button');
controlMenu.style.zIndex = `100000`;
controlMenu.style.background = `rgba(122, 121, 139, 0.61)`;
controlMenu.style.width = `840px`;
controlMenu.style.marginLeft = `20px`;
controlMenu.style.height = GAME_HEIGHT;
controlMenu.style.position = `absolute`;
controlMenu.style.border = `none`;
controlMenu.style.color = `white`;
controlMenu.style.fontSize = `50px`;
controlMenu.style.fontFamily = 'Luminari, fantasy'
controlMenu.innerText = `Left Arrow & Right Arrow \n are all you need \n Drink coffee to Motivate yourself to log off, about 275 coffees should do it. \n Press Space to clear \n Click to play`;
body.append(controlMenu);

// playAudio.addEventListener('mouseup', () => {
//     playAudio('./audio/bgmusic.wav');
// })

controlMenu.addEventListener('keyup', event => {
  if (event.code === 'Space') {
    controlMenu.remove();
    playAudio('./audio/bgmusic.mp3');
  }
})

startGame.addEventListener('mousedown', () => {
  gameEngine.gameLoop();
  startGame.remove();
  // playAudio('./audio/bgmusic.wav');
})
