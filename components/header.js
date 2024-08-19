import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Fonts, Default, Colors } from "../constants/styles";
import Feather from "react-native-vector-icons/Feather";

const Header = (props) => {
  const { i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  return (
    <View
      style={{
        flexDirection: isRtl ? "row-reverse" : "row",
        ...styles.headerViewStyle,
      }}
    >
      <TouchableOpacity onPress={() => props.navigation.pop()}>
        <Feather
          name={isRtl ? "arrow-right" : "arrow-left"}
          size={25}
          color={Colors.white}
        />
      </TouchableOpacity>
      <Text
        numberOfLines={1}
        style={{
          textAlign: isRtl ? "right" : "left",
          ...styles.titleTextStyle,
        }}
      >
        {props.title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerViewStyle: {
    alignItems: "center",
    padding: Default.fixPadding * 1.5,
    backgroundColor: Colors.darkBlue,
  },
  titleTextStyle: {
    flex: 1,
    overflow: "hidden",
    marginHorizontal: Default.fixPadding,
    ...Fonts.Bold18white,
  },
});
