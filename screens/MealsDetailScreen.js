import React, {useEffect, useCallback} from "react";
import { View, Text, StyleSheet, Button, ScrollView, Image } from "react-native";
// thsi useSelector allows us to select a slice of our state(global state), this will help to retrive data out of store
// we are using state for MEALS so no need to use MEALS in this js file more
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from "../store/actions/meals";
import { MEALS } from "../data/dummy-data";
import CustomHeaderButton from "../components/HeaderButton";
// HeaderButtons and Item are both components
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import DefaultText from "../components/DefaultText";

const ListItem = props => {
  return (
    <View style={styles.ListItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  )
}

const MealsDetailScreen = (props) => {


  // this takes a function, it will be executed for us by react-redux, which will take state argument automatically, state is current redux state which is our store from the reducers/meals.js
  // state.meals is from app.js file form our store
  const availableMeals = useSelector(state => state.meals.meals);


  // even comp rerenders mealId wont change bcoz we are on this same page, so, this statement is related to useCallback
  const mealId = props.navigation.getParam("mealId");
  
  
  
  
  
  
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);
  
  const dispatch = useDispatch();
  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  },[dispatch, mealId]);
  
  useEffect(() => {
    props.navigation.setParams({toggleFav: toggleFavoriteHandler});
  }, [toggleFavoriteHandler])
  

  // though we are sending our meal is favourite from mealList.js but we need useEffect here because our while we still on this page if we toggle the favorite icon then we need to change the isFavorite or not so for that we need useEffect here
  const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));
  useEffect(() => {
    props.navigation.setParams({isFav: currentMealIsFavorite})
  },[currentMealIsFavorite])


  // useEffect will sent paramas late to my navigation so title rendering may be late so, another way is if we directly send the mealItem from the component where the data is getting from means favotiresscreen and categorymealscreen
  // useEffect(() =>{
  //   props.navigation.setParams({
  //     mealTitle:selectedMeal.title
  //   })
  // },[selectedMeal])
  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText >{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => <ListItem key={ingredient}>{ingredient}</ListItem>)}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => <ListItem key={step}>{step}</ListItem>)}
    </ScrollView>

    // <View style={styles.screen}>
    //   <Text>The MealsDetailScreen</Text>
    //   {/* {props.navigation.popToTop() this will helps to go back to root screen */}
    //   <Button
    //     title="Go back to root screen"
    //     onPress={() => {
    //       props.navigation.popToTop();
    //     }}
    //   />
    // </View>
  );
};

// MealsDetailScreen.navigationOptions = (navigationData) => {
//   const mealId = navigationData.navigation.getParam("mealId");
//   const selectedMeal = MEALS.find((meal) => meal.id === mealId);
//   return {
//     headerTitle: selectedMeal.title,
//     // and this HeaderButton compo expects a HeaderButtonComponent prop where we point at the componenet that should be used to render the Item component
//     headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
//       <Item title='Favorite' iconName='ios-star' onPress={() => { console.log('mark as favorite') }} />
//     </HeaderButtons>
//   };
// };


// here the main thing is that comunicating between redux data and navigation options

MealsDetailScreen.navigationOptions = (navigationData) => {
  // const mealId = navigationData.navigation.getParam("mealId");
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFavorite = navigationData.navigation.getParam('isFav');
  console.log(isFavorite);
  // const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  return {
    headerTitle: mealTitle,
    // and this HeaderButton compo expects a HeaderButtonComponent prop where we point at the componenet that should be used to render the Item component
    headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item title='Favorite' iconName={isFavorite ? 'ios-star':'ios-star-outline'} onPress={toggleFavorite } />
    </HeaderButtons>
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
  ListItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  }

});

export default MealsDetailScreen;
