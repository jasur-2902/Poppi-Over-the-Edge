import { PIXI } from 'expo-pixi';
import { extras, Sprite } from 'pixi.js';
import { PixelRatio } from 'react-native';

import source from '../assets/background/walkingToLvl2.png';
import penguinSource from '../assets/penguin/penguin1.png';

import setupSpriteSheetAsync from './setupSpriteSheetAsync';
import sprites from './sprites';
import penguinSprites from './Sprites/penguin';


const { AnimatedSprite } = extras;

const scale = PixelRatio.get();


let Settings = {
  playerFallSpeed: 0 * scale,
  playerHorizontalPosition: 0 * scale,
  playerVerticalPosition: 620 * scale,
  playerMaxVelocity: -3 * scale,
  pipeWidth: 80 * scale,
  groundHeight: 100 * scale,
  pipeHeight: 500 * scale,
  playerGravity: 0 * scale,
  minPipeHeight: 50 * scale,
  pipeVerticalGap: 190 * scale, //180 is pretty legit
  gameSpeed: 22 * 0.25,
  guardWidth: 200 * scale,
  guardHeight: 200 * scale
};

class FlappySprite extends Sprite {
  constructor(...args) {
    super(...args);
    this.scale.set(scale);
  }
}

class Background extends FlappySprite {
  constructor(texture) {
    super(texture);
    this.position.x = 0;
    this.position.y = 0;
    this.width = Settings.width;
    this.height = Settings.height;
  }

  moveGround = false; 

}


class Bird extends AnimatedSprite {

  moveBird = false;

  constructor(textures) {
    super(textures);
    this.animationSpeed = 0.00;
    this.anchor.set(0.5);
    this.width = Settings.width / 17;
    this.height = Settings.height / 12;

    this.speedY = Settings.playerFallSpeed;
    this.rate = Settings.playerGravity;

    this.restart();
  }

  // Restarts position 
  restart = () => {
    this.play();
    this.rotation = 0;
    this.position.x = 0;
    this.position.y = Settings.height / 1.17;
  };

}

let bird; 

class Game {
  stopAnimating = true;
  isStarted = false;
  isDead = false;
  score = 0;
  isButtonReleased = false; 
  userLost = false;

 stoppedWalking = true

 
  
  constructor(context) {
    // Sharp pixels
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    
    this.app = new PIXI.Application({
      context,
      autoResize: false,
      width: context.drawingBufferWidth / 1,
      height: context.drawingBufferHeight / 1,
    });
    this.app.ticker.add(this.animate);

    Settings.width = this.app.renderer.width;
    Settings.pipeScorePosition = -(
      Settings.width - Settings.playerHorizontalPosition
    );
    Settings.height = this.app.renderer.height;
    Settings.skyHeight = Settings.height - Settings.groundHeight;
    Settings.pipeHorizontalGap = Settings.pipeWidth * 5;
    this.loadAsync();
  }


  loadAsync = async () => {
    this.textures = await setupSpriteSheetAsync(source, sprites);
    this.penguinTexture = await setupSpriteSheetAsync(penguinSource, penguinSprites);
    
    this.onAssetsLoaded();
  };

  onAssetsLoaded = () => {
    this.background = new Background(this.textures.background);

    bird = new Bird([
      this.penguinTexture['penguin1'],
      this.penguinTexture['penguin2'],
      this.penguinTexture['penguin3'],
      this.penguinTexture['penguin4'],
    ]);

    this.bird = bird; 

    [this.background, this.bird].map(child =>
      this.app.stage.addChild(child),
    );

    this.stopAnimating = false;
  };

  onPress = () => {
    
    this.guard.buttonIsPressed = true; 

    this.ground.moveGround = true;
  };

  animate = () => {
    if (this.stopAnimating) {
      return;
    }
    //this.walking(this.stoppedWalking);

    this.bird.animationSpeed = 0.1;

    if (this.bird.position.x < Settings.width*0.6){
      this.bird.position.x += Settings.gameSpeed;
     this.bird.animationSpeed = 0.1;
     
    }
    else{
      this.bird.animationSpeed = 0.0;
      this.stoppedWalking = false;
     // this.walking(this.stoppedWalking);
    }
    // console.log(this.stoppedWalking)
    // console.log(this.walking.stoppedWalking)
  };

  
}


export default Game;
