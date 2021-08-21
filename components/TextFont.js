import React from 'react';
import {Text,StyleSheet} from 'react-native';


const TextFont = props =>{
    return (
        <Text style={{...styles.font,...props.style}} >{props.children}</Text>
    );

};

const styles = StyleSheet.create({
    font: {
        fontFamily:'Miglia'
    }

});

export default TextFont;