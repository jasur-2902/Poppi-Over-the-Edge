import { Text, View, Button, StyleSheet, Animated } from 'react-native';

import Speech from "speak-tts";

class TSS{

    script;
    speech ;
    constructor(props){

        console.log(props); 
        this.speech = new Speech()
        this.speech
            .init({
                volume: 0.3,
                lang: "en-US",
                rate: 1,
                pitch: 1,
                voice: "Google US English",
                //'splitSentences': false,
            })
            .then(data => {
                // console.log("Speech is ready");
                // this.speaking(speech, props);
            })
            .catch(e => {
                // console.error("An error occured while initializing : ", e);
            });

        //this.script = script; 
    }

    speaking(text) {
        this.speech.speak({
            text: text,
            queue: false,
        }).then(() => {
            console.log("Success !")
        }).catch(e => {
            console.error("An error occurred :", e)
        })

    }

    stop() {
        this.speech.cancel();
    }


}

export default TSS;
