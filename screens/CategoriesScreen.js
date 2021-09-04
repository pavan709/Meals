import React from 'react';
import {View,Text, StyleSheet,Button, FlatList } from 'react-native';

const CategoriesScreen = props => {

    // any component that we load with react navigation gets a spceial prop passed on automatically in MealsNavigator.js, bcoz we loaded this js file in mealsnavigator.js file
    return (
        // numcolums give grid effect
        <FlatList numColumns={2}/>

















        // <View style={styles.screen}>
        //    <Text>The CategoriesScreen</Text> 
        //    {/* now the navigate() is method which takes in a object, routeName is identifier which we set up in MealsNavigator.js */}
        //    {/* we can also do this props.navigation.navigate('SomeIdentifier'); */}
        //    {/* we can also do this props.navigation.push('soemidentifier') and push takes only one string, and this push works same as navigate but is some page is already in stack then we can again push that page into stack, but with navigate we canot */}
        //    <Button title="Go to Meals!" onPress={() => {props.navigation.navigate('CategoryMeals')}} />


        //    {/* below line replace current screen with next screen, for example after login page we do not want to again go back to login page so in that cases this will help  */}
        //    {/* <Button title="Go to Meals!" onPress={() => {props.navigation.replace('CategoryMeals')}} /> */}
        // </View>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
});

export default CategoriesScreen;