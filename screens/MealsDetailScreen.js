import React from 'react';
import {View,Text, StyleSheet,Button } from 'react-native';

const MealsDetailScreen = props => {
    return (
        <View style={styles.screen}>
           <Text>The MealsDetailScreen</Text> 
           {/* {props.navigation.popToTop() this will helps to go back to root screen */}
           <Button title="Go back to root screen" onPress={() => {props.navigation.popToTop()}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
});

export default MealsDetailScreen;