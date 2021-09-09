import React from 'react';
import {View,Text, StyleSheet } from 'react-native';
import MealList from '../components/MealList';

// thsi useSelector allows us to select a slice of our state(global state), this will help to retrive data out of store
// we are using state for MEALS so no need to use MEALS in this js file more
import { useSelector } from 'react-redux';
import { MEALS } from '../data/dummy-data';
import CustomHeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import DefaultText from '../components/DefaultText';
const FavoritesScreen = props => {

  
    // this takes a function, it will be executed for us by react-redux, which will take state argument automatically, state is current redux state which is our store from the reducers/meals.js
    // state.meals is from app.js file form our store
    const favMeals = useSelector( state => state.meals.favoriteMeals);
    // const favMeals = MEALS.filter((meal) => meal.id === 'm1' || meal.id === 'm2');


    if(favMeals.length === 0 || !favMeals)
    {
      return <View style={styles.content}>
        <DefaultText>No favorite meals found. Start adding some!</DefaultText>
      </View>
    }
    return (
        <MealList listData={favMeals} navigation={props.navigation}/>
    )
};


FavoritesScreen.navigationOptions = (navigationData) => {
    return {
      headerTitle: 'Your Favourites',
      headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Menu" iconName='ios-menu' onPress={() => { navigationData.navigation.toggleDrawer()}} />
      </HeaderButtons>
    }
  };
const styles = StyleSheet.create({
    content:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
});

export default FavoritesScreen;