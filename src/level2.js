import { PIXI } from 'expo-pixi';
import { Container, extras, Sprite } from 'pixi.js';
import { AsyncStorage, PixelRatio } from 'react-native';

import source from '../assets/background/background_lvl2_2.png';
import source2 from '../assets/ground2.png';
import source3 from '../assets/guards/guards5.png';
import groundSouce from '../assets/ground/ground3.png';
import penguinSource from '../assets/penguin/penguin1.png';



import setupSpriteSheetAsync from './setupSpriteSheetAsync';
import sprites from './sprites';
import sprites2 from './Sprites/spriteSheet';
import sprites3 from './Sprites/guardSheet';
import groundSprites from './Sprites/ground';
import penguinSprites from './Sprites/penguin';



import { AppRegistry, View, Button, Alert } from 'react-native';
//import PipeContainer  from './Sprites/PipeContainer';

const { TilingSprite, AnimatedSprite } = extras;

const scale = PixelRatio.get();


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
  guardWidth: 200 * scale,
  guardHeight: 200 * scale
};

class FlappySprite extends Sprite {
  constructor(...args) {
    super(...args);
    this.scale.set(scale);
  }
}

class Ground extends TilingSprite {
  buttonIsPressed=false; 
  groundDown = false; 

  constructor(texture) {
    super(texture, Settings.width, Settings.groundHeight);
    this.tileScale.set(scale * 2);
    this.position.x =   0;
    this.position.y = Settings.skyHeight;
  }

  changePosition() {
    //this.position.x = this.position.x - position;
    if (!this.groundDown) {
      this.position.y += Settings.gameSpeed;
      console.log("Ground position y " + this.position.y)
      if (this.position.y > 1500)
        this.groundDown = true;
    }
    else if (this.position.x > Settings.skyHeight) {
      this.position.x += Settings.gameSpeed;
      // if(this.position.x > 1400) 
      //this.backward = true;
    }
    else {
      this.buttonIsPressed = false;
    }
  }

}


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

class Edge extends Sprite {

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

class Cloud extends Sprite {

  backward = true;

  buttonIsPressed = false;

  constructor(texture) {
    super(texture, Settings.width, Settings.groundHeight);
    this.scale.set(scale * 2);


    // this.height = Settings.guardHeight;
    this.width = 1280 * scale;
    // this.height = 500;
    this.position.x = 0;
    this.position.y = Settings.skyHeight;

  }


}

class CaughtMessage extends Sprite {

  backward = true;

  buttonIsPressed = false;

  constructor(texture) {
    super(texture, Settings.width, Settings.groundHeight);
    this.scale.set(scale * 2);


    // this.height = Settings.guardHeight;
    this.width = 150;
    this.height = 150;
    this.position.x = 680 * scale;
    this.position.y = Settings.skyHeight ;

  }


}

class Guard extends Sprite {

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

