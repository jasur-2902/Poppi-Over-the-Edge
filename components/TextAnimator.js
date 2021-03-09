import * as React from 'react';
import { Button, Text, View, StyleSheet, Animated } from 'react-native';
import Speech from 'speak-tts' // es6




export default class TextAnimator extends React.Component {
    animatedValues = [];

    

    constructor(props) {
        super(props);


        const speech = new Speech()
        speech.init().then((data) => {
            // The "data" object contains the list of available voices and the voice synthesis params
            console.log("Speech is ready, voices are available", data)
        }).catch(e => {
            console.error("An error occured while initializing : ", e)
        })



        speech.speak({
            text: 'Hello, how are you today ?',
        }).then(() => {
            console.log("Success !")
        }).catch(e => {
            console.error("An error occurred :", e)
        })

       //Textts.setDefaultLanguage('en-GB');
       // Textts.setDefaultVoice('com.apple.ttsbundle.Daniel-compact')
        
        const textArr = props.content.trim().split(' ');
        textArr.forEach((_, i) => {
            this.animatedValues[i] = new Animated.Value(0);
        });
        this.textArr = textArr;
    }

    componentDidMount() {
        this.animated();
    }

    animated = (toValue = 0) => {
        const animations = this.textArr.map((_, i) => {
            return Animated.timing(this.animatedValues[i], {
                toValue,
                duration: this.props.duration,
                useNativeDriver: true
            });
        });

        Animated.stagger(
            this.props.duration / 5,
            toValue === 1 ? animations : animations.reverse()
        ).start(() => {
           this.animated(toValue === 0)
           
        });
    };

    render() {
        return (
            <View style={[this.props.style, styles.textWrapper]}>
                {this.textArr.map((word, index) => {
                    return (
                        <Animated.Text
                            key={`${word}-${index}`}
                            style={[
                                this.props.textStyle,
                                {
                                    opacity: this.animatedValues[index],
                                    transform: [
                                        {
                                            translateY: Animated.multiply(
                                                this.animatedValues[index],
                                                new Animated.Value(5)
                                            )
                                        }
                                    ]
                                }
                            ]}
                        >
                            {word}
                            {`${index < this.textArr.length ? ' ' : ''}`}
                        </Animated.Text>
                    );
                })}
                {/* <Button
                title="Speak!"
                onPress={() => Tts.speak('Hello World!')}
                /> */}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    textWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
});