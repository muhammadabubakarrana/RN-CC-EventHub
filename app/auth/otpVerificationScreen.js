import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import { useNavigation } from "expo-router";
import CommonButton from "../../components/commonButton";
import { Ionicons } from "@expo/vector-icons";
import { OtpInput } from "react-native-otp-entry";

const { width } = Dimensions.get("window");

const OtpVerificationScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`otpVerificationScreen:${key}`);
  }

  const [timer, setTimer] = useState(59);
  const [intervalStop, setIntervalStop] = useState(true);

  const intervalRef = useRef();

  useEffect(() => {
    if (intervalStop) {
      intervalRef.current = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        } else {
          clearInterval(intervalRef.current);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [timer, intervalStop]);

  const formatSecondsToTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const [loadingModal, setLoadingModal] = useState(false);

  const closeLoadingModal = () => {
    setIntervalStop(false);
    setLoadingModal(true);
    setTimeout(() => {
      setLoadingModal(false);
      navigation.push("(tabs)");
    }, 1500);
  };

  const topBackHandle = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIntervalStop(false);
          navigation.pop();
        }}
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

  const otpView = () => {
    return (
      <View style={styles.otpWrapperStyle}>
        <OtpInput
          numberOfDigits={4}
          onTextChange={(otp) => {
            if (otp.length === 4) {
              closeLoadingModal();
            }
          }}
          theme={{
            pinCodeTextStyle: { ...Fonts.SemiBold18primary },
            pinCodeContainerStyle: styles.pinCodeContainerStyle,
            focusedPinCodeContainerStyle: styles.focusedPinCodeContainerStyle,
            focusStickStyle: { backgroundColor: Colors.primary },
          }}
        />
      </View>
    );
  };

  const otpTimer = () => {
    return (
      <View style={styles.timeViewStyle}>
        <Text style={{ ...Fonts.Bold15primary }}>
          {formatSecondsToTime(timer)}
        </Text>
      </View>
    );
  };

  const resend = () => {
    return (
      <View
        style={{
          marginBottom: Default.fixPadding * 2,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <Text style={{ ...Fonts.Medium15white, textAlign: "center" }}>
          {`${tr("receivedCode")}`}
          <Text
            disabled={timer !== 0}
            onPress={() => {
              if (timer === 0) {
                setTimer(59);
              }
            }}
            style={{ ...Fonts.Medium15primary }}
          >
            {` ${tr("resend")}`}
          </Text>
        </Text>
      </View>
    );
  };

  const otpVerification = () => {
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
              {tr("otpVerification").toLocaleUpperCase()}
            </Text>
            <Text style={{ ...Fonts.SemiBold14grey, textAlign: "center" }}>
              {tr("pleaseEnter")}+91 1234567890
            </Text>
          </View>
          {otpView()}
          {otpTimer()}
          <CommonButton
            title={tr("verify")}
            onPress={() => closeLoadingModal()}
          />
          {resend()}
        </View>
      </View>
    );
  };

  const pleaseWaitLoadingModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={loadingModal}>
        <View style={styles.modalViewStyle}>
          <View style={styles.modalSubViewStyle}>
            <ActivityIndicator size={"large"} color={Colors.primary} />
            <Text
              style={{
                ...Fonts.Bold16primary,
                marginTop: Default.fixPadding,
              }}
            >
              {tr("pleaseWait")}
            </Text>
          </View>
        </View>
      </Modal>
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
          {otpVerification()}
        </ScrollView>
        {pleaseWaitLoadingModal()}
      </View>
    </View>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  imageViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Default.fixPadding * 3,
    marginTop: Default.fixPadding * 0.5,
  },
  imageStyle: {
    width: width * 0.8,
    height: 222,
    resizeMode: "contain",
  },
  backTouchableStyle: {
    marginTop: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 0.5,
    marginHorizontal: Default.fixPadding * 2,
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
    marginTop: Default.fixPadding * 2.6,
    marginHorizontal: Default.fixPadding * 4,
  },
  otpWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    margin: Default.fixPadding * 4,
  },
  focusedPinCodeContainerStyle: {
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 2,
    borderColor: Colors.primary,
  },
  pinCodeContainerStyle: {
    width: 55,
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 2,
    borderColor: Colors.pickledBluewood,
  },
  timeViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: Default.fixPadding * 1.2,
    paddingVertical: Default.fixPadding * 0.6,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 40,
    marginTop: Default.fixPadding * 1.2,
    marginBottom: Default.fixPadding * 0.5,
  },
  modalViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(48, 47, 47, 0.25)",
  },
  modalSubViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.9,
    height: 166,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
