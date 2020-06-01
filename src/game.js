// Importing libraries 
import { PIXI } from 'expo-pixi';
import { Container, extras, Sprite } from 'pixi.js';
import { AsyncStorage, PixelRatio } from 'react-native';

// Importing backgrounds and assets 
import source2 from '../assets/ground2.png';
import source3 from '../assets/guards/guards6.png';
import groundSouce from '../assets/ground/ground3.png';
import penguinSource from '../assets/penguin/penguin1.png';


// Importing sprites 
import setupSpriteSheetAsync from './setupSpriteSheetAsync';
import sprites from './sprites';
import sprites2 from './Sprites/spriteSheet';
import sprites3 from './Sprites/guardSheet';
import groundSprites from './Sprites/ground';
import penguinSprites from './Sprites/penguin';


// Getting scale to adjust size of the game to different screen sizes, Using PixelRatio library 
const scale = PixelRatio.get();

//Level Settings
let crnt_level = 1; 

// Game settings Configurations
let Settings = {
  playerFallSpeed: 0 * scale,
  playerHorizontalPosition: 640 * scale,
  playerVerticalPosition: 650 * scale,
  playerMaxVelocity: -3 * scale,
  pipeWidth: 80 * scale,
  groundHeight: 100 * scale,
  pipeHeight: 500 * scale,
  playerGravity: 0 * scale,
  minPipeHeight: 50 * scale,
  pipeVerticalGap: 190 * scale, //180 is pretty legit
  gameSpeed: 15 * 0.25,
  guardWidth: 140 * scale,
  guardHeight: 140 * scale
};


// Parent class for not moving objects
class SteadySprite extends Sprite {
  constructor(...args) {
    super(...args);
    this.scale.set(scale);
  }
}

// Ground object 
class Ground2 extends Sprite {

  buttonIsPressed = false;
  groundDown = false; 

  constructor(texture) {
    super(texture, Settings.width, Settings.groundHeight);
    this.scale.set(scale * 2);

    
    // this.height = Settings.guardHeight;
    this.width = 1200 * scale;
    this.position.x = 100;
    this.position.y = Settings.skyHeight*0.7;

  }

}

// Object clouds on the side 
class SideClouds extends Sprite {

  backward = true;

  buttonIsPressed = false;

  constructor(texture) {
    super(texture, Settings.width, Settings.groundHeight);
    this.scale.set(scale * 2);


    // this.height = Settings.guardHeight;
    this.width = 1275 * scale;
   // this.height = 500;
    this.position.x = 0;
    this.position.y = Settings.skyHeight*0.7;

  }

}

// Bottom Clouds #TODO Rename it to something more generic
class Cloud extends Sprite {

  backward = true;

  buttonIsPressed = false;

  constructor(texture) {
    super(texture, Settings.width, Settings.groundHeight);
    this.scale.set(scale * 2);
    
    this.width = 1280 * scale;
    this.position.x = 0;
    this.position.y = Settings.skyHeight;
  }

}

// Message When user hold buttong for too long 
class CaughtMessage extends Sprite {

  backward = true;

  buttonIsPressed = false;

  constructor(texture) {
    super(texture, Settings.width, Settings.groundHeight);
    this.scale.set(scale * 2);

    //TODO Make it scalable 
    this.width = 300;
    this.height = 350;
    this.position.x = 600 * scale;
    this.position.y = Settings.skyHeight ;

  }

}

// Guard Object 
class Guard extends Sprite {
  //TODO COmment it, delete unnessary one 
  backward = true;
  buttonIsPressed = false; 
 
  constructor(texture) {
    super(texture, Settings.width, Settings.groundHeight);
    this.scale.set(scale * 2);

    this.width = Settings.guardWidth;
    this.height = Settings.guardHeight;

    this.position.x = 600 * scale;
    this.position.y = 600 * scale; 
  }
}

// Background object 
class Background extends SteadySprite {
  constructor(texture) {
    super(texture);
    this.position.x = 0;
    this.position.y = 0;
    this.width = Settings.width;
    this.height = Settings.height;
  }
  moveGround = false; 
}

// Poppi object 
class Bird extends AnimatedSprite {
 
  moveBird = false; 

  constructor(textures) {
    super(textures);
    this.animationSpeed = 0.02;
    this.anchor.set(0.5);
    this.width = 50 * scale;
    this.height = 45 * scale;

    this.speedY = Settings.playerFallSpeed;
    this.rate = Settings.playerGravity;

    this.restart();
  }

  // Restarts position 
  restart = () => {
    this.play();
    this.rotation = 0;
    this.position.x = Settings.playerHorizontalPosition;
    this.position.y = Settings.playerVerticalPosition;
  };

}

let bird; 

class Game {
  
  //States of the game 
  stopAnimating = true;
  isStarted = false;
  isDead = false;
  score = 0;
  isButtonReleased = false; 
  userLost = false;
  
  this_guard;
  this_background; 

