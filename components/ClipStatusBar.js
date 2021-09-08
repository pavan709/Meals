import React from 'react';
import { SafeAreaView, StatusBar,StyleSheet,Text, Platform, View } from 'react-native';

const ClipStatusBar = props => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.container}>
                {console.log('Height on: ', Platform.OS, StatusBar.currentHeight)}
            {props.children}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
});

export default ClipStatusBar;