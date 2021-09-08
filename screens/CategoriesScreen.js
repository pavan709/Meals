import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Platform,
  StatusBar
} from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import Colors from "../constants/Colors";
import CategoryGridTitle from "../components/CategoryGridTitle";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions } from "react-navigation-drawer";
import CustomHeaderButton from "../components/HeaderButton";
const CategoriesScreen = (props) => {
  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTitle
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "CategoryMeals",
            params: {
              categoryId: itemData.item.id,
            },
          });
        }}
      />
    );
  };

  // any component that we load with react navigation gets a spceial prop passed on automatically in MealsNavigator.js, bcoz we loaded this js file in mealsnavigator.js file
  return (

    // numcolums give grid effect
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={CATEGORIES}
        renderItem={renderGridItem}
        numColumns={2}
      />

    // <View style={styles.screen}>
    //    <Text>The CategoriesScreen</Text>
    //    {/* now the navigate() is method which takes in a object, routeName is identifier which we set up in MealsNavigator.js */}
    //    {/* we can also do this props.navigation.navigate('SomeIdentifier'); */}
    //    {/* we can also do this props.navigation.push('soemidentifier') and push takes only one string, and this push works same as navigate but is some page is already in stack then we can again push that page into stack, but with navigate we canot */}
    //    <Button title="Go to Meals!" onPress={() => {props.navigation.navigate('CategoryMeals')}} />

    //    {/* below line replace current screen with next screen, for example after login page we do not want to again go back to login page so in that cases this will help  */}
    //    {/* <Button title="Go to Meals!" onPress={() => {props.navigation.replace('CategoryMeals')}} /> */}
    // </View>
  );
};

// in javascript our CategoriesScreen is nothing but a function so in js function is just a object and we can add data attributes to this function belwo navigationOptions is just what we added and it is respected by react native, but by default in navigation4 header title is added automatically which is navigation identifier from meals navigator
// CategoriesScreen.navigationOptions = {
//     headerTitle: 'Meal Categories',
//     headerStyle:{
//         backgroundColor: Platform.OS === 'android'? Colors.royalBlue: '',
//     },
//     headerTintColor: Platform.OS === 'android' ? 'white':Colors.royalBlue,
// }

// the above setting background and tintcolor is cumbersum for all pages
CategoriesScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Meal Categories",
    headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item title="Menu" iconName='ios-menu' onPress={() => { navigationData.navigation.toggleDrawer() }} />
    </HeaderButtons>,
    
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop:30,
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },
});

export default CategoriesScreen;
