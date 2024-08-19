import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Fonts, Colors, Default } from "../constants/styles";

const CommonButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.touchableStyle}
      onPress={() => props.onPress()}
    >
      <Text numberOfLines={1} style={{ ...Fonts.ExtraBold18white }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  touchableStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.4,
    margin: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    ...Default.shadow,
  },
});
