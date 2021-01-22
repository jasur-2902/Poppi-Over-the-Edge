import React from 'react';
import { Dimensions, StyleSheet, View, Animated, Easing } from 'react-native';

export default class Fireworks extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            x: [],
            y: [],
        };
        this.fadingOpacity = new Animated.Value(1);
        this.movingBall = new Animated.Value(0);
    }

    componentWillMount() {
        this.setExplosionSpots()
    }

    setExplosionSpots() {
        let density = 5,
            x = [],
            y = [];

        for (let i = 0; i < density; i++) {
            x[i] = this.getRandom(Dimensions.get('window').width);
            y[i] = this.getRandom(Dimensions.get('window').height);
        }
        this.setState({ x, y }, () => {
            this.animateOpacity();
            this.animateBall();
        });
    }

    getRandom = (n) => {
        return Math.round(Math.random() * n);
    };

    animateOpacity() {
        this.fadingOpacity.setValue(1);
        Animated.timing(this.fadingOpacity, {
            toValue: 0,
            duration: 700,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start(() => this.setExplosionSpots());
    }

    animateBall() {
        this.movingBall.setValue(0);
        Animated.timing(this.movingBall, {
            toValue: 1,
            duration: 700,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    }


    explosionBox() {
        let balls = [],
            randomTops = [],
            randomLefts = [],
            randomColors = [];
        for (let i = 0; i < 30; i++) {
            balls.push('');
            randomTops[i] = this.movingBall.interpolate({
                inputRange: [0, 1],
                outputRange: [100, this.getRandom(200)],
            });
            randomLefts[i] = this.movingBall.interpolate({
                inputRange: [0, 1],
                outputRange: [100, this.getRandom(200)],
            });
            randomColors[i] =
                'rgb(' +
                this.getRandom(255) +
                ',' +
                this.getRandom(255) +
                ',' +
                this.getRandom(255) +
                ')';
        }
        let ballOpacity = this.fadingOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });

        return (
            <View style={styles.explosionBoundary}>
                {balls.map((ball, index) => {
                    return (
                        <Animated.View
                            style={[
                                styles.ball,
                                {
                                    top: randomTops[index],
                                    left: randomLefts[index],
                                    opacity: ballOpacity,
                                    backgroundColor: randomColors[index],
                                },
                            ]}
                        />
                    );
                })}
            </View>);
    }

    render() {
        const { x, y } = this.state;
        return (
            <View>
                {x.map((item, index) => {
                    return (
                        <View
                            style={{
                                top: y[index],
                                left: x[index],
                            }}>
                            {this.explosionBox()}
                        </View>
                    )
                })}
            </View>)
    }
}

const styles = StyleSheet.create({
    explosionBoundary: {
        position: 'absolute',
        height: 200,
        width: 200,
    },
    ball: {
        position: 'absolute',
        height: 7,
        width: 7,
        borderRadius: 3,
    },
});