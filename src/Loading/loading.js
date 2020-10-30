import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import colors from "../../assets/constants/colors";
import Button from "../../assets/Button";

const Loading = ({ backToMainMenu, onMenuToggle }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0


    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 500,
            }
        ).start();
    }, [fadeAnim])


    return (
        <Animated.View style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'white',
            zIndex: 9999999999,
            opacity: fadeAnim }}>

            <Text style={styles.headline}>Loading...</Text>

        </Animated.View>

        

    );
};

const styles = StyleSheet.create({
    root: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'white', 
        zIndex: 9999999999, // active card will have a zIndex of `e.timeStamp`- so this needs to be larger
    },
    image:{
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },
    headline: {
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 200,
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

export default Loading;
