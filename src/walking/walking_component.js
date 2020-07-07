import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";

import colors from "../../assets/constants/colors";
import DisableBodyScrollingView from '../../components/DisableBodyScrollingView';

import { GLView } from 'expo';


import { PIXI } from 'expo-pixi';
import { extras, Sprite } from 'pixi.js';
import { PixelRatio } from 'react-native';

import source from '../../assets/background/walking.png';
import penguinSource from '../../assets/penguin/penguin1.png';

import setupSpriteSheetAsync from '../setupSpriteSheetAsync';
import sprites from '../sprites';
import penguinSprites from '../Sprites/penguin';
import CircleButton from "../../assets/CircleButton";


let game;



const WalkingComponent = ({ stopWalking }) => {


    let doSomething = () => {
        stopWalking()

    }

    return (
        <View
            style={[{ width: '100vw', height: '100vh', overflow: 'hidden' }]}
        >

            <DisableBodyScrollingView >

                <GLView
                    style={{ flex: 1, backgroundColor: 'black' }}
                    onContextCreate={context => {
                        game = new Game(context);
                        game.onScore = animationState => doSomething(animationState);
                    }}
                >

                </GLView>

            </DisableBodyScrollingView>

            {/* <TouchableOpacity
                style={{
                    userSelect: 'none',
                    position: 'absolute',
                    bottom: 50,
                    left: 100,
                }}
                onPress={() => { doSomething }}
                >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Button></Button>
                </View>
            </TouchableOpacity> */}

            <CircleButton style={{
                userSelect: 'none',
                position: 'absolute',
                bottom: 25,
                right: 25,
                
                     }}
                color="#fff" onPress={() => { doSomething() }}>
                SKIP
            </CircleButton>


        </View>
    );

    
};



const styles = StyleSheet.create({
    root: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999999999, // active card will have a zIndex of `e.timeStamp`- so this needs to be larger
    },
    // Hacky way to have an opaque background without using rgba
    underlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.grayDark,
        opacity: 0.9,
    },
    menu: {
        margin: 8,
    },
});

export default WalkingComponent;


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
    gameSpeed: 25 * 0.25,
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
        this.position.y = Settings.height / 1.24;
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

        this.bird.animationSpeed = 0.2;

        if (this.bird.position.x < Settings.width * 0.6) {
            this.bird.position.x += Settings.gameSpeed;
            this.bird.animationSpeed = 0.1;

        }
        else {
            this.bird.animationSpeed = 0.0;
            this.stoppedWalking = false;
            this.animationState = false; 
            this.onScore(this.animationState)
            this.stopAnimating = true;
        }
        
    };


}


