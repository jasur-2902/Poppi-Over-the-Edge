import React, { useContext } from "react";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { FlatGrid } from 'react-native-super-grid';


import { Card, ListItem, Icon } from 'react-native-elements'

import colors from "../../assets/constants/colors";
import Button from "../../assets/Button";



const LevelSelection = ({ numPlayers, onNumPlayersChange, startGame }) => {
  
  const [items, setItems] = React.useState([
    { name: 'TURQUOISE', code: '#1abc9c', level:'Level 1'       , background:'trianglify.png'},
    { name: 'EMERALD', code: '#2ecc71', level:'Level 2'         , background:'trianglify.png'},
    { name: 'PETER RIVER', code: '#3498db', level:'Level 3'     , background:'trianglify.png'},
    { name: 'AMETHYST', code: '#9b59b6', level:'Level 4'        , background:'trianglify.png'},
    { name: 'WET ASPHALT', code: '#34495e', level:'Level 5'     , background:'trianglify.png'},
    { name: 'GREEN SEA', code: '#16a085', level:'Level 6'       , background:'trianglify.png'},
    { name: 'NEPHRITIS', code: '#27ae60', level:'Level 7'       , background:'trianglify.png'},
    { name: 'BELIZE HOLE', code: '#2980b9', level:'Level 8'     , background:'trianglify.png'},
    { name: 'WISTERIA', code: '#8e44ad', level:'Level 9'        , background:'trianglify.png'},
    { name: 'MIDNIGHT BLUE', code: '#2c3e50', level:'Level 10'  , background:'trianglify.png'},
    { name: 'SUN FLOWER', code: '#f1c40f', level:'Level 11'     , background:'trianglify.png'},
    { name: 'CARROT', code: '#e67e22', level:'Level 12'         , background:'trianglify.png'},
    
  ]);

  return (
    <View style={styles.root}>
      <ImageBackground source={require("../../assets/trianglify.png")} style={styles.root}>
      <Text style={styles.text}>Please select the level:</Text>

      <FlatGrid
      itemDimension={130}
      data={items}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <ImageBackground styles={styles.itemContainer} source={require('../../assets/' + item.background)}>

        <View style={[styles.itemContainer]}>
          <Text style={styles.itemName}>{item.level}</Text>
         
        </View>
        </ImageBackground>
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
