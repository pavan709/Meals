// now this meals.js is just a reducer, and i it is good practice to store it in folder thats why i stored in reducers flder
// now reducer is just a funciton, so lets create a function
// reducer function takes two parameters
// 1. state, the current state snapshot, on which we build(update) upon a new state and return that new state, which is then taken by redux and stored in store
// 2. action, because the reducer function is excuted by redux whatever new action is dispatched
import {MEALS} from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';
const initalState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: [],
}
// here the action is comming from actions/meals.js or say if we have multiple files then they are comming form multiple files
const mealsReducer = (state = initalState, action) => {
    switch(action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteMeals.findIndex(
                meal=>meal.id === action.mealId
            );
            if(existingIndex>=0)
            {
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(existingIndex,1);
                return {...state, favoriteMeals: updatedFavMeals};
            } else {
                const meal = state.meals.find( meal => meal.id === action.mealId);
                return {...state, favoriteMeals: state.favoriteMeals.concat(meal)}
            }
        case SET_FILTERS:
            const appliedFilters = action.filters;
            const updatedFilteredMeals = state.meals.filter(meal => {
                if(appliedFilters.glutenFree && !meal.isGlutenFree)
                    return false;
                if(appliedFilters.lactoseFree && !meal.isLactoseFree)
                    return false;
                if(appliedFilters.vegetarianFree && !meal.isVegetarianFree)
                    return false;
                if(appliedFilters.vegan && !meal.isVegan)
                    return false;
                return true
            })
            return {...state, filteredMeals: updatedFilteredMeals};
        default:
            return state;
    }
    return state;
}

export default mealsReducer;