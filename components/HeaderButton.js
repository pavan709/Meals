import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../constants/Colors';


const CustomHeaderButton = props => {
    // IconComponent is a prop we are getting form this package, and this prop expects a icon from expo icon package
    return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={Colors.scarletRed}/>
}

export default CustomHeaderButton;