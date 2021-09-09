import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import MealItem from './MealItem';
import { useSelector } from 'react-redux';
const MealList = props => {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals);
    const renderMealItem = itemData => {
        const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id)
        // console.log(isFavorite);
        return (
            <MealItem
                title={itemData.item.title}
                duration={itemData.item.duration}
                affordability={itemData.item.affordability}
                complexity={itemData.item.complexity}
                image={itemData.item.imageUrl}
                onSelectMeal={() => {
                    props.navigation.navigate({
                        routeName: 'MealDetail', params: {
                            mealId: itemData.item.id,
                            mealTitle: itemData.item.title,
                            isFav: isFavorite,
                        }
                    })
                }} />
        );
    }
    return (
        <View style={styles.list}>
            <FlatList data={props.listData} keyExtractor={(item, index) => item.id} renderItem={renderMealItem} style={{ width: '100%' }} />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // padding:15,
    }
});

export default MealList;