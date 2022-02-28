const startDisplay = document.querySelector('.game-intro')
let bg
const gameBoard = document.querySelector('#game-board')
let shipImg
let canvasWidth
let canvasHeight
let spaceship
let obstacles
let missileImg
const gameOver = document.getElementById('game-over')
const gameOverElem = gameOver.querySelector('.gameover-text')
let scoreElem = document.getElementById('score-elem')

function preload() {
    bg = loadImage('../assets/gameBoard.jpg')
    shipImg = loadImage("../assets/Ship1.png")
    missileImg = loadImage("../assets/asteroid2.png")
}

function setup() {
    const canvas = createCanvas(800, 600)
   // canvas.style('display', 'block')
    canvas.parent('game-board');  
    noLoop() 
    console.log(bg)
    spaceship = new Spaceship(800, 600)   
    obstacles = new Obstacles()
    //laser = new Laser()
}

/*function keyPressed() {
    if (keyCode === UP_ARROW) {
        
    }
}*/
/*function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
           this.x += 10;
  } else if (keyCode === LEFT_ARROW ) {
           this.x -= 10
  }
}*/

function draw() {
    background(bg)
    spaceship.draw()
    //translate(windowWidth, windowHeight)
    spaceship.move()
    
    obstacles.update()
    if(spaceship.collidesWithObstacles()) {
      return toggleGameOver()
    }
}

function toggleGameOver() {
  noLoop()
  gameBoard.style.display = 'none'
  startDisplay.style.display = 'none' // we set it to none and have only one bg img and
  gameOver.style.display = 'flex' // they do not collide with each other
  gameOverElem.innerText = `Your final score is ${obstacles.score}`

  spaceship = new Spaceship(canvasWidth, canvasHeight)
  obstacles = new Obstacles()
}

function collision(rect1, rect2) {
 // console.log("inside collision", rect1, rect2)
  return (  
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y
  )
}

window.onload = () => {

    gameBoard.style.display = 'none'
    gameOver.style.display = 'none'
    document.getElementById('start-button').onclick = () => {
      startGame();
    };
    document.getElementById('restart-button').onclick = () => {
      setup();// in order to get drawn the ship, we need the function
      // setup, which creates an instance of the object ship, and then the draw fnc draws it.
      startGame();
    }
    
    function startGame() {    
      startDisplay.style.display = 'none'
      gameOver.style.display = 'none'
      gameBoard.style.display = 'flex'
      loop() // calls the function draw()
    }
  };