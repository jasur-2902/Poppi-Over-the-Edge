import React, { useRef, useEffect } from "react";

import { Animated, StyleSheet, TouchableOpacity, View, Image } from "react-native";

import { Card } from 'react-native-elements';


import DisableBodyScrollingView from '../../components/DisableBodyScrollingView';

import { GLView } from 'expo';

import Modal from 'modal-enhanced-react-native-web';

import CircleButton from "../../assets/CircleButton";

import styles from "../styles";

let gameState; 

let guardsList = [];
let backgroundList = [];
let numberOfCards = 58;



const GameInterface = ({ state }) => {

return (
    <View

        style={[{ width: '100vw', height: '100vh', overflow: 'hidden' }]}
    >



        <DisableBodyScrollingView >

            {/* <View style={{
                userSelect: 'none',
                position: 'absolute',
                top: 15,
                left: 15,

            }}> */}
                {/* //+ this.state.currentLevel.level */}
                {/* <Card title={"Level " }>
                    <Text style={styles.paragraph}> */}
                        {/* Stage {10 - this.guardsList.length + 1}/10 */}
          {/* </Text>

                    <Text>5 X
            <Image
                            style={{ width: 15, userSelect: 'none', height: 15, top: 3 }}
                            source={require('../../assets/sleepingSpell.png')}
                            resizeMode="contain"
                        />
                    </Text>
                </Card>
            </View> */}

            <GLView
                style={{ flex: 1, backgroundColor: 'black' }}
                onContextCreate={context => {
                    if (true) {

                 //       this.currentGuard = this.guardsList.pop();
              //          let path = this.backgroundList.pop();
              //          let bg = require('../../assets/' + path);

           //             this.game = new Game(context, this.currentGuard.name);

                        //console.log(this.currentGuard);
             //          this.game.onScore = binocularState => this.toggleBinocular(binocularState);
                    }
                    else {
                        this.setState({ isListEmpty: true })
                        //this.currentGuard = this.guardsList.pop();
                       // let path = this.backgroundList.pop();
                       // let bg = require('../../assets/' + path);

                       // this.game = new Game(context, bg, this.currentGuard.name);

                        //console.log(this.currentGuard);
                        //this.game.onSleepingPills = sleepingPills => this.setState({ sleepingPills });
                    }

                }}
            >

            </GLView>


        </DisableBodyScrollingView>


    </View>

    )

};



export default GameInterface;