  changePosition(position) {
    //this.position.x = this.position.x - position;
    // if(this.backward == true){
    //   this.position.x -= Settings.gameSpeed;
    //   if (this.position.x <  2000)
    //     this.backward = false;
    // }
    // else if (this.position.x < +2600) {
    //   this.position.x += Settings.gameSpeed;
    //   // if(this.position.x > 1400) 
    //     //this.backward = true;
    // }
    // else{
    //   this.buttonIsPressed = false;
    // }
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

function boxesIntersect(a, b, paddingA = 0) {
  const ab = a.getBounds();
  ab.x += paddingA;
  ab.width -= paddingA * 2;
  ab.y += paddingA;
  ab.height -= paddingA * 2;

  const bb = b.getBounds();
  return (
    ab.x + ab.width > bb.x &&
    ab.x < bb.x + bb.width &&
    ab.y + ab.height > bb.y &&
    ab.y < bb.y + bb.height
  );
}

class PipeContainer extends Container {
  pipes = [];
  pipeIndex = 0;
  backward = true;
  backwardSpeed = -Settings.gameSpeed;

  constructor(pipeTexture) {
    super();
    this.pipeTexture = pipeTexture;
    this.position.x = Settings.width + Settings.pipeWidth / 2 - 300;
  }

  changePosition = () => {
    console.log("Change")
    this.backward = true;
  }

  tryAddingNewPipe = () => {
    if (!this.pipes.length) return;
    const { pipe } = this.pipes[this.pipes.length - 1];
    if (-pipe.position.x >= Settings.pipeHorizontalGap) {
      //   this.addNewPipe();
    }
  };

  moveAll = () => {
    let score = 0;
    for (let index = 0; index < this.pipes.length; index++) {
      this.move(index);
      if (this.tryScoringPipe(index)) {
        score += 1;
      }
    }
    return score;
  };

  tryScoringPipe = index => {
    const group = this.pipes[index];

    if (
      !group.scored &&
      this.toGlobal(group.pipe.position).x < Settings.playerHorizontalPosition
    ) {
      group.scored = true;
      return true;
    }
    return false;
  };

  move = index => {
    //console.log("this is move function");
    if (!this.backward) {
      // console.log("A");
      const { pipe, pipe2 } = this.pipes[index];
      console.log(pipe.position.x)



      if (pipe.position.x > -800) {
        pipe.position.x -= Settings.gameSpeed;
        pipe2.position.x -= Settings.gameSpeed;
      }
      else {
        this.backward = true;
      }
    }
    else {
      //console.log("B");
      const { pipe, pipe2 } = this.pipes[index];
      if (pipe.position.x > -200) {
        //Settings.gameSpeed = 0; 
        this.backwardSpeed = 0;
        ground.moveGround = false;
        bird.animationSpeed = 0.00;


      }
      else {
        this.backwardSpeed = -Settings.gameSpeed;
      }

      pipe.position.x -= this.backwardSpeed;
      pipe2.position.x -= this.backwardSpeed;
    }
  };

  moveForward = index => {
    const { pipe, pipe2 } = this.pipes[index];
    pipe.position.x -= Settings.gameSpeed;
    pipe2.position.x -= Settings.gameSpeed;
  }

  moveBackward = index => {
    const { pipe, pipe2 } = this.pipes[index];
    pipe.position.x -= -10;
    pipe2.position.x -= -10;
  }


  addNewPipe = () => {
    const pipeGroup = {};
    const pipe = new Pipe(this.pipeTexture);
    const pipe2 = new Pipe(this.pipeTexture);
    pipe.rotation = Math.PI;

    const maxPosition =
      Settings.skyHeight -
      Settings.minPipeHeight -
      Settings.pipeVerticalGap -
      pipe.height / 2;
    const minPosition = -(pipe.height / 2 - Settings.minPipeHeight);

    pipe.position.y = pipe.height;

    // pipe.position.y = Math.floor(
    //   Math.random() * (maxPosition - minPosition + 1) + minPosition,
    // );

    console.log("Pipe Y" + pipe.position.y);

    pipe2.position.y = Settings.pipeVerticalGap;
    pipe.position.x = pipe2.position.x = 0;

    pipeGroup.upper = pipe.position.y + pipe.height / 2;
    pipeGroup.lower = pipeGroup.upper + Settings.pipeVerticalGap;

    pipeGroup.pipe = pipe;
    pipeGroup.pipe2 = pipe2;

    //this.addChild(pipe);
    this.addChild(pipe2);
    this.pipes.push(pipeGroup);

    // this.tryRemovingLastGroup();
  };

  tryRemovingLastGroup = () => {
    if (
      this.pipes[0].pipe.position.x + Settings.pipeWidth / 2 >
      Settings.width
    ) {
      this.pipes.shift();
    }
  };

  setXforGroup = (index, x) => {
    const { pipe, pipe2 } = this.pipes[index];
    pipe.position.x = x;
    pipe2.position.x = x;
  };

  getX = index => {
    const { pipe } = this.pipes[index];
    return this.toGlobal(pipe.position).x;
  };

  restart = () => {
    this.pipeIndex = 0;
    this.pipes = [];
    this.children = [];
  
  };


}

class Pipe extends FlappySprite {
  constructor(texture) {
    super(texture);
    this.width = Settings.pipeWidth;
    this.height = Settings.pipeHeight;
   // this.anchor.set(0.5);
  }
}


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

  restart = () => {
    this.play();
    this.rotation = 0;
    this.position.x = Settings.playerHorizontalPosition;

    this.position.y = Settings.playerVerticalPosition;
  };

  updateGravity = () => {
    this.position.y -= this.speedY;
    this.speedY -= this.rate;

    const FLAP = 35;
    // this.rotation = -Math.min(
    //   Math.PI / 4,
    //   Math.max(-Math.PI / 2, (FLAP + this.speedY) / FLAP),
    // );
  };
}

let ground;
let bird; 

class Game {
  stopAnimating = true;
  isStarted = false;
  isDead = false;
  score = 0;
  isButtonReleased = false; 
  userLost = false;


