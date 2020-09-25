import React, { Component } from "react";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  AsyncStorage,
  TouchableOpacity,
  Alert,
} from "react-native";

import { FlatGrid } from 'react-native-super-grid';
import '../../App.js';



import colors from "../../assets/constants/colors";
import Button from "../../assets/Button";


let LevelSelection = ({ onPressLevelSelection, selectedLevel ,props, back}) => {
  

  const [items, setItems] = React.useState([
    { name: 'Level 1', code: '#1abc9c', level: 1, background:''},
    { name: 'Level 2', code: '#34495e', level: 2, background:'../../assets/background/orange.png'},
    { name: 'Level 3', code: '#27ae60', level: 3, background: '../../assets/background/orange.png' },
    // { name: 'Underwater', code: '#9b59b6', level: 4, background:'../../assets/background/orange.png'},
    // { name: 'Jungle', code: '#2ecc71', level: 5, background: '../../assets/background/orange.jpg' },
    // { name: 'Halloween', code: '#16a085', level: 6, background:'/../../assets/background/orange.png'},
    // { name: 'Ruins', code: '#3498db', level: 7, background: '/../../assets/background/orange.png' },
    // { name: '', code: '#2980b9', level: 8, background:'/../../assets/background/comingsoon.jpg'},
    // { name: '', code: '#8e44ad', level: 9, background:'/../../assets/background/comingsoon.jpg'},
    // { name: '', code: '#2c3e50', level: 10, background:'/../../assets/background/comingsoon.jpg'},
    // { name: '', code: '#f1c40f', level: 11, background:'/../../assets/background/comingsoon.jpg'},
    // { name: '', code: '#e67e22', level: 12, background:'/../../assets/background/comingsoon.jpg'},
    
  ]);

  
  let doSomething = (level) =>{
    // if(level<4)
      onPressLevelSelection(level)
    // else{
    //   Alert.alert(
    //     'Alert Title',
    //     'My Alert Msg',
    //     [
    //       {
    //         text: 'Ask me later',
    //         onPress: () => console.log('Ask me later pressed')
    //       },
    //       {
    //         text: 'Cancel',
    //         onPress: () => console.log('Cancel Pressed'),
    //         style: 'cancel'
    //       },
    //       { text: 'OK', onPress: () => console.log('OK Pressed') }
    //     ],
    //     { cancelable: false }
    //   );
    // }
  }

  return (
    <View style={styles.root}>
      <ImageBackground source={require("../../assets/trianglify.png")} style={styles.root}>
      <Text style={styles.text}>Please select the level:</Text>

      <FlatGrid
      itemDimension={230}
      data={items}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <View>
       
          <TouchableOpacity
            onPress={() =>  doSomething(item.level)}>
          {/* <ImageBackground  imageStyle={{ borderRadius: 5 }} source={require(item.background)}> */}

            <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
              {/* <Text style={styles.itemName}>{item.name}</Text> */}

            <Text style={styles.itemName}>Level {item.level}</Text>
          
          </View>
          {/* </ImageBackground> */}
          </TouchableOpacity>
        </View>
      )}
    />   
        <Button
          onPress={back}
          style={{
            position: "absolute",
            bottom: 25,
            right: 25,
          }}>
          Back
          </Button>
      </ImageBackground>
    </View>

  );
};


const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    
  },
  button: {
    marginBottom: 8,
    width: '30vw'
  },
  button_text:{
    fontSize: '2vw',
  },
  active: {
    borderColor: "blue",
  },
  text: {
    color: colors.grayDark,
    fontFamily: "Dimbo",
    fontSize: '3vw',
    lineHeight: 60,
  },
  gridView: {
    marginTop: '1vh',
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

export default LevelSelection;
