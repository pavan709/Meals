import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import CustomHeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals';
const FilterSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <Text>props.label</Text>
      {/* value is a property */}
      <Switch
        // trackcolor will apply when switch is on, and trackcolor will expect a object
        trackColor={{
          true: Colors.royalBlue,
          false: ''
        }}
        // thumbcolor expect a string
        thumbColor={Platform.OS === 'android' ? Colors.royalBlue : ''}
        value={props.state}
        onValueChange={props.onChange} />
    </View>
  );

}
const FilterScreen = props => {

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);



  const dispatch = useDispatch();


  // this saveFilters is just a way of comunicating between navigation and componenet, see in the headerRight below
  // useCallback works or return a stored version of arrow function it doesnot execute(useEffect exutes but useCallback not) the arrow function but it actually return the stored version of that arrow function and it does only if any of its dependencies changes not on rerenders, if i dont useCallback my saveFilters will run when ever rerenders happens that means in the useEffect will go under infinite rerenders as useEffect renders upon changes to the saveFilters and saveFilters will change on every render cycle

//   useCallback() often is used in conjunction with useEffect() because it allows you to prevent the re-creation of a function. For this, it's important to understand that functions are just objects in JavaScript.

// Therefore, if you have a function (A) inside of a function (B), the inner function (=A) will be recreated (i.e. a brand-new object is created) whenever the outer function (B) runs.

// That means that in a functional component, any function you define inside of it is re-created whenever the component rebuilds. so we can say that useCallback stops the recreation and return the arrow or callback funciton
    const saveFilters = useCallback(() => {
      const appliedFilters = {
        glutenFree: isGlutenFree,
        lactoseFree: isLactoseFree,
        vagan: isVegan,
        vegetarian: isVegetarian,
      }
      dispatch(setFilters(appliedFilters));
    },[isGlutenFree,isLactoseFree,isVegetarian,isVegan,dispatch]);
    // this is destructuring we are setting navigation with same const navigation
    
  const {navigation} = props;
  // reason for second parameter [] in useEffect is that, they are dependencies, generally useEffect runs every time rerenders or a stat update so now my useeffect only runs when saveFilters executed or navigation changes or updates,
  //  if i pass navigation as dependency in the useEffect it will cause infinite loop because when on inintal load my navigation runs and by using useEffect we are making changes to navigation and upon changes on navigation again useEffect will run so it will be on infinite loop
  useEffect(() => {
    navigation.setParams({save: saveFilters})
  },[saveFilters])

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch label='Gluten-free' state={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)} />
      <FilterSwitch label='Lactose-free' state={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)} />
      <FilterSwitch label='Vegan' state={isVegan} onChange={newValue => setIsVegan(newValue)} />
      <FilterSwitch label='Vegetarian' state={isVegetarian} onChange={newValue => setIsVegetarian(newValue)} />
    </View>
  )
};


FilterScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: 'Filter Meals',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item title="Menu" iconName='ios-menu' onPress={() => { navigationData.navigation.toggleDrawer() }} />
    </HeaderButtons>,
    headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item title="Save" iconName='ios-save' onPress={navigationData.navigation.getParam('save')} />
    </HeaderButtons>
  }
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15,

  },
  title: {
    fontFamily: 'open-sans-bold',
    textAlign: 'center',
    fontSize: 22,
    marginHorizontal: 20
  }
});

export default FilterScreen;