  TestFunction() {
 
    Alert.alert('Button Pressed !!!')
 
  }

  
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
    /*
    this.app.stage.interactive = true;
    this.app.stage.buttonMode = true;
    this.app.stage.on('mousedown', this.beginGame);
    this.app.stage.on('tap', this.beginGame);
    */

    Settings.width = this.app.renderer.width;
    Settings.pipeScorePosition = -(
      Settings.width - Settings.playerHorizontalPosition
    );
    Settings.height = this.app.renderer.height;
    Settings.skyHeight = Settings.height - Settings.groundHeight;
    Settings.pipeHorizontalGap = Settings.pipeWidth * 5;
    this.loadAsync();
  }

  // Resize function window
  resize = ({ width, height, scale }) => {
    const parent = this.app.view.parentNode;
    // Resize the renderer
    // this.app.renderer.resize(width * scale, height * scale);

    // if (Platform.OS === 'web') {
    //   this.app.view.style.width = width;
    //   this.app.view.style.height = height;
    // }
  };

  loadAsync = async () => {
    this.textures = await setupSpriteSheetAsync(source, sprites);
    this.textures2 = await setupSpriteSheetAsync(source2, sprites2);
    this.guardTextute = await setupSpriteSheetAsync(source3, sprites3);
    this.groundTexture = await setupSpriteSheetAsync(groundSouce, groundSprites);
    this.penguinTexture = await setupSpriteSheetAsync(penguinSource, penguinSprites);
    
    this.onAssetsLoaded();
  };

  onAssetsLoaded = () => {
    this.background = new Background(this.textures.background);
    this.pipeContainer = new PipeContainer(this.textures.boxes);
    
    //this.guardContainer = new PipeContainer(this.textures.pipe);

    ground = new Ground(this.textures.ground);

    bird = new Bird([
      this.penguinTexture['penguin1'],
      this.penguinTexture['penguin2'],
      this.penguinTexture['penguin3'],
      this.penguinTexture['penguin4'],
    ]);

    this.bird = bird; 

    this.ground2 = new Ground2(this.groundTexture.ground1);
    this.edge = new Edge(this.groundTexture.cloud1);

    this.cloud = new Cloud(this.groundTexture.cloud2);

    this.ground = ground;

    this.caughtMessage = new CaughtMessage(this.guardTextute.message)

    let randomGuard = Math.floor(Math.random() * 10) +1;  // returns a random integer from 0 to 10; 

    switch(randomGuard){
      case 1:
        this.guard = new Guard(this.guardTextute.guard1);
        break;
      case 2:
        this.guard = new Guard(this.guardTextute.guard2);
        break;
      case 3:
        this.guard = new Guard(this.guardTextute.guard3);
        break;
      case 4:
        this.guard = new Guard(this.guardTextute.guard4);
        break;
      case 5:
        this.guard = new Guard(this.guardTextute.guard5);
        break;
      case 6:
        this.guard = new Guard(this.guardTextute.guard6);
        break;
      case 7:
        this.guard = new Guard(this.guardTextute.guard7);
        break;
      case 8:
        this.guard = new Guard(this.guardTextute.guard8);
        break;
      case 9:
        this.guard = new Guard(this.guardTextute.guard9);
        break;
      case 10:
        this.guard = new Guard(this.guardTextute.guard10);
        break;
    }


    

    this.pipeContainer.addNewPipe();
 

    [this.background, this.guard, this.caughtMessage, this.edge, this.ground2, this.cloud  , this.bird].map(child =>
      this.app.stage.addChild(child),
    );

    this.stopAnimating = false;
  };

  onPress = () => {

    this.guard.buttonIsPressed = true; 
    this.guard.backward = true;
    //this.userLost = false;

    this.bird.animationSpeed = 0.053;

    this.ground.moveGround = true;

    if (this.isDead) {
      this.restart();
    } else {
      console.log("Change click")

      if(this.ground.groundDown = false){
        this.ground.groundDown = true; 
        this.ground2.groundDown = true;
      }
      else{
        this.ground.groundDown = false ; 
        this.ground2.groundDown = false;
      }

     // this.pipeContainer.changePosition;
      if(this.pipeContainer.backward){
        this.pipeContainer.backward = false;
        //this.guardContainer.backward = false;
      }

      else {
        this.pipeContainer.backward = true;
        //this.guardContainer.backward = true;
      }

     // this.guardContainer.addNewPipe();
      this.beginGame();
    }

    setTimeout(() => {
      this.loseMessage();
    }, 2500);



  }; 

