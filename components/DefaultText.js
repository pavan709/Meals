import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

const DefaultText = props => {
    return <Text style={styles.text}>{props.children}</Text>
}

const styles= StyleSheet.create({
    text:{
        fontFamily:'open-sans',
        // fontSize:30,
    }
})

export default DefaultText;