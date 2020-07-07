import { GLView } from 'expo';
import * as React from 'react';
import { Image, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

//import Modal from 'modal-react-native-web';
import Modal from 'modal-enhanced-react-native-web';

//importing styles 
import styles from "./src/styles";

import {Card} from 'react-native-elements';

import CircleButton from './assets/CircleButton';


import DisableBodyScrollingView from './components/DisableBodyScrollingView';
import Game from './src/game';

import { AsyncStorage } from "react-native";

import WalkingObject from './src/walking';
import sprites3 from './src/Sprites/guardSheet';

import MainMenu from "./src/Menu/mainmenu";
import Menu from "./src/Menu/inGameMenu";

import LevelSelection from "./src/Menu/LevelSelection";
import { set } from 'gl-matrix/src/gl-matrix/vec2';

require('default-passive-events');

export default class App extends React.Component {
  


  level1_backgrounds = ['background/lvl1_2.png', 'background/lvl1_1.png',
    'background/lvl1_2.png', 'background/lvl1_1.png',
    'background/lvl1_2.png', 'background/lvl1_1.png',
    'background/lvl1_2.png', 'background/lvl1_1.png',
    'background/lvl1_2.png', 'background/lvl1_1.png'];

  level1_Settings = {
    level: 1, //level 
    max: 3, // maximum number of guards
    green: 10, // number of green guards in this level
    yellow: 0, // number of yellow guards in this level
    red: 0, // number of red guards in this level
    max_repetition: 4, // max number of one type of the guard repeats 
    min_repetition: 2,
    background: this.level1_backgrounds,
  };


  level2_backgrounds = ['background/3.png', 'background/3.png',
    'background/3.png', 'background/3.png',
    'background/3.png', 'background/3.png',
    'background/3.png', 'background/3.png',
    'background/3.png', 'background/3.png'];
  
  level2_Settings = {
    level: 2, //level 
    max: 3, // maximum number of guards
    green: 6, // number of green guards in this level
    yellow: 4, // number of yellow guards in this level
    red: 0, // number of red guards in this level
    max_repetition: 4, // max number of one type of the guard repeats 
    min_repetition: 2,
    background: this.level2_backgrounds,

  };

  level3_Settings = {
    level: 3, //level 
    max: 4, // maximum number of guards
    green: 5, // number of green guards in this level
    yellow: 3, // number of yellow guards in this level
    red: 2, // number of red guards in this level
    max_repetition: 4, // max number of one type of the guard repeats 
    min_repetition: 1
  }; 

  state = {
    level_state: 'menu',
    sleepingPills: 0,
    modalVisible: false,
    visibleLost: false,
    visibleCaught: false,
    result: false,
    level_1: true,
    walking: true, 
    win: false,
    lastRefresh: Date(Date.now()).toString(),
    isListEmpty: false,
    currentLevel: this.level1_Settings,
    highestLevel: 1, 
    isMainMenuVisible: true, 
    isLevelsMenuVisible: false, 
    isInGameMenuVisible: false,

  };

  onMenuToggle = () => {
    this.setState((state) => ({
      isInGameMenuVisible: !this.state.isInGameMenuVisible,
    }));
  };


  refreshScreen() {
    this.refreshScreen.bind(this)
  } 

  guardsList = [];
  backgroundList=[]; 
  numberOfCards = 58;

  game = null;


  currentGuard; 
  
  

     levels = {
      1: this.level1_Settings,
      2: this.level2_Settings,
      3: this.level3_Settings,
    }

  // a function that saves your data asyncronously
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('current_level', JSON.stringify(this.state.currentLevel)).then(() => {
        console.log('It was saved successfully')
        console.log(JSON.stringify(this.state.currentLevel))
      })
        .catch(() => {
          console.log('There was an error saving the product')
        });
       await AsyncStorage.setItem('highest_level', this.state.highestLevel);

    } catch (error) {
      // Error saving data
    } 
  }


  // fetch the data back asyncronously
  _retrieveData = async () => {
    try {
      const current_level = await AsyncStorage.getItem('current_level');
      const highest_level = await AsyncStorage.getItem('highest_level');
      if (current_level !== null && highest_level !== null) {
        
        // Our data is fetched successfully
        //this.setState({ highestLevel: highest_level });
        this.setState({ currentLevel: current_level })
      }
      else{
        console.log("null")
      }
    } catch (error) {
      // Error retrieving data
    }
  }

   
  createGuardList(level){
   
    this.guardsList = []
    this.backgroundList = [];
    let random;  // returns a random integer from 0 to 10; 


    let green = level.green;
    let yellow = level.yellow;
    let red = level.red;

    let dic = {}

    for (let i = 1; i <= level.max; i++)
      dic[i] = 0;

    let temp;
    while (this.guardsList.length < 10) {
      random = Math.floor(Math.random() * this.numberOfCards);

      temp = sprites3[random];

      if (dic[temp.number] < level.max_repetition) {
        if (temp.number == 1 && dic[1] > 2) {
        }
        else {
          if (temp.color == 'green' && green != 0) {
            this.guardsList.push(temp)
            dic[temp.number] = dic[temp.number] + 1;
            green--;
          }
          else if (temp.color == 'yellow' && yellow != 0) {
            this.guardsList.push(temp)
            dic[temp.number] = dic[temp.number] + 1;

            yellow--;
          }
          else if (temp.color == 'red' && red != 0) {
            this.guardsList.push(sprites3[random])
            dic[temp.number] = dic[temp.number] + 1;
            red--;
          }
        }
      }

    }
 
    console.log(level)
    console.log(level.background)
    this.backgroundList = Object.assign([],level.background);



    this.setState({ level_state: 'levelOne' }); 
    
  }

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View isLost={false} style={styles.modalContent}>
      

      {
        // Display the content in screen when state object "content" is true.
        // Hide the content in screen when state object "content" is false. 
        !this.state.result && !this.state.win ? 
        <View>
          <Text style={styles.headerText}>How many Guards did you see?</Text>
          <Text style={styles.headerText}> 
            {this._renderButton("1", () => { this.checkForResult(1) })}
            {this._renderButton("2", () => { this.checkForResult(2) })}
            {this._renderButton("3", () => { this.checkForResult(3) })}
            {this._renderButton("4", () => { this.checkForResult(4)})}
            {this._renderButton("5", () => this.checkForResult(5))}

          </Text> 
        </View>: null
      }

      {
        // Display the content in screen when state object "content" is true.
        // Hide the content in screen when state object "content" is false. 
        this.state.result && !this.state.isListEmpty ? <Text style={styles.headerText}> {"\n"}Yes, You got it right!  
        
        {this._renderButton("Next Stage", () => { this.setState({ level_1: false }); this.setState({ visibleModal: false }); this.setState({ level_state: 'walking' });})}

        </Text> : null 

        
           
        }

      {
        // Display the content in screen when state object "content" is true.
        // Hide the content in screen when state object "content" is false. 
        this.state.win ? <Text style={styles.headerText}> {"\n"}Congratulations, you won!

        {
          this._renderButton("Next Level", () => { 
            this.setState({ level_1: false }); 
            this.setState({ visibleModal: false }); 
            this.setState({ level_state: 'create_list' }); 
            this.setState({ currentLevel: this.levels[(this.state.currentLevel.level + 1)], win: false, isListEmpty:false });})}

        </Text> : null

      }

    </View>
  );


  onPressLevelSelection = (selectedLevel) => {

    console.log("Hello" + selectedLevel)
    this.setState({
      currentLevel: this.levels[selectedLevel],
      level_state: 'create_list',
    });


    console.log(this.state.currentLevel)
    console.log(this.levels[selectedLevel])

  }


 checkForResult(userChoice){

    if(userChoice == this.currentGuard.number){
      if(!this.state.isListEmpty)
        !this.setState({ result: true });
      else
        this.setState({win: true});
    }
    else{
      this.setState({ visibleModal: null });
      this.setState({visibleLost: true });
    }

 }
  
  _renderModalLost = () => (
    <View style={styles.modalContent}>
      <Text>That’s not right! Please Try Again! </Text>
      {this._renderButton("Try Again!", () => {
        this.setState({ level_state: 'create_list' }); this.setState({ visibleLost: false});})}
    </View>
  );

  _renderModalCaught= () => (
    <View style={styles.modalContent}>
      <Text>The Guards caught you! Please Try Again! </Text>
      {this._renderButton("Try Again!", () => {
        this.setState({ level_state: 'create_list' }); this.setState({ visibleCaught: false });
      })}
    </View>
  );

  _handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y
    });
  };

  _handleScrollTo = p => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

  displayQuestions = () =>{

    if(!this.game.userLost)
      {
        this.game.onPressOut(); this.setState({ visibleModal: true }); this.game.isButtonReleased = true
      }
    else{
      this.setState({ visibleCaught: true });
    }
  };


  levelSelectionMenu = () => {
    
        this.setState({
          isLevelsMenuVisible: !this.state.isLevelsMenuVisible,
        });
      

    // this._storeData();
    // this._retrieveData();
  };


  backToMainMenu = () => {
    this.setState({
      isMainMenuVisible: true,
      level_state: 'menu',
      isInGameMenuVisible: false,
    });
  };

  startGame = () => {
    this.setState({
      isMainMenuVisible: false,
      level_state: 'create_list',
    });

    console.log(this.state.level_state)
    console.log("start game")
  };


  render() {
    const { style, ...props } = this.props;

  
    const levelOne = (

      <View
        style={[{ width: '100vw', height: '100vh', overflow: 'hidden' }]}
      >

        <Modal
          isVisible={this.state.visibleModal}
        // onBackdropPress={() => this.setState({ visibleModal: false })}
        >

          {this._renderModalContent()}

        </Modal>

        <Modal
          isVisible={this.state.visibleLost}
        //onBackdropPress={() => this.setState({ visibleLost: false })}
        >

          {this._renderModalLost()}

        </Modal>
        <Modal
          isVisible={this.state.visibleCaught}
        //onBackdropPress={() => this.setState({ visibleLost: false })}
        >

          {this._renderModalCaught()}

        </Modal>


        <DisableBodyScrollingView >

          <GLView
            style={{ flex: 1, backgroundColor: 'black' }}
            onContextCreate={context => {
              if (this.guardsList.length > 1){
                
                this.currentGuard = this.guardsList.pop();
                let path = this.backgroundList.pop();
                let bg = require('./assets/' + path);

                this.game = new Game(context, bg, this.currentGuard.name);

                console.log(this.currentGuard);
                this.game.onSleepingPills = sleepingPills => this.setState({ sleepingPills });
              }
              else{
                this.setState({ isListEmpty: true })
                this.currentGuard = this.guardsList.pop();
                let path = this.backgroundList.pop();
                let bg = require('./assets/' + path);

                this.game = new Game(context, bg, this.currentGuard.name);

                console.log(this.currentGuard);
                this.game.onSleepingPills = sleepingPills => this.setState({ sleepingPills });
              }

            }}
          >

          </GLView>  

          


        </DisableBodyScrollingView>
       
        {this.state.isInGameMenuVisible && (
          <Menu
            backToMainMenu = {this.backToMainMenu}
            onMenuToggle = {this.onMenuToggle}
          />

        )}

        <CircleButton
          onPress={this.onMenuToggle}
          style={{
       
            position: "absolute",
            top: 25,
            right: 25,
          }}>
          Menu
          </CircleButton>
        
        <View
          style={{
            userSelect: 'none',
            position: 'absolute',
            bottom: 50,
            left: 100,
          }}
          onLongPress={() => { this.game.onPress(); console.log("it's been pressed"); }}
          onPressOut={() => { this.displayQuestions() }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '10vw', userSelect: 'none', height: '10vh' }}>
            <Image
              style={{ width: 100, userSelect: 'none', height: 100 }}
              source={require('./assets/binoculars6.png')}
              resizeMode="contain"
            />
            {/* <Text style={{ fontWeight: '600', userSelect: 'none' }}>Expo</Text> */}
          </View>
        </View>

        <TouchableOpacity
          style={{
            userSelect: 'none',
            position: 'absolute',
            bottom: 50,
            left: 100,
          }}
          onLongPress={() => { this.game.onPress(); console.log("it's been pressed"); }}
          onPressOut={() => { this.displayQuestions() }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '20vw', userSelect: 'none', height: '20vh' }}>
        
          </View>
        </TouchableOpacity>

        <View style={{
          userSelect: 'none',
          position: 'absolute',
          top: 20,
          left: 20,
        }}>
          <Card title={"Level " + this.state.currentLevel.level}>
            {/*react-native-elements Card*/}
            <Text style={styles.paragraph}>
              Stage {10 - this.guardsList.length}/10
          </Text>

            <Text>5 X
            <Image
                style={{ width: 15, userSelect: 'none', height: 15, top: 3 }}
                source={require('./assets/sleepingSpell.png')}
                resizeMode="contain"
              />
            </Text>
          </Card>
        </View>


      </View>

    );


    const walking = (
      
      <View
        style={[{ width: '100vw', height: '100vh', overflow: 'hidden' }]}
      >

        <Modal
          isVisible={this.state.visibleModal}
          onBackdropPress={() => this.setState({ visibleModal: false })}
        >

          {this._renderModalContent()}

        </Modal>

        <Modal
          isVisible={this.state.visibleLost}
          onBackdropPress={() => this.setState({ visibleLost: false })}
        >

          {this._renderModalLost()}

        </Modal>


        <DisableBodyScrollingView >

          <GLView
            style={{ flex: 1, backgroundColor: 'black' }}
            onContextCreate={context => {
              this.game = new WalkingObject(context);
             // this.game.walking = walking => { this.setState({ walking: walking }); if (!walking) this.setState({ level_state: 'levelOne' });};
             // console.log("Inside walking object: " + this.state.walking )
            

       }}
     >
          </GLView>

        </DisableBodyScrollingView>

        <TouchableOpacity
          style={{
            userSelect: 'none',
            position: 'absolute',
            bottom: 50,
            left: 100,
          }}
          onPress={() => { this.setState({ walking: false }); this.setState({level_state: 'levelOne'})}}
          onPressOut={() => { this.setState({ result: false });}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{ width: 100, userSelect: 'none', height: 100 }}
              source={require('./assets/binoculars6.png')}
            />
          </View>
        </TouchableOpacity>




      </View>

    );

    let selectedLevel = 0;

    return (
    
      <div>

        {this.state.level_state == 'menu' && !this.state.isLevelsMenuVisible && (
            <MainMenu
              startGame={this.startGame}
              levelSelectionMenu = {this.levelSelectionMenu}
              
            />
            
        ) }

          {this.state.isLevelsMenuVisible && (
            <LevelSelection
            selectedLevel={selectedLevel}
            onPressLevelSelection ={this.onPressLevelSelection}
            back={this.levelSelectionMenu}
            />
          )}
        {this.state.level_state == 'create_list' && this.createGuardList(this.state.currentLevel)}
        {this.state.level_state == 'walking' && walking}
        {this.state.level_state == 'levelOne' && levelOne} 
      </div>

      
    );

  }
}

const SleepingPills = ({ children }) => (
  <Text
    style={{
      position: 'absolute',
      left: 0,
      top: '10%',
      right: 0,
      textAlign: 'center',
      color: 'white',
      fontSize: 48,
      userSelect: 'none',
    }}
  >
    {/* {children} */}
  </Text>
);