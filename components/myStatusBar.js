import React from "react";
import { StatusBar, SafeAreaView } from "react-native";
import { Colors } from "../constants/styles";

const MyStatusBar = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.darkBlue }}>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.darkBlue}
        barStyle={"light-content"}
      />
    </SafeAreaView>
  );
};

export default MyStatusBar;
