import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../constants/Colors";

const CategoryGridTitle = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 22) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    // params is just parameter nothing more it taks as many as key pair values
    <View style={styles.gridItem}>
      <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
        <View style={{ ...styles.container, backgroundColor: props.color }}>
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    elevation: 5,
    overflow: Platform.OS === 'android' && Platform.Version >= 21 ? "hidden" : 'visible',
  },
  container: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    justifyContent: "flex-end",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    alignItems: "flex-end",
  },
  title: {
    fontFamily: "open-sans-bold",
    textAlign: "right",
  },
});

export default CategoryGridTitle;
