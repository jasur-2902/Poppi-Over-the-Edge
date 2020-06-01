// import React, {Component} from 'react'; 
// import { AsyncStorage, PixelRatio } from 'react-native';


// const scale = PixelRatio.get();

// let Settings = {
//     playerFallSpeed: 0 * scale,
//     playerHorizontalPosition: 100 * scale,
//     playerVerticalPosition: 200 * scale,
//     playerMaxVelocity: -3 * scale,
//     pipeWidth: 80 * scale,
//     groundHeight: 100 * scale,
//     pipeHeight: 500 * scale,
//     playerGravity: 0 * scale,
//     minPipeHeight: 50 * scale,
//     pipeVerticalGap: 190 * scale, //180 is pretty legit
//     gameSpeed: 40 * 0.25,
// };

// class PipeContainer extends Component {
//     pipes = [];
//     pipeIndex = 0;
//     backward = false;
//     backwardSpeed = -10;

//     constructor(pipeTexture) {
//         super();
//         this.pipeTexture = pipeTexture;
//         this.position.x = Settings.width + Settings.pipeWidth / 2;
//     }

//     changePosition = () => {
//         console.log("Change")
//         this.backward = true;
//     }

//     tryAddingNewPipe = () => {
//         if (!this.pipes.length) return;
//         const { pipe } = this.pipes[this.pipes.length - 1];
//         if (-pipe.position.x >= Settings.pipeHorizontalGap) {
//             //   this.addNewPipe();
//         }
//     };

//     moveAll = () => {
//         let score = 0;
//         for (let index = 0; index < this.pipes.length; index++) {
//             this.move(index);
//             if (this.tryScoringPipe(index)) {
//                 score += 1;
//             }
//         }
//         return score;
//     };

//     tryScoringPipe = index => {
//         const group = this.pipes[index];

//         if (
//             !group.scored &&
//             this.toGlobal(group.pipe.position).x < Settings.playerHorizontalPosition
//         ) {
//             group.scored = true;
//             return true;
//         }
//         return false;
//     };

//     move = index => {
//         //console.log("this is move function");
//         if (!this.backward) {
//             // console.log("A");
//             const { pipe, pipe2 } = this.pipes[index];
//             console.log(pipe.position.x)



//             if (pipe.position.x > -800) {
//                 pipe.position.x -= Settings.gameSpeed;
//                 pipe2.position.x -= Settings.gameSpeed;
//             }
//             else {
//                 this.backward = true;
//             }
//         }
//         else {
//             //console.log("B");
//             const { pipe, pipe2 } = this.pipes[index];
//             if (pipe.position.x > -200) {
//                 //Settings.gameSpeed = 0; 
//                 this.backwardSpeed = 0;
//             }
//             else {
//                 this.backwardSpeed = -10;
//             }

//             pipe.position.x -= this.backwardSpeed;
//             pipe2.position.x -= this.backwardSpeed;
//         }
//     };

//     moveForward = index => {
//         const { pipe, pipe2 } = this.pipes[index];
//         pipe.position.x -= Settings.gameSpeed;
//         pipe2.position.x -= Settings.gameSpeed;
//     }

//     moveBackward = index => {
//         const { pipe, pipe2 } = this.pipes[index];
//         pipe.position.x -= -10;
//         pipe2.position.x -= -10;
//     }


//     addNewPipe = () => {
//         const pipeGroup = {};
//         const pipe = new Pipe(this.pipeTexture);
//         const pipe2 = new Pipe(this.pipeTexture);
//         pipe.rotation = Math.PI;

//         const maxPosition =
//             Settings.skyHeight -
//             Settings.minPipeHeight -
//             Settings.pipeVerticalGap -
//             pipe.height / 2;
//         const minPosition = -(pipe.height / 2 - Settings.minPipeHeight);

//         pipe.position.y = Math.floor(
//             Math.random() * (maxPosition - minPosition + 1) + minPosition,
//         );

//         pipe2.position.y = pipe.height + pipe.position.y + Settings.pipeVerticalGap;
//         pipe.position.x = pipe2.position.x = 0;

//         pipeGroup.upper = pipe.position.y + pipe.height / 2;
//         pipeGroup.lower = pipeGroup.upper + Settings.pipeVerticalGap;

//         pipeGroup.pipe = pipe;
//         pipeGroup.pipe2 = pipe2;

//         //this.addChild(pipe);
//         this.addChild(pipe2);
//         this.pipes.push(pipeGroup);

//         // this.tryRemovingLastGroup();
//     };

//     tryRemovingLastGroup = () => {
//         if (
//             this.pipes[0].pipe.position.x + Settings.pipeWidth / 2 >
//             Settings.width
//         ) {
//             this.pipes.shift();
//         }
//     };

//     setXforGroup = (index, x) => {
//         const { pipe, pipe2 } = this.pipes[index];
//         pipe.position.x = x;
//         pipe2.position.x = x;
//     };

//     getX = index => {
//         const { pipe } = this.pipes[index];
//         return this.toGlobal(pipe.position).x;
//     };

//     restart = () => {
//         this.pipeIndex = 0;
//         this.pipes = [];
//         this.children = [];
//     };


// }

// export default PipeContainer; 
