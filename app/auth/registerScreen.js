import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import { useNavigation } from "expo-router";
import CommonButton from "../../components/commonButton";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`registerScreen:${key}`);
  }

  const [name, setName] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [emailAddress, setEmailAddress] = useState();

  const topBackHandle = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.pop()}
        style={{
          alignSelf: isRtl ? "flex-end" : "flex-start",
          ...styles.backTouchableStyle,
        }}
      >
        <Ionicons
          name={isRtl ? "arrow-forward-outline" : "arrow-back-outline"}
          size={24}
          color={Colors.white}
        />
      </TouchableOpacity>
    );
  };

  const nameTextInput = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.textInputViewStyle,
        }}
      >
        <Feather name="user" size={18} color={Colors.grey} />
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={tr("enterUserName")}
          placeholderTextColor={Colors.grey}
          selectionColor={Colors.primary}
          style={{
            textAlign: isRtl ? "right" : "left",
            ...styles.texInputStyle,
          }}
        />
      </View>
    );
  };

  const mobileNumberTextInput = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.textInputViewStyle,
        }}
      >
        <MaterialIcons name="phone-android" size={18} color={Colors.grey} />
        <TextInput
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder={tr("enterMobileNumber")}
          keyboardType="number-pad"
          placeholderTextColor={Colors.grey}
          selectionColor={Colors.primary}
          style={{
            textAlign: isRtl ? "right" : "left",
            ...styles.texInputStyle,
          }}
        />
      </View>
    );
  };

  const emailAddressTextInput = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.textInputViewStyle,
        }}
      >
        <Feather name="mail" size={18} color={Colors.grey} />
        <TextInput
          value={emailAddress}
          onChangeText={setEmailAddress}
          placeholder={tr("enterEmailAddress")}
          keyboardType="email-address"
          placeholderTextColor={Colors.grey}
          selectionColor={Colors.primary}
          style={{
            textAlign: isRtl ? "right" : "left",
            ...styles.texInputStyle,
          }}
        />
      </View>
    );
  };

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

  const register = () => {
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
              {tr("register").toLocaleUpperCase()}
            </Text>
            <Text style={{ ...Fonts.SemiBold14grey, textAlign: "center" }}>
              {tr("welcome")}
            </Text>
          </View>
          {nameTextInput()}
          {mobileNumberTextInput()}
          {emailAddressTextInput()}

          <View style={{ marginTop: Default.fixPadding * 4 }}>
            <CommonButton
              title={tr("register")}
              onPress={() => navigation.push("auth/otpVerificationScreen")}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
        {topBackHandle()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {topImage()}
          {register()}
        </ScrollView>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  imageViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Default.fixPadding * 3,
    marginTop: Default.fixPadding * 0.2,
  },
  imageStyle: {
    width: width * 0.8,
    height: 222,
    resizeMode: "contain",
  },
  backTouchableStyle: {
    marginHorizontal: Default.fixPadding * 2,
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 0.5,
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
    marginTop: Default.fixPadding * 2.6,
    marginBottom: Default.fixPadding * 4.6,
  },
  textInputViewStyle: {
    alignItems: "center",
    paddingVertical: Default.fixPadding * 1.4,
    marginHorizontal: Default.fixPadding * 2,
    borderBottomColor: Colors.pickledBluewood,
    borderBottomWidth: 2,
    marginBottom: Default.fixPadding * 1.6,
  },
  texInputStyle: {
    flex: 1,
    ...Fonts.Medium14white,
    marginHorizontal: Default.fixPadding * 1.2,
  },
});