  loseMessage(){
    if(!this.isButtonReleased){
      console.log("Lose Message!");
      this.caughtMessage.position.y = Settings.skyHeight * 0.5; 
      this.userLost = true;
    }
    else{
      console.log("Button was released!");
    }
  }

  onPressOut = () =>{
    this.moveBack();
  }

  beginGame = () => {
    if (!this.isStarted) {
      this.isStarted = true;
      this.score = 0;
      this.onScore(this.score);
      console.log("BeginGame");
     // this.pipeContainer.addNewPipe();
    }
    //this.bird.speedY = Settings.playerFallSpeed;
  };

  animate = () => {
    if (this.stopAnimating) {
      return;
    }

    if(this.ground.backward){
      this.ground.position.y = this.ground.position.y + Settings.gameSpeed;
    }

    if (this.ground.moveGround){
      this.ground.tilePosition.x -= Settings.gameSpeed;
     // this.ground.position.y = this.ground.position.y + Settings.gameSpeed;
    }

    if (this.ground.moveGround){
      this.moveToTheEdge();
    }


    if (!this.isDead) {
      if (Math.abs(this.ground.tilePosition.x) > this.ground.width) {
        this.ground.tilePosition.x = 0;
      }
      //
    }

    if (this.isStarted) {
      this.bird.updateGravity();
    }

    if (this.isStarted && this.guard.buttonIsPressed){
      this.guard.changePosition();
      this.ground.changePosition();
    }

    if (this.isDead) {
      //this.bird.rotation += Math.PI / 4;
      if (
        //this.bird.rotation > Math.PI / 2 &&
        this.bird.position.y > Settings.skyHeight - this.bird.height / 2
      ) {
       // saveHighScoreAsync(this.score);
        this.stopAnimating = true;
      }
    } else {
      if (this.bird.position.y + this.bird.height / 2 > Settings.skyHeight) {
        this.hitPipe();
      }

      const points = this.pipeContainer.moveAll();
      if (points) {
        this.score += points;
        this.onScore(this.score);
      }
      this.pipeContainer.tryAddingNewPipe();

     // this.guardContainer.tryAddingNewPipe();

      const padding = 15;
      for (const group of this.pipeContainer.pipes) {
        const { pipe, pipe2, upper, lower } = group;
        if (
          boxesIntersect(this.bird, pipe, padding) ||
          boxesIntersect(this.bird, pipe2, padding)
        ) {
          this.hitPipe();
        }
      }
    }

    

  };

  moveToTheEdge = () => {
    // this.ground2.position.y += Settings.gameSpeed;
    // this.edge.position.y += Settings.gameSpeed; 


    //this.position.x = this.position.x - position;
    if (!this.ground2.groundDown) {
      this.ground2.position.y += Settings.gameSpeed;
      this.edge.position.y += Settings.gameSpeed;
      console.log("Ground position y " + this.ground2.position.y)
      if (this.ground2.position.y > Settings.skyHeight*0.9)
        this.ground2.groundDown = true;
        this.guard.position.y = Settings.skyHeight * 0.5
    }
    else if (this.ground2.position.x > Settings.skyHeight) {
      this.ground2.position.x += Settings.gameSpeed;
      
      // if(this.position.x > 1400) 
      //this.backward = true;
    }
    else {
      this.ground2.buttonIsPressed = false;
    }


  };

  moveBack = () => {
    this.ground2.position.y = Settings.skyHeight * 0.7;
    this.edge.position.y = Settings.skyHeight * 0.7;

  };

  restart = () => {
    this.isStarted = false;
    this.isDead = false;
    this.stopAnimating = false;
    this.score = 0;
    this.onScore(this.score);
    this.bird.restart();
    this.pipeContainer.restart();
    //this.guardContainer.restart();
    this.animate();
  };

  hitPipe = () => {
    //this.bird.stop();
    //this.isDead = true;
  };

  updateScore = () => {
    this.score += 1;
    this.onScore(this.score);
    // TODO: UPDATE UI
  };
}


class Game2 {
  stopAnimating = true;
  isStarted = false;
  isDead = false;
  score = 0;
  isButtonReleased = false;
  userLost = false;


