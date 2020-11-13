// Importing libraries
import { PIXI } from 'expo-pixi';
import {extras, Sprite } from 'pixi.js';
import {PixelRatio } from 'react-native';

// Importing backgrounds and assets
//import source2 from '../assets/ground2.png';
//import source3 from '../assets/guards/guards_s.png';

import panda from '../assets/guards/panda_sprite.png';
import sloth from '../assets/guards/sloth_sprite.png';
import monkey from '../assets/guards/monkey_sprite.png';
import macaw from '../assets/guards/macaw_sprite.png';
import pandaCaught from '../assets/guards/panda_caught.png';
import slothCaught from '../assets/guards/sloth_caught.png';
import monkeyCaught from '../assets/guards/monkey_caught.png';
import macawCaught from '../assets/guards/macaw_caught.png';



//import caught_message from '../assets/guards/caught_s.png';
import groundSouce from '../assets/ground/lvl1_s.png';
import penguinSource from '../assets/penguin/penguin.png';


// Importing sprites
import setupSpriteSheetAsync from './setupSpriteSheetAsync';
import sprites from './sprites';
import sprites2 from './Sprites/spriteSheet';
import guardSheet from './Sprites/guardSheet';
import guardCoordinates from './Sprites/guardCoordinates';
import groundSprites from './Sprites/ground';
import penguinSprites from './Sprites/penguin';

import backgroundImg from '../assets/background/lvl1_s.png';


const {AnimatedSprite } = extras;

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
  groundPositionX: 0,
  groundPositionY: 0,
  playerGravity: 0 * scale,
  minPipeHeight: 50 * scale,
  pipeVerticalGap: 190 * scale, //180 is pretty legit
  gameSpeed: 25 * 0.25, // Game speed
  guardWidth: 140 * scale,
  guardHeight: 140 * scale,
  secondCloudPositionY: 0,
  caughtMessageTime: 2500,
};


// Parent class for not moving objects
class SteadySprite extends Sprite {
  constructor(...args) {
    super(...args);
    //this.scale.set(scale);
  }
}

// Ground object
class Ground2 extends Sprite {

  buttonIsPressed = false;
  groundDown = false;

  constructor(texture) {
    super(texture, Settings.width, Settings.groundHeight);
    this.scale.set(scale * 2);

    //console.log("SIZE:", Settings.width, Settings.height, scale);

    this.height = Settings.height / 1.2;
    this.width = Settings.width / 1.00;

    Settings.groundPositionX = this.width*0.00;
    Settings.groundPositionY = (Settings.height - this.height)*1.05;

    this.position.x = Settings.groundPositionX;
    this.position.y = Settings.groundPositionY;

  }

}

// Object clouds on the side
class SideClouds extends Sprite {

  constructor(texture) {
    super(texture, Settings.width, Settings.groundHeight);

    this.width = Settings.width;
    this.height = Settings.height/4;
    this.position.x = 0;

    Settings.secondCloudPositionY = Settings.height / 1.5;

    this.position.y = Settings.secondCloudPositionY;

  }

}

// Bottom Clouds #TODO Rename it to something more generic
class Cloud extends Sprite {

  constructor(texture) {
    super(texture);
    this.scale.set(scale * 2);
    this.height = Settings.height/6;
    this.width = Settings.width;
    this.position.x = 0;
    this.position.y = Settings.height - this.height;
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
    this.width = Settings.width/6;
    this.height = Settings.height/3;
    this.position.x = Settings.width/2.5;
    this.position.y = Settings.skyHeight ;
  }
}

// Guard Object
class Guard extends Sprite {

  constructor(texture) {
    super(texture, Settings.width, Settings.groundHeight);
    this.scale.set(scale * 2);


    this.width = Settings.width/2.8;
    this.height = Settings.height/1.5;



    this.position.x = Settings.width/2.9;

    this.position.y = Settings.height;
  }

}

// Guard Object
class NewGuard extends Sprite {
  ycordinate;
  constructor(texture, xcor, ycor) {
    super(texture, Settings.width, Settings.groundHeight);
    this.scale.set(scale * 2);

    this.ycordinate = ycor; 
  
   // console.log("Passing ycor: " + ycor) ;

    this.width = Settings.width / 16;
    this.height = Settings.height / 10;

    this.position.x = (Settings.width / 2.1 * xcor / 12);

    this.position.y = Settings.height;
  }


