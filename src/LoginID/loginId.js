import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from "react-native";
import { firebase } from '../firebase/config';

const DOMParser = require('xmldom').DOMParser;
const XMLSerializer = require('xmldom').XMLSerializer;
const LoginId = ({ receiveUserId }) => {

    let userId; 
    let sendData = () => {
       
        
        receiveUserId(userId);
    }

    // Append a child element
    function appendChild(xmlDoc, parentElement, name, text) {
        let childElement = xmlDoc.createElement(name);
        if (typeof text !== 'undefined') {
            let textNode = xmlDoc.createTextNode(text);
            childElement.appendChild(textNode);
        }
        parentElement.appendChild(childElement);
        return childElement;
        
    }

    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

   


    let getData = () => {
       


       // var userId = firebase.auth().currentUser.uid;
        

        // console.log(firebase.database().ref('').once('/users/'));
        // documentElement always represents the root node
        var childData ;



        return firebase.database().ref('/passwords/getData/').once('value').then(function (snapshot) {
            var password = prompt("Please enter password", "");
            if (password == snapshot.val() ){
                        firebase.database().ref('users').once('value', function (snapshot) {
                    const xmlDoc = new DOMParser().parseFromString("<doc></doc>");
                    const rootElement = xmlDoc.documentElement;
                    const folderElement = appendChild(xmlDoc, rootElement, 'users');

                    snapshot.forEach(function (childSnapshot) {
                        var childKey = childSnapshot.key;
                        childData = childSnapshot.val();


                        const userElement = appendChild(xmlDoc, folderElement, childKey);

                        childSnapshot.forEach(function(grandChild){

                            var timestamp = grandChild.key;
                            var value = grandChild.val();  
                             // console.log(aaasd.givenTime);

                            const timeStamp_cat  = appendChild(xmlDoc, userElement,'timeStamp');
                            const timeStamp = appendChild(xmlDoc, timeStamp_cat, timestamp);
                                appendChild(xmlDoc, timeStamp, 'givenTime', value.givenTime);
                                appendChild(xmlDoc, timeStamp, 'id', value.id);
                                appendChild(xmlDoc, timeStamp, 'level', value.level);
                                appendChild(xmlDoc, timeStamp, 'numOfguards', value.numOfguards);
                                appendChild(xmlDoc, timeStamp, 'result', value.result);
                                appendChild(xmlDoc, timeStamp, 'timeSpent', value.timeSpent + 0.2);
                                appendChild(xmlDoc, timeStamp, 'givenTime', value.timeStamp);

                                // const planElement = appendChild(xmlDoc, folderElement, 'plan');
                                // appendChild(xmlDoc, planElement, 'name', 'Eddie');







                        });
                        // firebase.database().ref('users/' + childKey).once('value', function (snapshot) {
                        //     snapshot.forEach(function (childSnapshot) {
                        //         var childKey = childSnapshot.;


                        //         console.log("Child Key:", childKey);


                        //     });
                        // });





                    });


                    const xmlSerializer = new XMLSerializer();

                    const xmlOutput = xmlSerializer.serializeToString(xmlDoc);
                    const output = "<?xml version='1.0'?> " + xmlOutput; 
                    //console.log(output);

                    // Start file download.
                    download("data.xml", output);
                    console.log(childData);
                    download("data.json", JSON.stringify(childData)); 

                });



                // firebase.database().ref('users').on('value', (snap) => {
                //     // console.log(snap.val());
                //     let data = snap.val();
                //     console.log(data.get(0));


                // });
            } 
            else{
                alert("Incorrect Password!");
            }
            // ...
        });

        


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
            <Text style={styles.loremIpsum}>Please enter your ID number:</Text>
            <TextInput 
                placeholder="ID Number" 
                style={styles.TextInputStyle}
                keyboardType={'numeric'}
                onChangeText={text => {userId = text}}
                >
            </TextInput>
            <View style={styles.rect}></View>
            <Button
                containerStyle={{
                    margin: 20, height: 45, overflow: 'hidden',
                    borderRadius: 4, backgroundColor: 'white', 
                }}
                style={{ fontSize: 20, color: 'green', width: 150, }}
                onPress={() => { sendData() }} 
                title={"Enter"}
            >
            </Button>
        </View>

            <Button
                containerStyle={{
                    margin: 20, height: 45, overflow: 'hidden',
                    borderRadius: 4, backgroundColor: 'white',
                }}
                style={{ fontSize: 20, color: 'Red', width: 150, }}
                onPress={() => { getData() }}
                title={"Get Data "}
            >

            </Button>
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
       marginBottom: 20, 
       marginTop: 20, 
       height: 45,
       borderBottomWidth: 1.0,
   }
});

export default LoginId;
