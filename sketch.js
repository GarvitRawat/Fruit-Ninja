// Creating the variable for the fruits
var fruit

// Creating the variable for the fruits images
var fruit1Image, fruit2Image, fruit3Image, fruit4Image

// Creating the variable for the aliens
var alien

// Creating the variable for the alines images
var alienImage, alien2Image

// Creating the variable for the knife and its image
var knife, knifeImage

// creating variables for the game
var number, randomX, randomY, randomNumber, xpos, ypos, score = 0, PLAY = 1, END = 0, gameState = PLAY, gameover, gameoverImage, rand

// creating groups for the game
var fruitGroup, alienGroup

// loading Sounds for the game
var hit, gameOverSong

function preload() {
  // Add Images to all the sprites
  // Knife
  knifeImage = loadImage("sword.png")

  // Alien
  alien1Image = loadImage("alien1.png")
  alien2Image = loadImage("alien2.png")

  // Fruits
  fruit1Image = loadImage("fruit1.png")
  fruit2Image = loadImage("fruit2.png")
  fruit3Image = loadImage("fruit3.png")
  fruit4Image = loadImage("fruit4.png")

  fruit1Image.scale = 0.1
  fruit2Image.scale = 0.1
  fruit3Image.scale = 0.1
  fruit4Image.scale = 0.1
  
  gameoverImage = loadImage("gameover.png")
  
  hit =  loadSound("knifeSwooshSound.mp3")
  gameOverSong = loadSound("gameover.mp3")
}

function setup() {
  createCanvas(400, 400);
  
  gameOver = createSprite(200, 200 ,20, 20)
  gameOver.addImage(gameoverImage)
  gameOver.scale = 0.6
  gameOver.visible = false
  
  knife = createSprite(200, 200, 20, 20)
  knife.addImage("knife", knifeImage)
  knife.scale = 0.5
  knife.debug = false
  knife.setCollider("circle", 0, 0, 50)
  
  fruitGroup = new Group()
  alienGroup = new Group()
  
}

function draw() {
  background(220);
  
    alienGroup.setVelocityYEach(3)
    
  if (gameState === PLAY){
    knife.y = mouseY
    knife.visible = true
    knife.x = mouseX
    spawnFruits()
    spawnEnemy()
    
  }
  
 if (gameState === END){
   score = 0
   gameOver.visible = true
   knife.visible = false
   alienGroup.setVelocityYEach(0)
   fruitGroup.setVelocityYEach(0)
   fruit.lifetime = -1
   alien.lifetime = -1
   
 }
  
  if (knife.isTouching(fruitGroup)){
    fruitGroup.destroyEach()
    score = score + 1
    hit.play();
  }
  
  if (knife.isTouching(alienGroup)){
    alienGroup.destroyEach()
    gameOverSong.play();
    gameState = END
  }
  
  text("Score: "+ score, 300, 30)
  

  drawSprites()
}

function spawnFruits() {
  
  randomX = Math.round(random(10, 370))
  randomY = Math.round(random(10, 350))
  
  if (frameCount % 80 === 0) {
    fruit = createSprite(randomX, -10, 20, 20)
    
    
    rand = Math.round(random(1, 2))
    if (rand === 1){
      fruit.y = -10
      fruit.velocityY = 3 + score/10
    }else if (rand === 2){
      fruit.y = 400
      fruit.velocityY = -3 - score/10
    }

    number = Math.round(random(1, 4))

    switch (number) {
      case 1:
        fruit.addImage(fruit1Image)
        break;
      case 2:
        fruit.addImage(fruit2Image)
        break;
      case 3:
        fruit.addImage(fruit3Image)
        break;
      case 4:
        fruit.addImage(fruit4Image)
        break;
      default:
        break;
    }
    
    fruit.scale = 0.2
    fruit.lifetime = 80
    fruitGroup.add(fruit)
   
  }

}

function spawnEnemy() {
  
  randomNumber = Math.round(random(1, 2))
  xpos = Math.round(random(10, 370))
  ypos = Math.round(random(10, 350))
  
  if (frameCount % 120 === 0){
    alien = createSprite(xpos, -10, 20, 20)
    
    
    switch (randomNumber) {
        case 1:
        alien.addImage(alien1Image)
        break;
        case 2:
        alien.addImage(alien2Image)
        
    }

    alien.scale = 0.9
    alien.lifetime = 80
    alienGroup.add(alien)
    
  }


}