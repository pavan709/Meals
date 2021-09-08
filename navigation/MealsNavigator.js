//  createAppcontainer is always imported from react-navigation no matter which react-navigation version your using
// in this appcontainer we need to wrap our root navigator
import { createAppContainer,SafeAreaView } from "react-navigation";
import React from 'react';
// npm install --save --legacy-peer-deps react-navigation-tabs
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealsDetailScreen from '../screens/MealsDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen'
import FilterScreen from '../screens/FilterScreen';
import Colors from "../constants/Colors";
import { Platform, StatusBar,Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
// import { Platform, StatusBar } from 'react-native';
// import { SafeAreaView } from 'react-navigation';



const defaultStackNavOptions =
{
    // this defaultnavigationoptions allow us to set default option to all screens and we can override this options in the perticular js files
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.royalBlue : '',
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.royalBlue,
    },
    headerTitleStyle:{
        fontFamily:'open-sans-bold'
    },
    headerBackTitleStyle:{
        // in android this dont have any effect bcoz we dont have any headerbacktext
        fontFamily:'open-sans',
    }
    // this is for our inital screen override
    // initialRouteName:'MealDetail',
    // mode:'modal',
}

// now we can take advantage the  second args that passes to createStackNavigator
// 1st argument is object with screens
// 2nd argument allows us to cofigure that navigator and defaultnavigationoptions get merged with specific options here or in files
// now the specific option win over both default options and the specifics in .js fiels, but .js files can win over default option here not over specific here
const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
        // navigationOptions: {
        //     headerStyle: {
        //         backgroundColor: Platform.OS === 'android' ? Colors.mintGreen : '',
        //         headerTintColor: Platform.OS === 'android' ? 'white' : Colors.royalBlue,
        //         paddingTop: 30,
        //     },
        // }
    },
    // below line is longer form of telling react navigation which screen should be loaded for which identitfire
    CategoryMeals: {
        screen: CategoryMealsScreen,
        // here this is also queit cumbersome to repeate to every page
        // navigationOptions:{
        // headerStyle:{
        //     backgroundColor:Colors.scarletRed,
        // },
        // headerTintColor: Platform.OS === 'android' ? 'white':Colors.royalBlue,}
    },
    MealDetail: MealsDetailScreen,
},

    {
        defaultNavigationOptions: defaultStackNavOptions,
    }
)

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealsDetailScreen,
},
    {
        defaultNavigationOptions: defaultStackNavOptions
    }
)


// now i want my CategoriesScreen to show when i click on one of my tab so not only the screen but i want my navigator function also like going back and stacking screens so is did meals:MealsNvigator, and actually we can use a stack or any other navigator 
const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            // tabBaricon is funciton recive some tabInfo
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
            },
            // this tabcolor only works on shifting
            tabBarColor: Colors.darkBlue,
            // tabBarColor: 'purple'
            // one way is this and other way is
            // tabBarLabel:'Meals'
            tabBarLabel: Platform.OS === 'android'?<Text style={{fontFamily:'open-sans-bold'}}>Meals</Text>: 'Meals',
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarLabel: 'Favorites!',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
            },
            // this tabcolor only works on shifting
            tabBarColor: Colors.skyBlue,
            // tabBarColor: 'green'

            // one way is this and other way is
            // tabBarLabel:'Meals'
            tabBarLabel: Platform.OS === 'android'?<Text style={{fontFamily:'open-sans-bold'}}>Favorites</Text>: 'Favorites',

        }
    }
}

// creatematerialbottometabanavigator and createbottomtabnavigator both are same but slightly different the only reason we are using both is to set seperate styles for the both android and ios, and creatematerialbottomtabnavigator is some what gives us androidish look 
const MealsFavTabNavigator =
    Platform.OS === 'android'
        ? createMaterialBottomTabNavigator(
            tabScreenConfig,
            {
                // here activeColor actually works as activetintcolor 
                // and background color was given automatically by the createmateraialbottomtabnavigaotr
                activeColor: 'white',
                // on shifting color tabcolor wont work it will switch to the automatic color
                shifting: true,
                // on shifitng: false we can also choose the custom backgorund color
                barStyle: {
                    backgroundColor: 'purple',
                    // marginTop:20,
                },
                // this creatematerialbottomtabnavigator wont have labelstyle
                // labelStyle:{
                //     fontFamily:'open-sans-bold',
                // }
            }
        )
        : createBottomTabNavigator(
            tabScreenConfig,

            {
                tabBarOptions: {
                    labelStyle:{
                      fontFamily:'open-sans-bold',  
                    },
                    activeBackgroundColor: Colors.mintGreen,
                    activeTintColor: 'black',
                    inactiveBackgroundColor: '',
                    inactiveTintColor: 'black',
                }
            }
        );


const FiltersNavigator = createStackNavigator({
    Filters: FilterScreen

},
    {
        // here navigationsoptons is not in the Filters:{screen:filterscreen} bcoz we want this navigationOptions for the whole navigator when this FiltersNavigator used as screen or we can do this in the navigator(MainNavigator) where we use this FiltersNavigator as a screen
        // navigationOptions:{
        //     drawerLabel: 'Filters!!'
        // },
        defaultNavigationOptions: defaultStackNavOptions
    })

// now we have to add drawer menu manually
const MainNavigator = createDrawerNavigator({
    MealsFavs: {screen:MealsFavTabNavigator,
        // here navigationOptions is nothin but we are setting the whole 
        navigationOptions:{
            drawerLabel: 'Meals'
        },
    },
    Filters: FiltersNavigator,
},{
    contentOptions:{
        activeTintColor:'purple',
        labelStyle:{
            fontFamily: 'open-sans-bold',
            fontSize:16,
            textAlign:'center',
        },
        itemsContainerStyle:{
            // this line will lower the whole drawer 
                marginTop:StatusBar.currentHeight,
            },
        // itemStyle:{
        //     flexDirection:'row',
        //     justifyContent:'center',
        // }
    },
    // drawerBackgroundColor:'black',

})

// createappcontainer also creats navigation container means this give u react component in form of mealsnavigator , now MealsNavigator has all the metadata about navigation
export default createAppContainer(MainNavigator);