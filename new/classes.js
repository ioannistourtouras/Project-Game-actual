class Player {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

}

class Spaceship extends Player {
    constructor(canvasWidth, canvasHeight) {
    const w = 80
    const h = 80
    const x = canvasWidth/2 - w/2
    const y = canvasHeight - h
    super(x, y, w, h)
    //this.img = img
    }

    draw() {
        image(shipImg, this.x, this.y, this.w, this.h)
    }

    move() {      
      if (keyIsDown(LEFT_ARROW) && this.x >= 10) {
        this.x -= 10
      } else if (keyIsDown(RIGHT_ARROW) && this.x <= width - (this.w + 10)) {
        this.x += 10
      }
    }
    
    collidesWithObstacles() {
     // console.log(obstacles, spaceship)
      
      return !!obstacles.array.find(obstacle => collision(obstacle, this))
      
    }
} 

class Obstacles extends Player {
  constructor() {
    const w = 30
    const h = 120
    const x = random(0, 501)
    const y = 0 
    super(x, y ,w, h)
    this.score = 0
    this.array = []    
  }

  draw() {
    /*translate(width/2, height/2)
    rotate(PI)*/    
    image(missileImg, this.x, this.y, this.w, this.h)
  }

  addObstacle() {
    this.array.push(new Obstacles(this.x, this.y, this.w, this.h))
  }

  update() {
    
    const every120Frames = frameCount % (60 * 2) === 0
    
    
    if(this.array.length < 3 && every120Frames) {
      //console.log(every120Frames)
      this.addObstacle()
    }

    this.array.forEach((obstacle, index) => {
      obstacle.y += 4
      if(obstacle.y >= height) {
        this.score += 100
        scoreElem.innerText = this.score
        this.array.splice(index, 1)
        this.addObstacle()
      }
      obstacle.draw()
    })
    textSize(30)
    text(`Score: ${this.score}`, canvasWidth / 2, canvasHeight / 2)
  }
}

/*class Laser extends Player {
  constructor() {
    super(x, y, w, h)
    this.speed = 10
    this.array = []
  }

  draw() {

  }
}*/