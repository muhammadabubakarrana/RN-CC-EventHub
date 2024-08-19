import React from "react";
import { StyleSheet, Text, View, ImageBackground, Image, StatusBar } from "react-native";
import MyStatusBar from "../components/myStatusBar";
import { Colors, Fonts, Default } from "../constants/styles";
import { useNavigation } from "expo-router";

const Index = () => {
  const navigation = useNavigation();
  setTimeout(() => {
    navigation.push("onboarding/onboardingScreen");
  }, 2000);

  const splashView = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.darkBlue,
        }}
      >
        <ImageBackground
          source={require("../assets/images/splashBg.png")}
          style={{ flex: 1, opacity: 0.09 }}
        />
        <View style={styles.positionViewStyle}>
          <Image
            source={require("../assets/images/appIcon.png")}
            style={styles.appIconStyle}
          />

          <Text style={styles.textStyle}>
            EVENT<Text style={Fonts.SemiBold34primary}>HUB</Text>
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent barStyle={"light-content"} />
      {splashView()}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  positionViewStyle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  appIconStyle: {
    resizeMode: "contain",
    width: 47.91,
    height: 50.18,
  },
  textStyle: {
    ...Fonts.SemiBold34white,
    marginTop: Default.fixPadding * 1.5,
  },
});
