import { StatusBar } from 'expo-status-bar';
import React,{useState,useRef,useEffect} from 'react';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

//Importing components
import Header from './components/Header';
import GameStartScreen from './screens/GameStartScreen';
import OutputScreen from './screens/OutputScreen';
import GameOverScreen from './screens/GameOverScreen';

/* loadAsync takes an object. The property of the object is the font name (I can  give any name) 
and the value of the property takes a location of the font by using require function. Now we can use
that font by using its name in any file and we don't need to load it in every file */
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'Lobster-Regular': require('./assets/fonts/Lobster-Regular.ttf'),
    'PaletteMosaic-Regular': require('./assets/fonts/PaletteMosaic-Regular.ttf'),
    'Miglia': require('./assets/fonts/Miglia.ttf')
  });
};

export default function App() {
  const [checkNumber,setCheckNumber] = useState(0);
  const [gameOver,setGameOver] = useState(0);
  const [dataLoaded,setDataLoaded] = useState(false);
  let count = useRef(0);
  
  //it will load the font first before it loads everything
  if(!dataLoaded){
    return <AppLoading 
    startAsync = {fetchFonts} 
    onFinish = {() => setDataLoaded(true)}
    onError = {(err) =>  console.log(err)}
     />; 
  }

  const reStart = () =>{
    setCheckNumber(0);
    setGameOver(0);
  };
  const resetGameOver = (arg,round) => 
  {
    count.current = round;
    setGameOver(arg);
    
  }
  
  let gameView = <GameStartScreen setNumber = {setCheckNumber} />

  if(checkNumber>0 && gameOver===0){
    console.log('yes');
    gameView = <OutputScreen gameOverState = {resetGameOver} number = {checkNumber} />
  }
  else if(gameOver===1){
    gameView = <GameOverScreen number={checkNumber} round={count.current} reStartGame = {reStart}></GameOverScreen>
  }
 
  
  return (
    <SafeAreaView style={styles.screen}>

     <Header title = 'Guess a Number' />
     {gameView}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
 
});
