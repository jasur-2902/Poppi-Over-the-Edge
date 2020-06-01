import { GLView } from 'expo';
import * as React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';

//import Modal from 'modal-react-native-web';
import Modal from 'modal-enhanced-react-native-web';

//importing styles 
import styles from "./src/styles";

import DisableBodyScrollingView from './components/DisableBodyScrollingView';
import Game from './src/game';
import Level2 from './src/level2';
import WalkingObject from './src/walking';
import sprites3 from './src/Sprites/guardSheet';


export default class App extends React.Component {
  state = {
    level_state: 'create_list',
    score: 0,
    modalVisible: false,
    visibleLost: false,
    result: false,
    level_1: true,
    walking: true, 
    lastRefresh: Date(Date.now()).toString(),
  };

  refreshScreen() {
    this.refreshScreen.bind(this)
  } 

  guardsList = [];
  backgroundList=[]; 

  currentGuard; 
  
   level1_Settings = {
      level: 1, //level 
      max: 3, // maximum number of guards
      green: 10, // number of green guards in this level
      yellow: 0, // number of yellow guards in this level
      red: 0, // number of red guards in this level
      max_repetition: 4, // max number of one type of the guard repeats 
      min_repetition: 2,
    };



    level2_Settings = {
      level: 2, //level 
      max: 3, // maximum number of guards
      green: 6, // number of green guards in this level
      yellow: 4, // number of yellow guards in this level
      red: 0, // number of red guards in this level
      max_repetition: 4, // max number of one type of the guard repeats 
      min_repetition: 2
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



    numberOfCards = 30; 

  createGuardList(){
   

    let random;  // returns a random integer from 0 to 10; 


    let green = this.level3_Settings.green;
    let yellow = this.level3_Settings.yellow;
    let red = this.level3_Settings.red;

    let dic = {}

    for (let i = 1; i <= this.level3_Settings.max; i++)
      dic[i] = 0;

    let temp;
    while (this.guardsList.length < 10) {
      random = Math.floor(Math.random() * this.numberOfCards);

      temp = sprites3[random];

      if (dic[temp.number] < this.level3_Settings.max_repetition) {
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
    console.log(this.guardsList);
    console.log(dic);

    this.backgroundList.push("background2.png");
    this.backgroundList.push("background.png");
    this.backgroundList.push("background2.png");
    this.backgroundList.push("background.png");
    this.backgroundList.push("background2.png");
    this.backgroundList.push("background.png");
    this.backgroundList.push("background2.png");
    this.backgroundList.push("background.png");
    this.backgroundList.push("background2.png");
    this.backgroundList.push("background.png");

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
    <View isLost={false} style= { {height:600}} style={styles.modalContent}>
      <Text>How many Guards did you see?</Text>

      {
        // Display the content in screen when state object "content" is true.
        // Hide the content in screen when state object "content" is false. 
        !this.state.result ? <Text style={styles.headerText}> 
        
          {this._renderButton("1", () => { this.checkForResult(1) })}
          {this._renderButton("2", () => { this.checkForResult(2) })}
          {this._renderButton("3", () => { this.checkForResult(3) })}
          {this._renderButton("4", () => { this.checkForResult(4)})}
          {this._renderButton("5", () => this.checkForResult(5))}

        </Text> : null
      }

      {
        // Display the content in screen when state object "content" is true.
        // Hide the content in screen when state object "content" is false. 
        this.state.result ? <Text style={styles.headerText}> {"\n"}Yes, You got it right!  
        
        {this._renderButton("Next Level", () => { this.setState({ level_1: false }); this.setState({ visibleModal: false }); this.setState({ level_state: 'walking' });})}

        </Text> : null 
           
 }

    </View>
  );


 checkForResult(userChoice){

    if(userChoice == this.currentGuard.number){
      this.setState({ result: true });
    }
    else{
      this.setState({ visibleModal: null });
    }

 }
  
  _renderModalLost = () => (
    <View style={styles.modalContent}>
      <Text>That’s not right! Start Again! </Text>
      {this._renderButton("Try Again!", () => console.log("Try Again"))}
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
      this.setState({ visibleLost: true });
    }
  };
  
  render() {
    const { style, ...props } = this.props;

    console.log(this.state.level_1)



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


        <DisableBodyScrollingView >

          <GLView
            style={{ flex: 1, backgroundColor: 'black' }}
            onContextCreate={context => {

              this.currentGuard = this.guardsList.pop();
              let path = this.backgroundList.pop();
              let bg = require('./assets/' + path);

              this.game = new Game(context, bg, this.currentGuard.name);

              console.log(this.currentGuard);
              this.game.onScore = score => this.setState({ score });

            }}
          >

          </GLView>  

          


        </DisableBodyScrollingView>
       
        <TouchableOpacity
          style={{
            userSelect: 'none',
            textDecoration: 'none',
            position: 'absolute',
            bottom: 50,
            left: 100,
          }}
          onLongPress={() => { this.game.onPress(); console.log("it's been pressed"); }}
          onPressOut={() => { this.displayQuestions() }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{ width: 100, userSelect: 'none', height: 100 }}
              source={require('./assets/binoculars6.png')}
            />
            {/* <Text style={{ fontWeight: '600', userSelect: 'none' }}>Expo</Text> */}
          </View>
        </TouchableOpacity>




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
               this.setState({walking: this.game.stoppedWalking });
              console.log("Inside walking object: " + this.game.stoppedWalking )

       }}
     >
          </GLView>

        </DisableBodyScrollingView>

        <TouchableOpacity
          style={{
            userSelect: 'none',
            textDecoration: 'none',
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

    return (
    
      
      <div>
        {this.state.level_state == 'create_list' && this.createGuardList()}
        {this.state.level_state == 'walking' && walking}
        {this.state.level_state == 'levelOne' && levelOne}
      </div>

      
    );

  }
}

