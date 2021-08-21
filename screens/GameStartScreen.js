import React, {useState,useEffect} from 'react';
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,Alert,Dimensions, 
	ScrollView,
	KeyboardAvoidingView,
	TouchableNativeFeedback,
	Touchable,
    } 
from 'react-native';
import Card from '../components/Card';
import Color from '../constants/color';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import TextFont from '../components/TextFont';
import CustomButton from '../components/CustomButton';
import * as ScreenOrientation from 'expo-screen-orientation';

/*By using the dimension api we take the available space of the view where the 
style prop was assigned */

const GameStartScreen = props => {
	// It will lock the screen in portrait mode
	//ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
		  

	const [enteredValue,setEnteredValue] = useState(''); 
	const [confirmState,setConfirmState] = useState(false);
	const [selectedNumber,setSelectedNumber] = useState();
	const [updateWidth,setUpdateWidth] = useState( Dimensions.get("window").width * (0.8))

	//in use effect hook, return is being called at first.
	useEffect(() => {
		() => {
			const updateWidthWithOrientation = () =>{
				setUpdateWidth(Dimensions.get("window").width * (0.8));
			}
			//it will be called with the change of dimensions or orientation
			Dimensions.addEventListener("change",updateWidthWithOrientation);
			/*In useEffet return is called first. for that reason we are remmoving the
			previous event first then the update will be done using updateWidth... function. */
			return () => {
				Dimensions.removeEventListener("change",updateWidthWithOrientation);
			}
		}	
	});

	const inputHandler = enteredText => {
		setEnteredValue(enteredText.replace(/[^0-9]/g,''));
	};

	const resetButtonHandler = () => {
		setEnteredValue('');
		setConfirmState(false);
	};

	const confirmButtonHandler = () => {
		const choosenNumber = parseInt(enteredValue);
		if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99){
			Alert.alert('Invalid Number!',
				'Number should be between 1 to 99',
				[{text:'Okay',style: 'destructive',onPress: resetButtonHandler}]
				);
			return;
		}

		setConfirmState(true);
		setSelectedNumber(choosenNumber);
		setEnteredValue('');
		Keyboard.dismiss();

	};

	var confirmView;

	const setTheNumber = () =>{
		props.setNumber(selectedNumber);
		setConfirmState(false);
	}

	if(confirmState){
		confirmView = (
			<Card style={{...styles.confirmCardContainer,width:updateWidth}}>
				<TextFont style={styles.textStyle}>Selected Number</TextFont>
				<NumberContainer style={{width:'30%'}}>{selectedNumber}</NumberContainer>

				<View style = {styles.buttonContainer}>

					<CustomButton title='START' style={styles.button1} 
					buttonHolder ={styles.buttonSize} 
					onPress={setTheNumber}
					/>

					<CustomButton title='CANCEL' style={styles.button2} 
					buttonHolder ={styles.buttonSize} 
					onPress={() => setConfirmState(false)}
					/>
			
				</View>
				

			</Card>
		);

	}


	return (
		<ScrollView>
			{/*behvior and keyboardVerticalOffset reposition entire screen by 30 pixels */}
			<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30} >
 <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
		<View style = {styles.screen}>

		 <TextFont style={styles.title}>Start A New Game!</TextFont>
		   <Card style = {{...styles.inputContainer,width: updateWidth }}>

		     <TextFont >Select a Number</TextFont>
		     <Input 
		     style = {styles.numberInput}
		      blurOnSubmit
		      keyboardType = 'number-pad'
		      maxLength = {2} 
		      onChangeText = {inputHandler}
		      value = {enteredValue}
		      />
		     <View style = {styles.buttonContainer} >

              <CustomButton title='RESET' style={styles.button1} 
			  buttonHolder ={styles.buttonSize} 
			  onPress={resetButtonHandler}
			   />

             <CustomButton title='CONFIRM' style={styles.button2} 
			  buttonHolder ={styles.buttonSize} 
			  onPress={confirmButtonHandler}
			   />

		     </View>

		   </Card>

		   {confirmView}

		</View>
</TouchableWithoutFeedback>
</KeyboardAvoidingView>
</ScrollView>


		);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
		marginVertical: 10,

	},
	inputContainer: {
		maxWidth: '95%',
		minWidth:300,
		alignItems: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		/*It will take the available space of the view where the style prop is assigned.
		by multiplying with (8/10) we taking 80% of the available width */
		width: Dimensions.get('window').width * (8/10),
		justifyContent: 'space-between',
		paddingHorizontal: 15,
		marginVertical: 10,

	},
	numberInput: {
		width: '20%',
		textAlign: 'center',
	},
	button1: {
		backgroundColor: Color.pink,
	},
	button2: {
		backgroundColor: Color.pumpkin
	},
	buttonSize:{
		width: "45%",

	},
	confirmCardContainer:{
		
		alignItems: 'center',
		marginVertical: 10,

	},
	textStyle: {
		color: Color.pink,
		fontSize: 15,
		padding: 10,
		
	}
})

export default GameStartScreen;