  moveUp(){
    this.position.y = Settings.height / 2.2 * this.ycordinate / 13 
  }

  moveBack() {
    this.position.y = Settings.height; 
  }

}

// Background object
class Background extends Sprite {
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
    this.animationSpeed = 0.00;
    this.anchor.set(0.5);

    this.width = Settings.width/5;
    this.height = Settings.height/2.5;


    this.speedY = Settings.playerFallSpeed;
    this.rate = Settings.playerGravity;

    this.restart();
  }

  // Restarts position
  restart = () => {
    this.play();
    this.rotation = 0;
    this.position.x = Settings.width/2;
    this.position.y = Settings.height/1.30;
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
  time; 
  caughtTexture; 
  this_guard;
  this_background;
  guardTextute; 
  guard; 
  guardList; 
  child; 

  constructor(context, guard, random, time, id) {
    // Sharp pixels
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    this.this_guard = guard;
    //this.this_background = background;

    Settings.caughtMessageTime = time;

    this.app = new PIXI.Application({
      context,
      autoResize: false,
      width: context.drawingBufferWidth / 1,
      height: context.drawingBufferHeight / 1,
    });

    this.app.ticker.add(this.animate);

    Settings.width = this.app.renderer.width;
    Settings.height = this.app.renderer.height;
    Settings.skyHeight = Settings.height - Settings.groundHeight;
    Settings.pipeHorizontalGap = Settings.pipeWidth * 5;

    
    //console.log("IDDDD: " + id);
    this.loadAsync(random, id);
  }

  // Resize function window
  resize = ({ width, height, scale }) => {
    const parent = this.app.view.parentNode;
    //Resize the renderer
    //this.app.renderer.resize(width * scale, height * scale);

    // if (Platform.OS === 'web') {
    //   this.app.view.style.width = width;
    //   this.app.view.style.height = height;
    // }
  };

  destroyGame = () => {
    this.stopAnimating = true; 
    this.bird = null; 
    this.guard = null; 
    this. ground = null; 
    this.background = null;
    this.guardList = undefined; 
    
  }


  // Async loading textures and backgrounds
  loadAsync = async (random,id) => {


    //Linking coordinates and background image
    this.textures = await setupSpriteSheetAsync(backgroundImg, sprites);

    //Linking coordinates and background image
    //this.textures2 = await setupSpriteSheetAsync(source2, sprites2);

    //Linking guards and background image
    this.groundTexture = await setupSpriteSheetAsync(groundSouce, groundSprites);
    this.penguinTexture = await setupSpriteSheetAsync(penguinSource, penguinSprites);

    //random = 3
    //console.log("Color - " + random);
    
    if(random == 1){
      this.guardTextute = await setupSpriteSheetAsync(panda, guardSheet);
      this.caughtTexture = await setupSpriteSheetAsync(pandaCaught, guardSheet);

    }
    else if(random == 0){
      this.guardTextute = await setupSpriteSheetAsync(sloth, guardSheet);
      this.caughtTexture = await setupSpriteSheetAsync(slothCaught, guardSheet);
    }
    else if(random == 2) {
      this.guardTextute = await setupSpriteSheetAsync(monkey, guardSheet);
      this.caughtTexture = await setupSpriteSheetAsync(monkeyCaught, guardSheet);
    }
    else{
      this.guardTextute = await setupSpriteSheetAsync(macaw, guardSheet);
      this.caughtTexture = await setupSpriteSheetAsync(macawCaught, guardSheet);
    }


    

    this.onAssetsLoaded(id);


    setTimeout(() => {
      //console.log("Togle Loading Page in game js");
      this.loading();
    }, 400);
  };
  

  onAssetsLoaded = (id) => {

    // Creating background
    this.background = new Background(this.textures.background);

    // Creating animated bird object
    bird = new Bird([
      this.penguinTexture['penguin1'],
      this.penguinTexture['penguin2'],
      this.penguinTexture['penguin3'],
      this.penguinTexture['penguin2'],
      this.penguinTexture['penguin3'],
      this.penguinTexture['penguin2'],
      this.penguinTexture['penguin3'],
      this.penguinTexture['penguin2'],
      this.penguinTexture['penguin3'],
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

   // this.guard = new Guard(this.guardTextute.guard10);

    //this.guard = new Guard(this.guardTextute[this.this_guard]);




    // Adding objects to the screen
    // [this.guard, this.caughtMessage, this.ground2 , this.bird].map(child =>
    //   this.app.stage.addChild(child),
    // ); 

    // Adding objects to the screen
    this.child = [this.background, this.caughtMessage, this.ground2, this.bird];

    let guardCombination = guardCoordinates[1]; 

    for(let i = 0; i<guardCoordinates.length;i++){
      
      if(guardCoordinates[i].name == this.this_guard){
         guardCombination = guardCoordinates[i];
         //console.log(guardCombination);
         //console.log("WE FOUUNDDDD");
         break; 
      }
    }

    this.createGuards(guardCombination)

    this.child.map(child2 => this.app.stage.addChild(child2));
     //this.app.stage.addChild(child)



    //this.app.stage.addChild(this.background, this.ground2); 

   


    this.stopAnimating = false;
  };
  

  createGuards = (guardCombination) => {
    this.guardList = new Array();
    //console.log(guardCombination)

    for (let i = 0; i < guardCombination.number; i++) {
      let temp_guard = new NewGuard(this.guardTextute[this.this_guard], guardCombination.location[i][0], guardCombination.location[i][1]);
      //console.log("Guard was Created")
      // console.log(guardCombination.location[i][1],guardCombination.location[i][0]);
      // console.log()
      //   console.log(temp_guard)
      this.guardList.push(temp_guard);
      this.child.push(temp_guard);
    }
  }


  changeGuard = async(guard, random, time) =>{
    
    this.this_guard = guard;

    Settings.caughtMessageTime = time;

    console.log("Color - " + random);
    // if (random == 1) {
    //   this.guardTextute =  await setupSpriteSheetAsync(panda, sprites3);
    //   this.caughtTexture =  await setupSpriteSheetAsync(pandaCaught, sprites3);

    // }
    // else if (random == 0) {
    //   this.guardTextute =  await setupSpriteSheetAsync(sloth, sprites3);
    //   this.caughtTexture =  await setupSpriteSheetAsync(slothCaught, sprites3);
    // }
    // else {
    //   this.guardTextute =  await setupSpriteSheetAsync(monkey, sprites3);
    //   this.caughtTexture =  await setupSpriteSheetAsync(monkeyCaught, sprites3);
    // }

    //this.loadAsync(random);

    this.guard = new Guard(this.guardTextute[guard]);

  }



  toggleLoadingPage = () =>{
    setTimeout(() => {
      this.loading();
    }, 300);

  }

 


  // changeGuard = async (guard, random, time) => {

  //   this.this_guard = guard;

  //   Settings.caughtMessageTime = time;

  //   console.log("Color - " + random);
  //   // if (random == 1) {
  //   //   this.guardTextute =  await setupSpriteSheetAsync(panda, sprites3);
  //   //   this.caughtTexture =  await setupSpriteSheetAsync(pandaCaught, sprites3);

  //   // }
  //   // else if (random == 0) {
  //   //   this.guardTextute =  await setupSpriteSheetAsync(sloth, sprites3);
  //   //   this.caughtTexture =  await setupSpriteSheetAsync(slothCaught, sprites3);
  //   // }
  //   // else {
  //   //   this.guardTextute =  await setupSpriteSheetAsync(monkey, sprites3);
  //   //   this.caughtTexture =  await setupSpriteSheetAsync(monkeyCaught, sprites3);
  //   // }

  //   this.loadAsync(random);

  //   this.guard = new Guard(this.guardTextute[guard]);

  // }



  // toggleLoadingPage = () => {
  //   setTimeout(() => {
  //     this.loading();
  //   }, 300);

  // }


  // This functions starts when the button is clicked
  onPress = () => {

    // this.guard.buttonIsPressed = true;
    // this.guard.backward = true;

    this.bird.animationSpeed = 0.053;

    this.ground2.moveGround = true;

      if(this.ground2.groundDown = false){
        this.ground2.groundDown = true;
      }


      this.beginGame();

  };


  //Function which will run once user releases the button
  onPressOut = () =>{

    if (this.binocularState){
      //console.log("Button released on time");
      this.moveBack();
      this.ground2.moveGround = false;
      this.bird.animationSpeed = 0;

    }
    else{
      //console.log("Button released late");
      this.bird.animationSpeed = 0;
      this.isStarted = false;
      this.ground2.position.y = Settings.groundPositionY;
      this.edge.position.y = Settings.secondCloudPositionY;
      this.bird.restart(); 
      
    }
    

  }


  beginGame = () => {
    if (!this.isStarted) {
      this.isStarted = true;
     // console.log("BeginGame");
    }
  };

  animate = () => {
    // if game ends
    if (this.stopAnimating) {
      return;
    }

    // If game is started and button was pressed
    if (this.isStarted && this.ground2.moveGround ){
      setTimeout(() => {
        this.moveToTheEdge();
      }, 300);

    }

  };
  
  beginning; 
  binocularState = false;
  moveToTheEdge = () => {

    if (!this.ground2.groundDown) {
      this.ground2.position.y += Settings.gameSpeed;
      this.edge.position.y += Settings.gameSpeed;


      // Variable to control how much down to move edge of the castle
      let edgeDownLevel = Settings.height * 0.5;

      // Variable to control how high to move guards of the castle
      let guardsUpLevel = Settings.height / 5.5;

      // when poppi reaches the eadge
      if (this.ground2.position.y > edgeDownLevel ){
        this.ground2.groundDown = true;
        this.binocularState = true;
        this.onScore(this.binocularState)
        // this.bird.position.y = Settings.height / 1.14;
        setTimeout(() => {

          //Moving guards to top making them visible
           // this.guard.position.y = guardsUpLevel;
          // this.guardList[1].position.y = Settings.height / 6;
          // console.log(this.guardList[1].position.y);
          
          for (let i = 0; i < this.guardList.length; i++){
            this.guardList[i].moveUp(); 
          }

          // Stopping bird moving
          this.bird.animationSpeed = 0.00;

          this.bird.position.y = Settings.height /0;

          //Poppi's head pops up in the binocular view, so I am moving it a little bit down


          // Making edge invisible
          this.ground2.position.y = Settings.skyHeight;

          this.beginning = new Date();

        }, 200);

        //TODO Make 2500 global, this is time after which lose message will be displayed
        setTimeout(() => {
          this.loseMessage();
        }, Settings.caughtMessageTime);


      }
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
      //console.log("Lose Message!");
      //this.caughtMessage.position.y = Settings.height * 0.3;
      this.userLost = true;

//      this.guard.texture = this.caughtTexture[this.this_guard]; 

      for (let i = 0; i < this.guardList.length; i++) {
        this.guardList[i].texture = this.caughtTexture[this.this_guard];
      }

      let end = new Date();
      

      //Counting time elapsed 
      let time = (end.getHours() * 3600 + end.getMinutes() * 60 + end.getSeconds() + end.getMilliseconds() / 1000) - (this.beginning.getHours() * 3600 + this.beginning.getMinutes() * 60 + this.beginning.getSeconds() + this.beginning.getMilliseconds() / 1000);
      this.timeSpent(time);

    }
    else { // Some debugging
      this.ground2.position.y = Settings.groundPositionY;
    }
  }

  moveBack() {
    this.ground2.position.y = Settings.groundPositionY;
    this.edge.position.y = Settings.secondCloudPositionY;
    //this.bird.position.y = Settings.height/1.2;

    let end = new Date (); 

    for (let i = 0; i < this.guardList.length; i++) {
      this.guardList[i].moveBack();
    }

    //Counting time elapsed 
    let time = (end.getHours() * 3600 + end.getMinutes() * 60 + end.getSeconds() + end.getMilliseconds() / 1000) - (this.beginning.getHours() * 3600 + this.beginning.getMinutes() * 60 + this.beginning.getSeconds() + this.beginning.getMilliseconds() / 1000); 
    this.timeSpent(time);

    //console.log("Time spent: " + time ); 

    this.bird.restart(); 
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
