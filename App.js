import { GLView } from 'expo-gl';
import * as React from 'react';
import {Animated, Image, Text, View, TouchableOpacity } from 'react-native';
import Modal from 'modal-enhanced-react-native-web';
import styles from "./src/styles"; //importing styles
import {Card} from 'react-native-elements';
import CircleButton from './assets/CircleButton';
import WalkingComponent from './src/walking/walking_component'
import DisableBodyScrollingView from './components/DisableBodyScrollingView';
import Game from './src/game';
import { AsyncStorage } from "react-native";
import sprites3 from './src/Sprites/guardSheet';
import MainMenu from "./src/Menu/mainmenu";
import CustomLevel from "./src/Menu/customLevel";
import Menu from "./src/Menu/inGameMenu";
import Binocular from "./src/Binocular/binocular"
import LevelSelection from "./src/Menu/LevelSelection";
import Loading from "./src/Loading/loading";
import LoginId from "./src/LoginID/loginId";


import { firebase } from './src/firebase/config';


import AnimatedSplash from "react-native-animated-splash-screen";


export default class App extends React.Component {



  


  // Global Variables 

  guardsList = [];
  backgroundList = [];
  numberOfCards = 30;
  game = null;
  currentGuard;
  gameResult = []; 
  userId = 77777; 
  gameStats = new Map(); 


  // Backgrounds for Level 1 Stages 
  level1_backgrounds = ['background/lvl1.png', 'background/lvl1.png',
    'background/lvl1.png', 'background/lvl1.png',
    'background/lvl1.png', 'background/lvl1.png',
    'background/lvl1.png', 'background/lvl1.png',
    'background/lvl1.png', 'background/lvl1.png'];

  // Level 1 Settings input 
  level1_Settings = {
    level: 1, //level
    max: 3, // maximum number of guards
    green: 10, // number of green guards in this level
    yellow: 0, // number of yellow guards in this level
    red: 0, // number of red guards in this level
    max_repetition: 4, // max number of one type of the guard repeats
    min_repetition: 2,
    background: this.level1_backgrounds,
    time: 3000, 
    type: "regular", 
  };

  // Backgrounds for Level 2 Stages 
  level2_backgrounds = ['background/lvl1.png', 'background/lvl1.png',
    'background/lvl1.png', 'background/lvl1.png',
    'background/lvl1.png', 'background/lvl1.png',
    'background/lvl1.png', 'background/lvl1.png',
    'background/lvl1.png', 'background/lvl1.png'];

  // Level 1 Settings input 
  level2_Settings = {
    level: 2, //level
    max: 3, // maximum number of guards
    green: 6, // number of green guards in this level
    yellow: 4, // number of yellow guards in this level
    red: 0, // number of red guards in this level
    max_repetition: 4, // max number of one type of the guard repeats
    min_repetition: 2,
    background: this.level2_backgrounds,
    time: 2500,
    type: "regular", 
  };

  level3_Settings = {
    level: 3, //level
    max: 4, // maximum number of guards
    green: 5, // number of green guards in this level
    yellow: 3, // number of yellow guards in this level
    red: 2, // number of red guards in this level
    max_repetition: 4, // max number of one type of the guard repeats
    min_repetition: 1,
    time: 2000, 
    type: "regular", 
  };

  custom_Settings = {
    level: 3, //level
    max: 4, // maximum number of guards
    green: 5, // number of green guards in this level
    yellow: 3, // number of yellow guards in this level
    red: 2, // number of red guards in this level
    max_repetition: 4, // max number of one type of the guard repeats
    min_repetition: 1,
    time: 2000,
    type: "custom", 
  };


