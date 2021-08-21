import React,{useState,useRef,useEffect} from 'react';
import { View,StyleSheet,Alert,ScrollView, Dimensions } from 'react-native';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import Color from '../constants/color';
import CustomButton from '../components/CustomButton';
import {Ionicons} from '@expo/vector-icons'
import TextFont from '../components/TextFont';

const renderList= (val,round) => (
    <View style={styles.textContainer}  key={val}>
    <TextFont >Round:{round+1}</TextFont>
    <TextFont>Guess:{val}</TextFont>
   </View>
)

//var left=1,right=99,midPoint;
const OutputScreen = props =>{
    
    left = useRef(1);
    right = useRef(99);
    midPoint = useRef(parseInt((left.current+right.current)/2) );
    const [width,setWidth] = useState(Dimensions.get("window").width);
    const [height, setHeight] = useState(Dimensions.get("window").height);
    const [showedNum,setShowedNum] = useState(parseInt((left.current+right.current)/2));
    var pastGuesses = useRef([showedNum]);

    useEffect(
        () => {
            const changeLayout = () =>{
                setWidth(Dimensions.get("window").width);
                setHeight(Dimensions.get("window").height);
            }
            Dimensions.addEventListener("change",changeLayout);

            return () => Dimensions.removeEventListener("change",changeLayout);
        }
    );
   //console.log('showedNum',showedNum);
   useEffect( () => {
   if(midPoint.current === props.number){
      props.gameOverState(1,pastGuesses.current.length);
     
       }
   },[midPoint.current]);

   const binarySearch = buttonValue => {
    if( (buttonValue==='lower' && midPoint.current<props.number) || (buttonValue==='higher' && midPoint.current>props.number) ){
        Alert.alert("Don't lie!",'Please provide the valid information.');
        return;
    }
    else if (buttonValue === 'lower'){
        right.current = midPoint.current-1;
        midPoint.current = parseInt( (left.current+right.current)/2 );
    } 
    else if (buttonValue ==='higher'){
        left.current = midPoint.current+1;
        midPoint.current = parseInt( (left.current+right.current)/2 );
    }
    pastGuesses.current.push(midPoint.current);
    setShowedNum(midPoint.current);
    console.log(pastGuesses.current);
    //console.log('midpoint=',midPoint.current,'left=',left.current,'right=',right.current,'buttonValue',buttonValue);

   }

   if(height < 600){
       return (
        <View style={styles.screen}>
       
        <NumberContainer style={{width:width*0.3}}>{showedNum}</NumberContainer>
       <View style = {styles.buttonContainer}>
            <CustomButton title= {<Ionicons name='md-remove' size={30} color='white' />} style={styles.button1} 
                buttonHolder ={styles.buttonSize} 
                onPress={binarySearch.bind(this,'lower')}
                />
                
                <CustomButton title={<Ionicons name='md-add' size={30} color='white' />} style={styles.button2} 
                buttonHolder ={styles.buttonSize} 
                onPress={binarySearch.bind(this,'higher')}
                />
        </View>

    <View style={{...styles.listContainer,width:width*0.8}}>

      <ScrollView>
         {pastGuesses.current.map( (guess) => renderList(guess,pastGuesses.current.indexOf(guess)) )}
      </ScrollView>

    </View>
    
    </View>
       );
   }

    return(
        <View style={styles.screen}>
            <Card style={styles.confirmCardContainer}>
            <NumberContainer style={{width:"30%"}}>{showedNum}</NumberContainer>
           <View style = {styles.buttonContainer}>

                <CustomButton title= {<Ionicons name='md-remove' size={30} color='white' />} style={styles.button1} 
                    buttonHolder ={styles.buttonSize} 
                    onPress={binarySearch.bind(this,'lower')}
                    />
					
					<CustomButton title={<Ionicons name='md-add' size={30} color='white' />} style={styles.button2} 
                    buttonHolder ={styles.buttonSize} 
                    onPress={binarySearch.bind(this,'higher')}
                    />
			</View>

          </Card>
        <View style={styles.listContainer}>

          <ScrollView>
             {pastGuesses.current.map( (guess) => renderList(guess,pastGuesses.current.indexOf(guess)) )}
          </ScrollView>

        </View>
        
        </View>
    
       
    );
}

const styles = StyleSheet.create({
    screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
        justifyContent:'center'
	},
    buttonContainer: {
		flexDirection: 'row',
		width: "100%",
		justifyContent: 'space-between',
		paddingHorizontal: 15,
		marginVertical: Dimensions.get("window").height/200,

	},
    button1: {
		backgroundColor: Color.pink,
	},
	button2: {
		backgroundColor: Color.pumpkin
	},
	buttonSize:{
		width: '30%',

	},
    confirmCardContainer:{
		width: '80%',
		alignItems: 'center',
        justifyContent: 'center',
		marginVertical: 10,

	},
    listContainer:{
        width: "80%",
        flex:1,
        
    },
    textContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderWidth:1,
        padding:10,
        marginVertical:10,
        borderColor:Color.pink,
        borderRadius:5,
    }
})

export default OutputScreen;