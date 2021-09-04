//  createAppcontainer is always imported from react-navigation no matter which react-navigation version your using
// in this appcontainer we need to wrap our root navigator
import { createAppContainer } from "react-navigation";
// npm install --save --legacy-peer-deps react-navigation-tabs
import { createStackNavigator} from 'react-navigation-stack';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealsDetailScreen from '../screens/MealsDetailScreen';
const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    // below line is longer form of telling react navigation which screen should be loaded for which identitfire
    CategoryMeals:{ 
        screen:CategoryMealsScreen},
    MealDetail: MealsDetailScreen,
})
// createappcontainer also creats navigation container means this give u react component in form of mealsnavigator , now MealsNavigator has all the metadata about navigation
export default createAppContainer(MealsNavigator);