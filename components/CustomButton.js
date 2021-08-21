import React from 'react';
import {View,Pressable,StyleSheet} from 'react-native';
import TextFont from './TextFont';

const CustomButton = props => {
    return (
        <View style = {{...props.buttonHolder}}>
            <Pressable
            style = {{...styles.button,...props.style}}
            onPress = {props.onPress}
            >
                <TextFont>{props.title}</TextFont>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    button:{
        borderRadius: 20,
        padding:10,
        elevation:5,
        alignItems: 'center'
    },

})

export default CustomButton;