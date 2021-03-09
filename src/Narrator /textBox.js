import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import colors from "../../assets/constants/colors";
import Button from "../../assets/Button";

const TextBox = ({ backToMainMenu, onMenuToggle }) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onMenuToggle}
            style={styles.root}
        >
            <View style={styles.underlay} />
            <View style={styles.root}>

                <Button color="#fff" onPress={onMenuToggle}>
                    BACK TO GAME
        </Button>

                <Button
                    color={colors.redLight}
                    onPress={backToMainMenu}
                    style={{ marginTop: 32 }}
                >
                    EXIT TO MAIN MENU
        </Button>

            </View>
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
    // Hacky way to have an opaque background without using rgba
    underlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.grayDark,
        opacity: 0.9,
    },
});

export default Menu;