  TestFunction() {

    Alert.alert('Button Pressed !!!')

  }


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
    /*
    this.app.stage.interactive = true;
    this.app.stage.buttonMode = true;
    this.app.stage.on('mousedown', this.beginGame);
    this.app.stage.on('tap', this.beginGame);
    */

    Settings.width = this.app.renderer.width;
    Settings.pipeScorePosition = -(
      Settings.width - Settings.playerHorizontalPosition
    );
    Settings.height = this.app.renderer.height;
    Settings.skyHeight = Settings.height - Settings.groundHeight;
    Settings.pipeHorizontalGap = Settings.pipeWidth * 5;
    this.loadAsync();
  }

  // Resize function window
  resize = ({ width, height, scale }) => {
    const parent = this.app.view.parentNode;
    // Resize the renderer
    // this.app.renderer.resize(width * scale, height * scale);

    // if (Platform.OS === 'web') {
    //   this.app.view.style.width = width;
    //   this.app.view.style.height = height;
    // }
  };

  loadAsync = async () => {
    this.textures = await setupSpriteSheetAsync(source, sprites);
    this.textures2 = await setupSpriteSheetAsync(source2, sprites2);
    this.guardTextute = await setupSpriteSheetAsync(source3, sprites3);
    this.groundTexture = await setupSpriteSheetAsync(groundSouce, groundSprites);
    this.penguinTexture = await setupSpriteSheetAsync(penguinSource, penguinSprites);

    this.onAssetsLoaded();
  };

  onAssetsLoaded = () => {
    this.background = new Background(this.textures.background);
    this.pipeContainer = new PipeContainer(this.textures.boxes);

    //this.guardContainer = new PipeContainer(this.textures.pipe);

    ground = new Ground(this.textures.ground);

    bird = new Bird([
      this.penguinTexture['penguin1'],
      this.penguinTexture['penguin2'],
      this.penguinTexture['penguin3'],
      this.penguinTexture['penguin4'],
    ]);

    this.bird = bird;

    this.ground2 = new Ground2(this.groundTexture.ground1);
    this.edge = new Edge(this.groundTexture.cloud1);

    this.cloud = new Cloud(this.groundTexture.cloud2);

    this.ground = ground;

    this.caughtMessage = new CaughtMessage(this.guardTextute.message)

    let randomGuard = Math.floor(Math.random() * 10) + 1;  // returns a random integer from 0 to 10; 

    switch (randomGuard) {
      case 1:
        this.guard = new Guard(this.guardTextute.guard1);
        break;
      case 2:
        this.guard = new Guard(this.guardTextute.guard2);
        break;
      case 3:
        this.guard = new Guard(this.guardTextute.guard3);
        break;
      case 4:
        this.guard = new Guard(this.guardTextute.guard4);
        break;
      case 5:
        this.guard = new Guard(this.guardTextute.guard5);
        break;
      case 6:
        this.guard = new Guard(this.guardTextute.guard6);
        break;
      case 7:
        this.guard = new Guard(this.guardTextute.guard7);
        break;
      case 8:
        this.guard = new Guard(this.guardTextute.guard8);
        break;
      case 9:
        this.guard = new Guard(this.guardTextute.guard9);
        break;
      case 10:
        this.guard = new Guard(this.guardTextute.guard10);
        break;
    }




    this.pipeContainer.addNewPipe();


    [this.background, this.guard, this.caughtMessage, this.edge, this.ground2, this.cloud, this.bird].map(child =>
      this.app.stage.addChild(child),
    );

    this.stopAnimating = false;
  };

  onPress = () => {

    this.guard.buttonIsPressed = true;
    this.guard.backward = true;
    //this.userLost = false;

    this.bird.animationSpeed = 0.053;

    this.ground.moveGround = true;

    if (this.isDead) {
      this.restart();
    } else {
      console.log("Change click")

      if (this.ground.groundDown = false) {
        this.ground.groundDown = true;
        this.ground2.groundDown = true;
      }
      else {
        this.ground.groundDown = false;
        this.ground2.groundDown = false;
      }

      // this.pipeContainer.changePosition;
      if (this.pipeContainer.backward) {
        this.pipeContainer.backward = false;
        //this.guardContainer.backward = false;
      }

      else {
        this.pipeContainer.backward = true;
        //this.guardContainer.backward = true;
      }

      // this.guardContainer.addNewPipe();
      this.beginGame();
    }

    setTimeout(() => {
      this.loseMessage();
    }, 2500);



  };

