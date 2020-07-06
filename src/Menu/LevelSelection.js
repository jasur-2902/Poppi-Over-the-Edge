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
} from "react-native";

import { FlatGrid } from 'react-native-super-grid';
import '../../App.js';



import colors from "../../assets/constants/colors";
import Button from "../../assets/Button";


let highestLevel = 1;

// _retrieveData = async () => {
//   try {
//     const highest_level = await AsyncStorage.getItem('highest_level');
//     if (highest_level !== null) {
//       // Our data is fetched successfully
//       console.log(highest_level.toString())
//       this.highestLevel = highest_level;
//     }
//     else {
//       console.log("null")
//     }
//   } catch (error) {
//     // Error retrieving data
//   }
// }


let LevelSelection = ({ onPressLevelSelection, selectedLevel,props}) => {
  

  const [items, setItems] = React.useState([
    { name: 'Mountain', code: '#1abc9c', level: 1, background:'background/mountain.png'},
    { name: 'Jungle', code: '#2ecc71', level: 2, background:'background/jungle.jpg'},
    { name: 'Ruins', code: '#3498db', level:  3, background:'background/ruins.png'},
    { name: 'Underwater', code: '#9b59b6', level: 4, background:'background/underwater.png'},
    { name: 'Desert', code: '#34495e', level: 5, background:'background/desert.png'},
    { name: 'Halloween', code: '#16a085', level: 6, background:'background/halloween.png'},
    { name: 'Winterland', code: '#27ae60', level: 7, background:'background/winterland.png'},
    { name: '', code: '#2980b9', level: 8, background:'background/comingsoon.jpg'},
    { name: '', code: '#8e44ad', level: 9,       background:'background/comingsoon.jpg'},
    { name: '', code: '#2c3e50', level: 10,background:'background/comingsoon.jpg'},
    { name: '', code: '#f1c40f', level: 11,    background:'background/comingsoon.jpg'},
    { name: '', code: '#e67e22', level: 12,        background:'background/comingsoon.jpg'},
    
  ]);

  
 

  let doSomething = (props) => {
    // props.onPressLevelSelection('placeholder for x');

    console.log(props)
  }

  return (

    // this._retrieveData(),
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
            onPress={() => onPressLevelSelection(item.level )}>
          <ImageBackground imageStyle={{ borderRadius: 5 }} source={require('../../assets/' + item.background)}>

          <View style={[styles.itemContainer]}>
              <Text style={styles.itemName}>{item.name}</Text>

            <Text style={styles.itemName}>Level {item.level}</Text>
          
          </View>
          </ImageBackground>
          </TouchableOpacity>
        </View>
      )}
    />   
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