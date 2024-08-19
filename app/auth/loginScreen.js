import React, { useState, useCallback } from "react";
import {
  View,
  BackHandler,
  StyleSheet,
  Dimensions,
  Text,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import SnackbarToast from "../../components/snackbarToast";
import { useNavigation } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import CommonButton from "../../components/commonButton";
import { FontAwesome } from "@expo/vector-icons";
import IntlPhoneInput from "react-native-intl-phone-input";
import DashedLine from "react-native-dashed-line";

const { width } = Dimensions.get("window");

const LoginScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`loginScreen:${key}`);
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

  const topImage = () => {
    return (
      <View style={styles.imageViewStyle}>
        <Image
          source={require("../../assets/images/loginImg.png")}
          style={styles.imageStyle}
        />
      </View>
    );
  };

  const mobileNumber = () => {
    return (
      <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
        <IntlPhoneInput
          placeholder={tr("enterMobileNumber")}
          placeholderTextColor={Colors.grey}
          defaultCountry="IN"
          filterText={tr("search")}
          closeText={tr("close")}
          inputProps={{
            cursorColor: Colors.primary,
            selectionColor: Colors.primary,
          }}
          flagStyle={{
            width: 0,
            height: 0,
          }}
          modalCountryItemCountryNameStyle={{
            ...Fonts.Medium15black,
          }}
          dialCodeTextStyle={{
            ...Fonts.Medium14white,
          }}
          containerStyle={styles.phoneNumberContainerStyle}
          phoneInputStyle={{
            textAlign: isRtl ? "right" : "left",
            paddingHorizontal: Default.fixPadding,
            ...styles.phoneInputStyle,
          }}
        />
      </View>
    );
  };

  const orLoginUsing = () => {
    return (
      <View style={{ marginBottom: Default.fixPadding * 2 }}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            marginTop: Default.fixPadding * 2.2,
          }}
        >
          <DashedLine
            dashGap={2.5}
            dashLength={2.5}
            dashThickness={1.5}
            dashColor={Colors.lightToryBlue}
            style={{ flex: 1 }}
          />
          <Text numberOfLines={1} style={styles.orLoginUsingTextStyle}>
            {tr("orLogin")}
          </Text>
          <DashedLine
            dashGap={2.5}
            dashLength={2.5}
            dashThickness={1.5}
            dashColor={Colors.lightToryBlue}
            style={{ flex: 1 }}
          />
        </View>
        <View
          style={{
            marginHorizontal: Default.fixPadding * 2,
            marginTop: Default.fixPadding * 5,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.socialButtonStyle,
              shadowColor: "rgba(12, 86, 155, 0.25)",
              backgroundColor: Colors.toryBlue,
            }}
          >
            <Text style={{ ...Fonts.Bold18white }}>Facebook</Text>
            <View
              style={{
                left: isRtl ? null : 0,
                right: isRtl ? 0 : null,
                borderTopLeftRadius: isRtl ? 0 : 10,
                borderBottomLeftRadius: isRtl ? 0 : 10,
                borderTopRightRadius: isRtl ? 10 : 0,
                borderBottomRightRadius: isRtl ? 10 : 0,
                backgroundColor: Colors.veniceBlue,
                ...styles.positionSocialIconViewStyle,
              }}
            >
              <FontAwesome name="facebook" size={18} color={Colors.white} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.socialButtonStyle,
              shadowColor: "rgba(250, 67, 53, 0.25)",
              backgroundColor: Colors.lightRed,
            }}
          >
            <Text style={{ ...Fonts.Bold18white }}>Google</Text>
            <View
              style={{
                left: isRtl ? null : 0,
                right: isRtl ? 0 : null,
                borderTopLeftRadius: isRtl ? 0 : 10,
                borderBottomLeftRadius: isRtl ? 0 : 10,
                borderTopRightRadius: isRtl ? 10 : 0,
                borderBottomRightRadius: isRtl ? 10 : 0,
                backgroundColor: Colors.red,
                ...styles.positionSocialIconViewStyle,
              }}
            >
              <FontAwesome name="google" size={18} color={Colors.white} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const login = () => {
    return (
      <View style={styles.borderViewStyle}>
        <View style={{ overflow: "hidden" }}>
          <View style={styles.titleWrapperViewStyle}>
            <Text
              style={{
                ...Fonts.Bold20white,
                marginBottom: Default.fixPadding * 0.8,
              }}
            >
              {tr("login").toLocaleUpperCase()}
            </Text>
            <Text style={{ ...Fonts.SemiBold14grey, textAlign: "center" }}>
              {tr("pleaseConfirm")}
            </Text>
          </View>
          {mobileNumber()}

          <CommonButton
            title={tr("login")}
            onPress={() => navigation.push("auth/registerScreen")}
          />
          {orLoginUsing()}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          {topImage()}
          {login()}
        </ScrollView>
      </View>
      <SnackbarToast
        visible={visibleToast}
        title={tr("tapBack")}
        onDismiss={onDismissVisibleToast}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  imageViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Default.fixPadding * 3,
  },
  imageStyle: {
    width: width * 0.8,
    height: 222,
    resizeMode: "contain",
  },
  borderViewStyle: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: Colors.lightBlue,
    ...Default.shadowWhite,
  },
  titleWrapperViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Default.fixPadding * 4,
    marginTop: Default.fixPadding * 3,
    marginBottom: Default.fixPadding * 5,
  },
  phoneNumberContainerStyle: {
    marginBottom: Default.fixPadding * 3,
    backgroundColor: Colors.bgColor,
    borderRadius: 0,
    paddingVertical: Default.fixPadding,
    borderBottomWidth: 2,
    borderBottomColor: Colors.pickledBluewood,
  },
  phoneInputStyle: {
    ...Fonts.Medium14white,
    borderLeftWidth: 1,
    borderLeftColor: Colors.grey,
    marginLeft: Default.fixPadding,
  },
  orLoginUsingTextStyle: {
    ...Fonts.Medium15white,
    marginHorizontal: Default.fixPadding * 0.3,
    maxWidth: 150,
  },
  socialButtonStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.5,
    borderRadius: 10,
    marginBottom: Default.fixPadding * 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.22,
    elevation: 3,
  },
  positionSocialIconViewStyle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    bottom: 0,
    width: 42,
  },
});