  state = {
    level_state: 'login', // Current state of the app: menu = Main Menu 
    sleepingPills: 0, // Number of sleeping pills 
    modalVisible: false, // Dialog view visability 
    visibleLost: false, // Lost Dialog view visability 
    visibleCaught: false, // Caught Dialog view visability 
    result: false, 
    level_1: true,
    walking: true,
    win: false,
    lastRefresh: Date(Date.now()).toString(), 
    isListEmpty: false, // It tracks the end of the level 
    currentLevel: this.level1_Settings, // Current level 
    highestLevel: 1, 
    isMainMenuVisible: true,
    isLevelsMenuVisible: false,
    isInGameMenuVisible: false,
    isBinocularVisible: false,
    isLoadingVisible: false, 
    isLoaded: false,
    stage: 1, 
    };


  // List of available levels' settings.
  levels = { //TODO only 3 levels are available rn, add more levels 
    1: this.level1_Settings,
    2: this.level2_Settings,
    3: this.level3_Settings,
  }


  // Funtion to Toggle In Game menu 
  onMenuToggle = () => {
    console.log("it's working ")
    this.setState((state) => ({
      isInGameMenuVisible: !this.state.isInGameMenuVisible,
    }));
  };

   entityRef = firebase.firestore().collection('entities');

  _firebaseTest = () =>{
    // this.entityRef
    //   .add("data")
    //   .then(_doc => {
    //     setEntityText('')
    //     Keyboard.dismiss()
    //   })
    //   .catch((error) => {
    //     alert(error)
    //   });

    firebase.database().ref('users/' + this.userId + '/' + this.gameStats["timeStamp"]).set({
      id: this.userId,
      level: this.gameStats["level"],
      result: this.gameStats["result"],
      givenTime: this.gameStats["givenTime"],
      timeSpent: this.gameStats["timeSpent"],
      numOfguards: this.gameStats["numOfguards"],
      timeStamp: this.gameStats["timeStamp"],
    });


  }

  // a function that saves data asyncronously
  _storeData = async () => {


    try {
      // await AsyncStorage.setItem('current_level', JSON.stringify(this.state.highestLevel)).then(() => {
      //   console.log('It was saved successfully')
      //   // console.log(JSON.stringify(this.state.highestLevel)); 
      // })
      //   .catch(() => {
      //     console.log('There was anerror saving the product')
      //   });
       await AsyncStorage.setItem('highest_level', this.state.highestLevel);

    } catch (error) {
      // Error saving data
    }
  }

  // fetch the data back asyncronously
  _retrieveData = async () => {
    try {
      // const current_level = await AsyncStorage.getItem('current_level');
      const highest_level = await AsyncStorage.getItem('highest_level');
      if (highest_level !== null) {

        // Our data is fetched successfully
        //this.setState({ highestLevel: highest_level });
        this.setState({ highestLevel: highest_level })

        console.log(highest_level);
      }
      else{
        console.log("null")
      }
    } catch (error) {
      // Error retrieving data
    }
  }


  // Functions that creates guardList for the given level 
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
      console.log(temp);

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
    this.backgroundList = Object.assign([],level.background);

