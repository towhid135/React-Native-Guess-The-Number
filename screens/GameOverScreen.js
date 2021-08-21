import React from 'react';
import {View,Text,StyleSheet,Button,Image, Dimensions} from 'react-native';
import Card from '../components/Card';
import TextFont from '../components/TextFont';
import Color from '../constants/color';
import CustomButton from '../components/CustomButton';

//resizeMode keeps the original aspect ratio of the image
const GameOverScreen = props =>{
    return(
<View style={styles.screen}>
    <Card style={styles.cardStyle}>
        <TextFont  style={{...styles.textStyle,padding:10}} >Congratulations!</TextFont>
        <Image 
        source = {require('../assets/success.jpg')} 
        /* for loading network images. copy the 'copy image address' and paste it. */
        //source = {{uri: 'https://thumbs.dreamstime.com/z/male-business-man-showing-delight-top-hill-red-flag-waving-130828051.jpg'}}
        resizeMode='cover' 
        style={styles.image} 
        />

        <View style={styles.textContainer}>
            <TextFont >
                The computer tooks <TextFont style={styles.textStyle}>{props.round}</TextFont> rounds to Find the number 
                <TextFont style={styles.textStyle}>{props.number}</TextFont>
            </TextFont>
        </View>

        <CustomButton 
            title='NEW GAME' style={styles.button1} 
            buttonHolder ={styles.buttonSize} 
            onPress={props.reStartGame}
		/>
       
    </Card>
</View>
    );
};

const styles = StyleSheet.create({
    screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
        justifyContent:'center'
	},
    cardStyle:{
        width: '80%',
        alignItems: 'center'
    },
    textStyle: {
        color:'red',
        fontSize: 20,
    },
    image:{
        /*border radius should be half of the height & width. for that reason heigh and width
         should be equal. Here width,height and borderRadius are defined in pixel*/
        width: Dimensions.get("window").width * 0.5,
        height:  Dimensions.get("window").width * 0.5,
        borderRadius: Dimensions.get("window").width * 0.5/2,
        borderWidth: 3,
        borderColor: 'black',
    },
    button1: {
		backgroundColor: Color.pumpkin
	},
	buttonSize:{
		width: '50%',
        padding:10,

	},
    textContainer: {
        padding: 10,
        marginVertical: Dimensions.get("window").height * (0.02),
        textAlign:'center',
    }
})

export default GameOverScreen;