import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import { useNavigation } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CommonButton from "../../components/commonButton";
import Header from "../../components/header";
import DashedLine from "react-native-dashed-line";

const BookTicketScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`bookTicketScreen:${key}`);
  }

  const ticketDetails = () => {
    return (
      <View style={styles.ticketDetailsViewStyle}>
        <ImageBackground
          source={require("../../assets/images/img10.png")}
          style={styles.imageStyle}
        >
          <LinearGradient
            colors={["rgba(34, 57, 73, 0)", "rgba(34, 57, 73, 1)"]}
            style={{ flex: 1 }}
          />
        </ImageBackground>
        <View
          style={{
            alignItems: isRtl ? "flex-end" : "flex-start",
            marginTop: -Default.fixPadding,
            paddingHorizontal: Default.fixPadding,
          }}
        >
          <Text
            style={{
              ...Fonts.Bold16white,
              marginBottom: Default.fixPadding * 0.8,
            }}
          >
            Jisoblack Pint Live Concert
          </Text>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginBottom: Default.fixPadding * 0.8,
            }}
          >
            <AntDesign name="calendar" size={16} color={Colors.primary} />
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                textAlign: isRtl ? "right" : "left",
                ...Fonts.SemiBold14white,
                marginHorizontal: Default.fixPadding * 0.5,
              }}
            >
              22 june,2022
            </Text>

            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold16primary, maxWidth: 100 }}
            >
              $200
            </Text>
          </View>

          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
            }}
          >
            <Feather name="clock" size={16} color={Colors.primary} />
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                textAlign: isRtl ? "right" : "left",
                ...Fonts.SemiBold14white,
                marginHorizontal: Default.fixPadding * 0.5,
              }}
            >
              8:00PM-12:00PM
            </Text>
          </View>

          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginVertical: Default.fixPadding * 1.5,
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: isRtl ? "flex-end" : "flex-start",
                marginRight: isRtl ? 0 : Default.fixPadding,
                marginLeft: isRtl ? Default.fixPadding : 0,
              }}
            >
              <Text numberOfLines={1} style={{ ...Fonts.SemiBold12grey }}>
                {tr("venue")}:
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold15white,
                  marginVertical: Default.fixPadding * 0.3,
                }}
              >
                jogiyo expo center
              </Text>
            </View>

            <View
              style={{ flex: 1, alignItems: isRtl ? "flex-end" : "flex-start" }}
            >
              <Text numberOfLines={1} style={{ ...Fonts.SemiBold12grey }}>
                {tr("seat")}:
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold15white,
                  marginVertical: Default.fixPadding * 0.3,
                }}
              >
                Gold - 2 seat - F5 & F6
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const dashedLine = () => {
    return (
      <DashedLine
        dashGap={1.5}
        dashLength={2.5}
        dashThickness={1}
        dashColor={Colors.whiteOpacity40}
        style={{
          marginHorizontal: Default.fixPadding * 2,
          marginVertical: Default.fixPadding * 3,
        }}
      />
    );
  };

  const haveDiscountCode = () => {
    return (
      <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.SemiBold16white,
          }}
        >
          {tr("haveDiscountCode")}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.push("offer/offerScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.codeAndApplyViewStyle,
          }}
        >
          <Text
            style={{
              flex: 1,
              textAlign: isRtl ? "right" : "left",
              marginRight: isRtl ? 0 : Default.fixPadding,
              marginLeft: isRtl ? Default.fixPadding : 0,
              ...Fonts.SemiBold15grey,
            }}
          >
            {tr("enterCode")}
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.Bold16primary, maxWidth: 100 }}
          >
            {tr("apply")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const otherDetail = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.otherDetailViewStyle,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: isRtl ? "flex-end" : "flex-start",
            marginRight: isRtl ? 0 : Default.fixPadding,
            marginLeft: isRtl ? Default.fixPadding : 0,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold15grey,
              marginBottom: Default.fixPadding * 1.5,
            }}
          >
            {tr("goldTicket")}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold15grey,
              marginBottom: Default.fixPadding * 1.5,
            }}
          >
            {tr("convenienceCharge")}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold15grey,
              marginBottom: Default.fixPadding * 1.5,
            }}
          >
            {tr("discount")}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.Bold16white,
            }}
          >
            {tr("total")}
          </Text>
        </View>

        <View>
          <Text numberOfLines={1} style={styles.commonTextStyle}>
            $260.00
          </Text>
          <Text numberOfLines={1} style={styles.commonTextStyle}>
            $5.20
          </Text>
          <Text numberOfLines={1} style={styles.commonTextStyle}>
            $0.00
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.Bold16white, maxWidth: 100 }}
          >
            $265.20
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
        <Header title={tr("bookTicket")} navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {ticketDetails()}
          {dashedLine()}
          {haveDiscountCode()}
          {otherDetail()}
        </ScrollView>

        <CommonButton
          title={`${tr("proceedPay")} $265.20`}
          onPress={() => navigation.push("paymentMethod/paymentMethodScreen")}
        />
      </View>
    </View>
  );
};

export default BookTicketScreen;

const styles = StyleSheet.create({
  ticketDetailsViewStyle: {
    marginHorizontal: Default.fixPadding * 2,
    marginTop: Default.fixPadding * 0.5,
    borderRadius: 10,
    backgroundColor: Colors.lightBlue,
  },
  imageStyle: {
    width: "100%",
    height: 163,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
  codeAndApplyViewStyle: {
    alignItems: "center",
    borderRadius: 5,
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 3.4,
    backgroundColor: Colors.lightBlue,
    paddingHorizontal: Default.fixPadding * 1.1,
    paddingVertical: Default.fixPadding * 1.3,
  },
  otherDetailViewStyle: {
    alignItems: "center",
    marginBottom: Default.fixPadding * 2,
    paddingHorizontal: Default.fixPadding * 2,
    paddingVertical: Default.fixPadding * 1.8,
    backgroundColor: Colors.lightBlue,
  },
  commonTextStyle: {
    ...Fonts.SemiBold15grey,
    maxWidth: 100,
    marginBottom: Default.fixPadding * 1.5,
  },
});
