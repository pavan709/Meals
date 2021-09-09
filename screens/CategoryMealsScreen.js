import React from 'react';
// thsi useSelector allows us to select a slice of our state(global state), this will help to retrive data out of store
// we are using state for MEALS so no need to use MEALS in this js file more
import { useSelector } from 'react-redux';
import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealList from '../components/MealList';
import {View, Text, StyleSheet} from 'react-native';
import DefaultText from '../components/DefaultText';
const CategoryMealsScreen = props => {

    
    // getParam will recieve params form categoriesScreen
    const catId = props.navigation.getParam('categoryId');

    // this takes a function, it will be executed for us by react-redux, which will take state argument automatically, state is current redux state which is our store from the reducers/meals.js
    // state.meals is from app.js file form our store
    const availableMeals = useSelector( state => state.meals.filteredMeals);

    const displayMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0)
    // const displayMeals = MEALS.filter(meal => meal.categoryIds.indexOf(catId) >= 0)

    if(displayMeals.length === 0 )
        return <View style={styles.content}>
            <DefaultText>No meals found, maybe check your filters?</DefaultText>
        </View>

    // const selectCategory = CATEGORIES.find(cat => cat.id === catId);
    return (
        <MealList listData={displayMeals} navigation={props.navigation}/>
















        // <View style={styles.screen}>
        //    <Text>The CategoryMealsScreen</Text> 
        //    <Text>{selectCategory.title}</Text>
        //    <Button title="Go to Details" onPress={() =>{
        //        props.navigation.navigate({routeName: 'MealDetail'})
        //    }} />
        //     {/* below button helps us to go back page, an alternative is that props.navigation.pop(); */}
        //    <Button title="Go Back" onPress={() => {props.navigation.goBack();}}/>
        // </View>
    )
};

// now here we dont have the data to display the header title bocz this is outside of the function, here navigationData is just a argument same as prop for categorymealsscreen comonent infact it is same as prop there not much diff we can extract the data here also
CategoryMealsScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectCategory = CATEGORIES.find(cat => cat.id === catId);

    // in categoriesscreen.js navigationoptions is oject but here it is function so it should return object we return dynamicly derived obejct
    return {
        headerTitle: selectCategory.title,

    };
}

const styles = StyleSheet.create({
    content:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})

export default CategoryMealsScreen;