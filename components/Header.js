import React from 'react';
import {View,Text,StyleSheet,Platform} from 'react-native';
import Color from '../constants/color'
import TextFont from './TextFont';


const Header = props => {

	return(
	<View style = {{...styles.header,
	...Platform.select({ios: styles.headerIos,android: styles.headerAndroid}
	)}} 
	>

	 <TextFont style = {styles.headerTitle}>{props.title}</TextFont>

	</View>
	);
};


const styles = StyleSheet.create({
	header: {
		width: '100%',
		height: 90,
		paddingTop: 36,
		backgroundColor: Platform.OS === 'android' ? Color.pink : 'white',
		alignItems: 'center',
		justifyContent:'center',
		borderBottomColor: Platform.OS === 'ios' ? "#ccc" : "transparent",
		borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
	},
	headerAndroid: {
		backgroundColor:  Color.pink,
		borderBottomColor: "transparent",
		borderBottomWidth: 0,
	},
	headerIos:{
		backgroundColor: 'white',
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
	},

	headerTitle: {
		color: Platform.OS === 'android' ? 'white' : 'black',
		fontSize: 30,
	}
});

export default Header;
