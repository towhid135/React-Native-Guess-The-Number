import React from 'react';
import {View,StyleSheet} from 'react-native';

{/* props.children is the special props which represents the component we pass
	inside the wrapping of our custom component */}
const Card = props => {
	return(

	<View style={{...styles.card,...props.style}}>{props.children}</View>
	);
}

const styles = StyleSheet.create({
  card:{
	shadowColor: 'black',
	shadowOffset: {width:0, height:2},
	shadowRadius: 6,
	shadowOpacity: 0.26,
	backgroundColor: 'white',

	elevation: 15,
	padding: 10,
	borderRadius: 20,
}

});

export default Card;