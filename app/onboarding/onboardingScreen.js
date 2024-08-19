import React, { useState, useCallback } from "react";
import {
  View,
  BackHandler,
  StyleSheet,
  Dimensions,
  Text,
  Platform,
  Image,
  SafeAreaView,
  ImageBackground,
  StatusBar,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Default, Fonts, Colors } from "../../constants/styles";
import SnackbarToast from "../../components/snackbarToast";
import { useNavigation } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import CommonButton from "../../components/commonButton";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`onboardingScreen:${key}`);
  }

  const [visibleToast, setVisibleToast] = useState(false);
  const onDismissVisibleToast = () => setVisibleToast(false);

  const [exitApp, setExitApp] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (Platform.OS === "android") {
          setTimeout(() => {
            setExitApp(0);
          }, 2000);

          if (exitApp === 0) {
            setExitApp(exitApp + 1);
            setVisibleToast(true);
          } else if (exitApp === 1) {
            BackHandler.exitApp();
          }
          return true;
        }
      };
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
      };
    }, [exitApp])
  );

  const imageBg = () => {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.extraLightBlue }}>
        <ImageBackground
          source={require("../../assets/images/onboarding/onboardingBg.png")}
          style={{ flex: 1, opacity: 0.1 }}
        />
      </View>
    );
  };

  const topImageGroup = () => {
    return (
      <View
        style={{
          marginTop: StatusBar.currentHeight + Default.fixPadding * 6,
          marginBottom: Default.fixPadding * 2,
        }}
      >
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/onboarding/onboarding1.png")}
              style={{
                marginLeft: isRtl ? 0 : -Default.fixPadding,
                marginRight: isRtl ? -Default.fixPadding : 0,
                borderRadius: 10,
                ...styles.commonImageStyle,
              }}
            />

            <Image
              source={require("../../assets/images/onboarding/onboarding2.png")}
              style={{
                height: 169,
                borderRadius: 10,
                width: width / 2.65,
                marginHorizontal: Default.fixPadding * 1.5,
              }}
            />

            <View
              style={{
                right: isRtl ? 0 : 65,
                left: isRtl ? 65 : 0,
                ...styles.positionPrimaryViewStyle,
              }}
            >
              <View style={styles.commonPrimaryBoxStyle}>
                <Ionicons name="barbell-sharp" size={20} color={Colors.white} />
              </View>
            </View>
          </View>

          <View>
            <Image
              source={require("../../assets/images/onboarding/onboarding3.png")}
              style={{
                ...styles.commonImageStyle,
                borderTopLeftRadius: isRtl ? 0 : 10,
                borderBottomLeftRadius: isRtl ? 0 : 10,
                borderRadius: isRtl ? 10 : 0,
              }}
            />

            <View
              style={{
                top: 0,
                left: 0,
                right: 0,
                ...styles.positionPrimaryViewStyle,
              }}
            >
              <View
                style={{
                  ...styles.commonPrimaryBoxStyle,
                  marginTop: -Default.fixPadding * 2,
                }}
              >
                <MaterialCommunityIcons
                  name="music-box-multiple-outline"
                  size={20}
                  color={Colors.white}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            marginTop: Default.fixPadding * 1.4,
          }}
        >
          <View>
            <Image
              source={require("../../assets/images/onboarding/onboarding4.png")}
              style={{
                height: 93,
                borderRadius: 10,
                width: width / 3.5,
                marginLeft: isRtl ? 0 : -Default.fixPadding,
                marginRight: isRtl ? -Default.fixPadding : 0,
              }}
            />
            <View
              style={{
                bottom: 0,
                left: 0,
                right: 0,
                ...styles.positionPrimaryViewStyle,
              }}
            >
              <View
                style={{
                  ...styles.commonPrimaryBoxStyle,
                  marginBottom: -Default.fixPadding * 2,
                }}
              >
                <MaterialIcons
                  name="person-outline"
                  size={20}
                  color={Colors.white}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/onboarding/onboarding5.png")}
              style={{
                height: 107,
                borderRadius: 10,
                width: width / 2.65,
                marginHorizontal: Default.fixPadding * 1.5,
              }}
            />

            <View
              style={{
                zIndex: 1,
                left: isRtl ? 0 : 50,
                right: isRtl ? 50 : 0,
                ...styles.positionPrimaryViewStyle,
              }}
            >
              <View style={styles.commonPrimaryBoxStyle}>
                <Ionicons
                  name="basketball-outline"
                  size={20}
                  color={Colors.white}
                />
              </View>
            </View>

            <Image
              source={require("../../assets/images/onboarding/onboarding6.png")}
              style={{
                borderTopLeftRadius: isRtl ? 0 : 10,
                borderBottomLeftRadius: isRtl ? 0 : 10,
                borderRadius: isRtl ? 10 : 0,
                ...styles.lastImageStyle,
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  const titlesAndButton = () => {
    return (
      <View style={{ marginBottom: Default.fixPadding }}>
        <View style={styles.titleWrapperStyle}>
          <Text
            numberOfLines={2}
            style={{
              ...Fonts.Bold22white,
              textAlign: "center",
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            {tr("title")}
          </Text>
          <Text numberOfLines={3} style={styles.descriptionTextStyle}>
            Lorem ipsum dolor sit amet consectetur. Justo sacsgittis nulla
            cursus amet scelerisque cursus non riscus. Lacus fringilla riszus
            condimentum accumsan
          </Text>
        </View>
        <CommonButton
          title={tr("getStarted")}
          onPress={() => navigation.push("auth/loginScreen")}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent barStyle={"light-content"} />
      {imageBg()}
      <View style={styles.positionViewStyle}>
        <SafeAreaView />
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          {topImageGroup()}
          {titlesAndButton()}
        </View>
      </View>
      <SnackbarToast
        visible={visibleToast}
        title={tr("tapBack")}
        onDismiss={onDismissVisibleToast}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  positionViewStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  titleWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Default.fixPadding * 2,
    marginTop: Default.fixPadding * 2,
  },
  descriptionTextStyle: {
    ...Fonts.SemiBold14grey,
    textAlign: "center",
    marginBottom: Default.fixPadding * 3,
    marginTop: Default.fixPadding,
  },
  commonPrimaryBoxStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    ...Default.shadow,
  },
  commonImageStyle: {
    height: 138,
    width: width / 3.5,
  },
  positionPrimaryViewStyle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  lastImageStyle: {
    width: width / 3.5,
    height: 85,
  },
});