  loseMessage() {
    if (!this.isButtonReleased) {
      console.log("Lose Message!");
      this.caughtMessage.position.y = Settings.skyHeight * 0.5;
      this.userLost = true;
    }
    else {
      console.log("Button was released!");
    }
  }

  onPressOut = () => {
    this.moveBack();
  }

  beginGame = () => {
    if (!this.isStarted) {
      this.isStarted = true;
      this.score = 0;
      this.onScore(this.score);
      console.log("BeginGame");
      // this.pipeContainer.addNewPipe();
    }
    //this.bird.speedY = Settings.playerFallSpeed;
  };

  animate = () => {
    if (this.stopAnimating) {
      return;
    }

    if (this.ground.backward) {
      this.ground.position.y = this.ground.position.y + Settings.gameSpeed;
    }

    if (this.ground.moveGround) {
      this.ground.tilePosition.x -= Settings.gameSpeed;
      // this.ground.position.y = this.ground.position.y + Settings.gameSpeed;
    }

    if (this.ground.moveGround) {
      this.moveToTheEdge();
    }


    if (!this.isDead) {
      if (Math.abs(this.ground.tilePosition.x) > this.ground.width) {
        this.ground.tilePosition.x = 0;
      }
      //
    }

    if (this.isStarted) {
      this.bird.updateGravity();
    }

    if (this.isStarted && this.guard.buttonIsPressed) {
      this.guard.changePosition();
      this.ground.changePosition();
    }

    if (this.isDead) {
      //this.bird.rotation += Math.PI / 4;
      if (
        //this.bird.rotation > Math.PI / 2 &&
        this.bird.position.y > Settings.skyHeight - this.bird.height / 2
      ) {
        // saveHighScoreAsync(this.score);
        this.stopAnimating = true;
      }
    } else {
      if (this.bird.position.y + this.bird.height / 2 > Settings.skyHeight) {
        this.hitPipe();
      }

      const points = this.pipeContainer.moveAll();
      if (points) {
        this.score += points;
        this.onScore(this.score);
      }
      this.pipeContainer.tryAddingNewPipe();

      // this.guardContainer.tryAddingNewPipe();

      const padding = 15;
      for (const group of this.pipeContainer.pipes) {
        const { pipe, pipe2, upper, lower } = group;
        if (
          boxesIntersect(this.bird, pipe, padding) ||
          boxesIntersect(this.bird, pipe2, padding)
        ) {
          this.hitPipe();
        }
      }
    }



  };

  moveToTheEdge = () => {
    // this.ground2.position.y += Settings.gameSpeed;
    // this.edge.position.y += Settings.gameSpeed; 


    //this.position.x = this.position.x - position;
    if (!this.ground2.groundDown) {
      this.ground2.position.y += Settings.gameSpeed;
      this.edge.position.y += Settings.gameSpeed;
      console.log("Ground position y " + this.ground2.position.y)
      if (this.ground2.position.y > Settings.skyHeight * 0.9)
        this.ground2.groundDown = true;
      this.guard.position.y = Settings.skyHeight * 0.5
    }
    else if (this.ground2.position.x > Settings.skyHeight) {
      this.ground2.position.x += Settings.gameSpeed;

      // if(this.position.x > 1400) 
      //this.backward = true;
    }
    else {
      this.ground2.buttonIsPressed = false;
    }


  };

  moveBack = () => {
    this.ground2.position.y = Settings.skyHeight * 0.7;
    this.edge.position.y = Settings.skyHeight * 0.7;

  };

  restart = () => {
    this.isStarted = false;
    this.isDead = false;
    this.stopAnimating = false;
    this.score = 0;
    this.onScore(this.score);
    this.bird.restart();
    this.pipeContainer.restart();
    //this.guardContainer.restart();
    this.animate();
  };

  hitPipe = () => {
    //this.bird.stop();
    //this.isDead = true;
  };

  updateScore = () => {
    this.score += 1;
    this.onScore(this.score);
    // TODO: UPDATE UI
  };
}



// async function saveHighScoreAsync(score) {
//   const highScore = await getHighScoreAsync();
//   if (score > highScore) {
//     await AsyncStorage.setItem('hiscore', highScore);
//   }
//   return {
//     score: Math.max(score, highScore),
//     isBest: score > highScore,
//   };
// }

// async function getHighScoreAsync() {
//   const score = await AsyncStorage.getItem('hiscore');
//   if (score) {
//     return parseInt(score);
//   }
//   return 0;
// }

export default Game;