  constructor(context, background, guard) {
    // Sharp pixels
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    this.this_guard = guard;
    this.this_background = background;

    this.app = new PIXI.Application({
      context,
      autoResize: false,
      width: context.drawingBufferWidth / 1,
      height: context.drawingBufferHeight / 1,
    });

    this.app.ticker.add(this.animate);

    Settings.width = this.app.renderer.width;
    Settings.pipeScorePosition = -(Settings.width - Settings.playerHorizontalPosition);
    Settings.height = this.app.renderer.height;
    Settings.skyHeight = Settings.height - Settings.groundHeight;
    Settings.pipeHorizontalGap = Settings.pipeWidth * 5;
    this.loadAsync();
  }

  // Resize function window
  resize = ({ width, height, scale }) => {
    const parent = this.app.view.parentNode;
    //Resize the renderer
    this.app.renderer.resize(width * scale, height * scale);

    if (Platform.OS === 'web') {
      this.app.view.style.width = width;
      this.app.view.style.height = height;
    }
  };

  // Async loading textures and backgrounds
  loadAsync = async () => {
    
    //Linking coordinates and background image
    this.textures = await setupSpriteSheetAsync(this.this_background, sprites);
    
    //Linking coordinates and background image
    this.textures2 = await setupSpriteSheetAsync(source2, sprites2);

    //Linking guards and background image
    this.guardTextute = await setupSpriteSheetAsync(source3, sprites3);
    this.groundTexture = await setupSpriteSheetAsync(groundSouce, groundSprites);
    this.penguinTexture = await setupSpriteSheetAsync(penguinSource, penguinSprites);
    
    this.onAssetsLoaded();
  };

  onAssetsLoaded = () => {

    // Creating background 
    this.background = new Background(this.textures.background);

    // Creating animated bird object
    bird = new Bird([
      this.penguinTexture['penguin1'],
      this.penguinTexture['penguin2'],
      this.penguinTexture['penguin3'],
      this.penguinTexture['penguin4'],
    ]);

    //Making bird global 
    this.bird = bird; 


    //Making Ground object
    this.ground2 = new Ground2(this.groundTexture.ground1);
    this.edge = new SideClouds(this.groundTexture.cloud1);
    this.cloud = new Cloud(this.groundTexture.cloud2);

    //Creating Caught message
    this.caughtMessage = new CaughtMessage(this.guardTextute.message)

    //TODO here i should create a new algorithm to get elements from the questions bank 
    let randomGuard = Math.floor(Math.random() * 10) +1;  // returns a random integer from 0 to 10; 

    //console.log(this.guardTextute[]);

    this.guard = new Guard(this.guardTextute.guard10);

    this.guard = new Guard(this.guardTextute[this.this_guard]);
 
 
    // Adding objects to the screen 
    [this.background, this.guard, this.caughtMessage, this.edge, this.ground2, this.cloud, this.bird].map(child =>
      this.app.stage.addChild(child),
    );

    this.stopAnimating = false;
  };


  // This functions starts when the button is clicked 
  onPress = () => {

    this.guard.buttonIsPressed = true; 
    this.guard.backward = true;

    this.bird.animationSpeed = 0.053;

    this.ground2.moveGround = true;

      if(this.ground2.groundDown = false){
        this.ground2.groundDown = true;
      }
      else{
        this.ground2.groundDown = false;
      }

      this.beginGame();
    
    //TODO Make 2500 global, this is time after which lose message will be displayed 
    setTimeout(() => {
      this.loseMessage();
    }, 2500);

  }; 


  //Function which will run once user releases the button 
  onPressOut = () =>{
    this.moveBack();
  }

  
  beginGame = () => {
    if (!this.isStarted) {
      this.isStarted = true;
      console.log("BeginGame");
    }
  };

  animate = () => {
    // if game ends 
    if (this.stopAnimating) {
      return;
    }

    // If game is started and button was pressed 
    if (this.isStarted && this.guard.buttonIsPressed){

      this.moveToTheEdge();
    }

  };

  moveToTheEdge = () => {

    if (!this.ground2.groundDown) {
      this.ground2.position.y += Settings.gameSpeed;
      this.edge.position.y += Settings.gameSpeed;
      if (this.ground2.position.y > Settings.skyHeight*0.9)
        this.ground2.groundDown = true;
        this.guard.position.y = Settings.skyHeight * 0.5
    }
    else if (this.ground2.position.x > Settings.skyHeight) {
      this.ground2.position.x += Settings.gameSpeed;
    }
    else {
      this.ground2.buttonIsPressed = false;
    }


  };

  //This function will dislpay a lose message, if user holds button for too long 
  loseMessage() {
    if (!this.isButtonReleased) {
      console.log("Lose Message!");
      this.caughtMessage.position.y = Settings.skyHeight * 0.4;
      this.userLost = true;
    }
    else { // Some debugging 
      console.log("Button was released!");
    }
  }

  moveBack = () => {
    this.ground2.position.y = Settings.skyHeight * 0.7;
    this.edge.position.y = Settings.skyHeight * 0.7;
  };

  restart = () => {
    this.isStarted = false;
    this.isDead = false;
    this.stopAnimating = false;
    this.bird.restart();
    this.animate();
  };

}

export default Game;