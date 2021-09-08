// now this meals.js is just a reducer, and i it is good practice to store it in folder thats why i stored in reducers flder
// now reducer is just a funciton, so lets create a function
// reducer function takes two parameters
// 1. state, the current state snapshot, on which we build(update) upon a new state and return that new state, which is then taken by redux and stored in store
// 2. action, because the reducer function is excuted by redux whatever new action is dispatched
import {MEALS} from '../../data/dummy-data';
const initalState = {
    meals: MEALS,
    filteredMeals: MEALS,
    FavoriteMeals: [],
}

const mealsReducer = (state = initalState, action) => {
    return state;
}

export default mealsReducer;