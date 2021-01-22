import React, { useContext } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Fireworks from './Fireworks';

import colors from "../../assets/constants/colors";
import Button from "../../assets/Button";

const Victory = ({ backToMainMenu, onMenuToggle }) => {
    return (
        <View style={styles.root}>
            <View style={styles.explosionBoundary}> 
                <Fireworks
                    speed={5}
                    density={100}
                    colors={['#ff0', '#ff3', '#cc0', '#ff4500', '#ff6347']}
                    iterations={15}
                    height={200}
                    width={200}
                    zIndex={2}
                    circular={true}
                />
                
            </View>

            <Text style={styles.text}>VICTORY!!! New Levels are Coming Soon! </Text>
            <Image source={require('../../assets/penguin/poppi_front_s.png')} style={{ width: 380, height: 450 }} />

        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },
    explosionBoundary: {
        position: 'absolute',
        height: 200,
        width: 200,
    },
    text: {
        color: colors.grayDark,
        fontFamily: "Dimbo",
        fontSize: '3vw',
        lineHeight: 60,
        marginBottom: 32,
    },
});

export default Victory;
