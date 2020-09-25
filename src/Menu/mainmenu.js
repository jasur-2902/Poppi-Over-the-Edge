import React, { useContext } from "react";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

import colors from "../../assets/constants/colors";
import Button from "../../assets/Button";

const Menu = ({ startGame, levelSelectionMenu, customLevel }) => {
  return (
    <View style={styles.root}>
      <ImageBackground source={require("../../assets/trianglify.png")} style={styles.root}>
     
          <Text style={styles.text}>POPPI OVER THE EDGE</Text>
         

          <Button
            color={colors.yellowLight}
            onPress={startGame}
            style={[{ marginTop: 24 },styles.button]}
          >
            <Text style={styles.button_text}>START GAME</Text>
          </Button>

          <Button
          onPress={levelSelectionMenu}
        
            style={styles.button}
          >
             <Text style={styles.button_text}>SELECT LEVEL</Text>
          </Button>
          
          <Button
          onPress={customLevel}
          style={styles.button}
          >
            <Text style={styles.button_text}>CUSTOM LEVEL</Text>
          </Button>
          
          <Button
            style={styles.button}
          >
           <Text style={styles.button_text}>LEARN</Text>
          </Button>
          
          {/* {Platform.OS !== "web" && music && (
            <Button
              onPress={() => music.setPaused(!music.paused)}
              style={{ position: "absolute", bottom: 8, right: 8 }}
            >
              {music.paused ? "🔇 " : "🔈 "} MUSIC
            </Button>
          )} */}

        {/* {state.isLevelsMenuVisible && <View> 
        <Button
            onPress={() => onNumPlayersChange(2)}
            selected={numPlayers === 2}
            style={styles.button}
          >
           <Text style={styles.button_text}>LEVLES</Text>
          </Button></View>}  */}
          {/* {console.log(this.props.passedVal)} */}
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
    marginBottom: 32,
  },
});

export default Menu;
