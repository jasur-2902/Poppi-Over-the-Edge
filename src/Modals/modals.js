import Modal from 'modal-enhanced-react-native-web';
import styles from "../styles";
import * as React from 'react';

import { View, Text, TouchableOpacity} from 'react-native';
 


class ModalComponent extends React.Component {

    state = {
        level_state: 'menu',
        sleepingPills: 0,
        modalVisible: false,
        visibleLost: false,
        visibleCaught: false,
        result: false,
        level_1: true,
        walking: true,
        win: false,
        lastRefresh: Date(Date.now()).toString(),
        isListEmpty: false,
        currentLevel: this.level1_Settings,
        highestLevel: 1,
        isMainMenuVisible: true,
        isLevelsMenuVisible: false,
        isInGameMenuVisible: false,
        isBinocularVisible: false,
    };

    _renderModalLost = () => (
        <View style={styles.modalContent}>
            <Text>That’s not right! Please Try Again! </Text>
            {this._renderButton("Try Again!", () => {
                this.
                this.props.setState({ level_state: 'create_list' }); 
                this.setState({ visibleLost: false });
            })}
        </View>
    ); 
    
    _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );



    render() {
        <View>
            {this._renderModalLost}
        </View>
    };


}




export default ModalComponent; 
