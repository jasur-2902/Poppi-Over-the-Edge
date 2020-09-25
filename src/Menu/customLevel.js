import React, { useRef, useEffect } from "react";
import { ImageBackground,Animated, StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';


const customLevel = ({ startCustomLevel, back }) => {

    let levels = [{
        value: 'Banana',
    }, {
        value: 'Mango',
    }, {
        value: 'Pear',
    }];
    let time;
    let level; 
    
    let start = () => {
    
        startCustomLevel(time, level);
    }
    
    return (
        <View style={{
            alignItems: 'center',
        }}> 

        <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                height: 600,
    
        }}>
                
            <Text style={styles.loremIpsum}>Please enter time in seconds (e.g 2.5, 1.0, 3.2 ... ):</Text>
            <TextInput 
                placeholder="Time" 
                style={styles.TextInputStyle}
                keyboardType={'numeric'}
                onChangeText={text => {time = text}}
                >
            </TextInput>
            {/* <TextInput
                placeholder="Select Level"
                style={styles.TextInputStyle}
                keyboardType={'numeric'}
                onChangeText={text => { level = text }}
                >
                </TextInput> */}

                <DropDownPicker
                    items={[
                        { label: 'Level 1', value: 1 },
                        { label: 'Level 2', value: 2 },
                        { label: 'Level 3', value: 3 },
                    ]}
                    defaultIndex={0}
                    containerStyle={{ height: 40, marginBottom: 20 }}
                    onChangeItem={item => level = item.value}
                />

            <View style={styles.rect}></View>
            <Button
                containerStyle={{
                    margin: 20, height: 45, overflow: 'hidden',
                    borderRadius: 4, backgroundColor: 'white', 
                }}
                style={{ fontSize: 20, color: 'green', width: 150 }}
                onPress={() => { start() }} 
                title={"Enter"}
            >
            </Button>

          
        </View>
            <Button
                onPress={back}
                style={{
                    position: "absolute",
                    bottom: 25,
                    right: 25,
                }}
                title={"Back"}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        height: 600
    },
   TextInputStyle: {
       borderBottomWidth : 1.0,
       marginBottom: 20, 
       marginTop: 20, 
       height: 45,
   }
});

export default customLevel;
