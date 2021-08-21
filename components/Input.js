import React from 'react';
import {TextInput,StyleSheet} from 'react-native';

/* {...props} allows us to spred all the props we write inside of the custom apps. we don't need to
write props.props_name for each props  */

const Input = props => {
	return (
		<TextInput {...props} style = {{...styles.input,...props.style}} />
		);
}

const styles = StyleSheet.create({
	input: {
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		padding: 10,
		marginBottom: 10,
	}
})

export default Input;