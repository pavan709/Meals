import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import MealsNavigator from './navigation/MealsNavigator';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux';
// this increases some performence or bit efficient
import { enableScreens } from 'react-native-screens'
enableScreens();

import mealsReducer from './store/reducers/meals';

// combineReducers helps to combine all reducers into root reducers if we have large number of reducedrs
const rootReducer = combineReducers({
  meals: mealsReducer,
})
// createStore takes the reducer, this rootreducer is used to create store
const store = createStore(rootReducer);
// now this store needed to provide to our application for that we need react-redux package, then wrap provider around our root component



const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}



export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} onError={(err) => console.log(err)} />
  }

  return (
    <Provider store={store}><MealsNavigator /></Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