    this.setState({ level_state: 'levelOne' });
  }

  //Function that creates buttons for dialog view. 
  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  //Function that creates Content for buttons 
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

        {this._renderButton("Next Stage", () => { this.setState({ level_1: false }); this.setState({ visibleModal: false }); this.setState({ level_state: 'walking' }); this.game.destroyGame() })}

        </Text> : null

        }

      {
        // Display the content in screen when state object "content" is true.
        // Hide the content in screen when state object "content" is false.
        this.state.win ? <Text style={styles.headerText}> {"\n"}Congratulations, you won!

        {
          
          this._renderButton("Next Level", () => {

            if(this.state.currentLevel.type == "regular"){
              this.setState({
                level_1: false,
                visibleModal: false, 
                level_state: 'create_list',
                isLoadingVisible: true,
                currentLevel: this.levels[(this.state.currentLevel.level + 1)], 
                win: false, isListEmpty: false }); 
              
              }
            else{
              console.log("ELSEO");
              this.game.stopAnimating = true; 
              this.setState({
                level_1: false, 
                visibleModal: false, 
                level_state: "menu",
                currentLevel: this.levels[1], 

                win: false, 
                isListEmpty: false, 
              });

            }
              }
             
             
             
             
             )}
            
 
        </Text> : null

      }

    </View>
  );


  onPressLevelSelection = (selectedLevel) => {

    this.setState({
      currentLevel: this.levels[selectedLevel],
      level_state: 'create_list',
    });

  }


 checkForResult(userChoice){

    if(userChoice == this.currentGuard.number){

      { this.gameResult.push("Correct") }
      { this.gameStats["result"] = "Correct"}
      // { console.log(this.gameResult) }
      // { console.log(this.gameStats) }
      // { console.log(this.gameStats['level']) }
      { this._firebaseTest()}
      if(!this.state.isListEmpty)
        !this.setState({ result: true });
      else
        this.setState({win: true});
    }
    else{
      { this.gameResult.push("Incorrect") }
      { this.gameStats["result"] = "Incorrect" }
      { this._firebaseTest() }
      // { console.log(this.gameResult) }
      this.setState({ visibleModal: null });
      this.setState({visibleLost: true });

    }

 }

  _renderModalLost = () => (
    <View style={styles.modalContent}>
      <Text>That’s not right! Please Try Again! </Text>
      {this._renderButton("Try Again!", () => {
        this.setState({ level_state: 'create_list' }); this.setState({ visibleLost: false });
      })}
    </View>
  );


  _renderModalCaught= () => (
    <View style={styles.modalContent}>
      <Text>The Guards caught you! Please Try Again! </Text>
      {this._renderButton("Try Again!", () => {
        { this.gameStats["result"] = "Caught" }
        { this.gameResult.push("Caught") }
        { console.log(this.gameResult) }
        { this._firebaseTest() }
        this.setState({ level_state: 'create_list' }); this.setState({ visibleCaught: false });
      })}
     

    </View>

    
  );

  displayQuestions = () =>{

    if(!this.game.userLost)
      {
        this.game.onPressOut(); this.setState({ visibleModal: true }); this.game.isButtonReleased = true;
      }
    else{
      this.setState({ visibleCaught: true });
      this.game.onPressOut(); 
    }
  };


  levelSelectionMenu = () => {

        this.setState({
          isLevelsMenuVisible: !this.state.isLevelsMenuVisible,
        });

    // this._storeData();
    // this._retrieveData();
  };

  stopWalking = () =>{
    this.setState({ walking: false, isLoadingVisible: false });
    this.setState({ level_state: 'levelOne' })
    this.setState({ result: false });
  }

  backToMainMenu = () => {
    this.setState({
      isMainMenuVisible: true,
      level_state: 'menu',
      isInGameMenuVisible: false,
    });
  };

  startGame = () => {
    this.setState({
      highestLevel: 2, 
      isMainMenuVisible: false,
      isLoadingVisible: true, 
      level_state: 'create_list',
    });
  };
  

   toggleBinocular = () => {
     console.log("it's working")
     this.setState((state) => ({
       isBinocularVisible: !this.state.isBinocularVisible,
     }));
    }

  toggleCustomLevel = () => {
    console.log("it's working")
        this.setState((state) => ({
        level_state: 'custom_level',
    }));
  }

  
  toggleLoadingPage = (state) => {
    console.log("it's working")
    this.setState((state) => ({
      isLoadingVisible: false,
    }));
  }
  

  // Creating custom level settings 
  startCustomLevel = (time,level) => {

    let levelSettingsCopy = this.levels[level];

    this.custom_Settings.level = level; 
    this.custom_Settings.time = time*1000; 
    this.custom_Settings.max = levelSettingsCopy.max; 
    this.custom_Settings.green = levelSettingsCopy.green; 
    this.custom_Settings.yellow = levelSettingsCopy.yellow; 
    this.custom_Settings.red = levelSettingsCopy.red; 
    this.custom_Settings.max_repetition = levelSettingsCopy.max_repetition; 
    this.custom_Settings.min_repetition = levelSettingsCopy.min_repetition; 

     
    this.setState({ currentLevel: this.custom_Settings, level_state: 'create_list' }); 

    console.log("Custom Level ", levelSettingsCopy);
  }

  selectedLevel = 0;

  //fadeAnim = React.useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  animate() {
    React.useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 1000,
        }
      ).start();
    }, [fadeAnim])
  }


  addTimeSpent = (time) =>{
    this.gameResult.push(time);
    this.gameStats["timeSpent"] = time; 
    console.log("Time spent: " + time ); 
  }


  receiveUserId = (userId) =>{

    console.log("User Id: " + userId);
    this.setState({level_state: 'menu'}); 
    this.userId = userId; 

  }


  levelOne = (

    <View>  
          
      <View style={[{ width: '100vw', height: '100vh', overflow: 'hidden' }]}>

        <DisableBodyScrollingView >

          <GLView
            style={{ flex: 1, backgroundColor: 'black' }}
            onContextCreate={context => {
              if (this.guardsList.length > 1) {

                this.currentGuard = this.guardsList.pop();
               // let path = this.backgroundList.pop();
               // let bg = require('./assets/' + path);

                console.log("Current Guard: " + this.currentGuard.number);
              
                // Adding timestamp 
                this.gameStats["timeStamp"] = Date.now(); 
                this.gameResult.push( Date.now());

                //Adding number of guards 
                this.gameStats["numOfguards"] = this.currentGuard.number; 
                this.gameResult.push(this.currentGuard.number);

                //Adding level 
                this.gameStats["level"] = this.state.currentLevel.level;
                this.gameResult.push(this.state.currentLevel.level);
                
                //Time Limit
                this.gameStats["givenTime"] = this.state.currentLevel.time;
                this.gameResult.push(this.state.currentLevel.time); 


                this.setState({ stage: this.guardsList.length });

                this._storeData();
                this._retrieveData();

                this.game = new Game(context, this.currentGuard.name, Math.floor(Math.random() * 3), this.state.currentLevel.time);

                console.log("guard name", this.currentGuard.name);

                this.game.onScore = binocularState => this.toggleBinocular(binocularState);
                this.game.loading = loadingState => this.toggleLoadingPage(loadingState);
                this.game.timeSpent = timeSpent => this.addTimeSpent(timeSpent);

              }
              else {
                this.setState({ isListEmpty: true })
                this.currentGuard = this.guardsList.pop();
                //let path = this.backgroundList.pop();
                console.log("Current Guard: " + this.currentGuard);

                //let bg = require('./assets/' + path);

                this.game = new Game(context, this.currentGuard.name, Math.floor(Math.random() * 3), this.state.currentLevel.time);

                this.game.onScore = binocularState => this.toggleBinocular(binocularState);
                this.game.loading = loadingState => this.toggleLoadingPage(loadingState);
                this.game.timeSpent = timeSpent => this.addTimeSpent(timeSpent);
                //this.game.onSleepingPills = sleepingPills => this.setState({ sleepingPills });
              }

            }}
          >
          </GLView>

         

        </DisableBodyScrollingView>

      </View>


      {/* ======================================================================================= */}


      

      <CircleButton
        onPress={this.onMenuToggle}
        style={{
          position: "absolute",
          top: 25,
          right: 25,
        }}>
        Menu
      </CircleButton>
     
  </View>
);

  lazyWithPreload(factory) {
    const Component = React.lazy(factory);
    Component.preload = factory;
    console.log("preloading");
    return Component;
  }

  StockChart = this.lazyWithPreload(() => this.levelOne);

  render() {

    return (

      <div>

       
      {console.log("Highest levle: "+this.state.highestLevel)}

        {this.state.isInGameMenuVisible && (
          <Menu
            style={{ zIndex: 100 }}
            backToMainMenu={this.backToMainMenu}
            onMenuToggle={this.onMenuToggle}
          />)}

        <Modal isVisible={this.state.visibleModal}
        // onBackdropPress={() => this.setState({ visibleModal: false })}
        >
          {this._renderModalContent()}
        </Modal>

        <Modal isVisible={this.state.visibleLost}>
          {this._renderModalLost()}
        </Modal>

        <Modal isVisible={this.state.visibleCaught}>
          {this._renderModalCaught()}
        </Modal>

        {this.state.level_state == 'menu' && !this.state.isLevelsMenuVisible && (
            <MainMenu
              startGame={this.startGame}
              customLevel={this.toggleCustomLevel}
              levelSelectionMenu = {this.levelSelectionMenu}
            />) 
        }
        {this.state.level_state == 'login' && !this.state.isLevelsMenuVisible && (
          <LoginId
            receiveUserId={this.receiveUserId}
          />)
        }

        {this.state.level_state == 'custom_level'  && (
          <CustomLevel
            startCustomLevel={this.startCustomLevel}
            back = {this.backToMainMenu}
          />)
        }

          {this.state.isLevelsMenuVisible && (
            <LevelSelection
           // selectedLevel={selectedLevel}
            onPressLevelSelection ={this.onPressLevelSelection}
            back={this.levelSelectionMenu}
            />
          )}
        {this.state.level_state == 'create_list' && this.createGuardList(this.state.currentLevel) }
        {this.state.level_state == 'walking' && (
          <React.Suspense fallback={<div>Loading...</div>}>
            <WalkingComponent
              stopWalking={this.stopWalking}>
            </WalkingComponent>
          </React.Suspense>
        )}
       

       

        {this.state.isBinocularVisible && (<Binocular

        />)}

        {this.state.level_state == 'levelOne' &&

          // <AnimatedSplash
          //   translucent={true}
          //   isLoaded={this.state.isLoaded}
          //   logoImage={require("./assets/icons/loading-icon.png")}
          //   backgroundColor={"#262626"}
          //   logoHeight={150}
          //   logoWidth={150}
          // >            
          this.StockChart.preload()

          // </AnimatedSplash>
        }

        {this.state.level_state == 'levelOne' &&(
          <View style= {{
              zIndex: 99999
            }}>
         <View
            style={{
              userSelect: 'none',
              position: 'absolute',
              bottom: 50,
              left: 100,
              zIndex: 99999
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '10vw', userSelect: 'none', height: '10vh' }}>
              <Image
                style={{ width: 100, userSelect: 'none', height: 100 }}
                source={require('./assets/binoculars6.png')}
                resizeMode="contain" />
              {/* <Text style={{ fontWeight: '600', userSelect: 'none' }}>Expo</Text> */}
            </View>
          </View>

          <TouchableOpacity
            style={{
              userSelect: 'none',
              position: 'absolute',
              bottom: 50,
              left: 100,
              zIndex: 99999
            }}
            onLongPress={() => {
              this.game.onPress(); console.log("it's been pressed");
            }}
            onPressOut={() => { this.displayQuestions(); this.toggleBinocular() }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '20vw', userSelect: 'none', height: '20vh' }}>
            </View>
          </TouchableOpacity>
          </View>
        )}

        {this.state.level_state == 'levelOne' && (
          <View style={{
            userSelect: 'none',
            position: 'absolute',
            top: 15,
            left: 15,
          }}>

            <Card title={"Level " + this.state.currentLevel.level}>
              <Text style={styles.paragraph}>
                Stage {10 - this.state.stage}/10
                {console.log(this.guardsList.length)}
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

        )}

        {this.state.isLoadingVisible && (<Loading
          
        />)}
      </div>
    );

  }
}
