import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import Color from '../constants/color';
import TextFont from './TextFont';
const NumberContainer = props =>{
    return(
<View style = {{...styles.container,...props.style}} >
    <TextFont style = {styles.number}>{props.children}</TextFont>
</View>
    );
}

const styles = StyleSheet.create({
    container: {
    width: '20%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Color.pink,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    },
    number: {
        color: Color.pink,
        fontSize: 22,
    }
    
})

export default NumberContainer;