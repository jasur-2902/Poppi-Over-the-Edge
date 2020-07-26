import React, { useRef, useEffect  } from "react";
import { Animated, StyleSheet, TouchableOpacity, View, Image} from "react-native";

import FadeInView from "./animation"
import colors from "../../assets/constants/colors";
import Button from "../../assets/Button";

const Binocular = ({ backToMainMenu, onMenuToggle }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0


    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 300,
            }
        ).start();
    }, [fadeAnim])

    
    return (

        
        <TouchableOpacity
            activeOpacity={1}
            onPress={onMenuToggle}
                style={styles.root}
        >
            {/* <FadeInView style={styles.root}> */}
            {/* <View style={styles.underlay} /> */}
            <Animated.Image style={{
                ...StyleSheet.absoluteFillObject,
                justifyContent: "center",
                alignItems: "center",
                opacity: fadeAnim,
            }} source={require('../../assets/binoculus2.png')} ></Animated.Image>
            {/* <View style={styles.root}>
                <Button
                    color={colors.redLight}
                    onPress={backToMainMenu}
                    style={{ marginBottom: 32 }}
                >
                    EXIT TO MAIN MENU
        </Button>
                <Button color="#fff" onPress={onMenuToggle}>
                    BACK TO GAME
        </Button>
            </View> */}
            
              {/* </FadeInView> */}
        </TouchableOpacity>
      
    );
};

const styles = StyleSheet.create({
    root: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999999999, // active card will have a zIndex of `e.timeStamp`- so this needs to be larger
    },
    image:{
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        
         // active card will have a zIndex of `e.timeStamp`- so this needs to be larger
    },
    // Hacky way to have an opaque background without using rgba
    underlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: colors.grayDark,
        opacity: 0.9,
    },
    menu: {
        margin: 8,
    },
});

export default Binocular;
