import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styles from "../../src/styles"; //importing styles
import TypingText from '../TypingText';

import colors from "../constants/colors";

class TextBox extends Component {
    render() {
        const {script, size, ...rest } = this.props;

        return (
            <View style={{
                
                justifyContent: "center",
                width: 500, 
                backgroundColor: "#C5E5F0",
                borderRadius: 16,
                borderWidth: 4,
                borderColor: "#fff",
            }}>
                <View style={{
                    flex: 1,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 4,
                    borderColor: colors.grayDark,
                    borderRadius: 12,
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                }}>

                    {/* <Text style={{
                        fontFamily: "Dimbo",
                        fontSize: 16,
                        fontWeight: "bold",
                        color: colors.grayDark,
                    }}> */}
                        <TypingText
                            text= {this.props.script} 
                            />
                    {/* </Text> */}

                </View>
            </View>
        );
    }
}

export default TextBox;