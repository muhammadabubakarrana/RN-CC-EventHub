import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Share,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import { useNavigation } from "expo-router";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/header";
import DashedLine from "react-native-dashed-line";

const TicketScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`ticketScreen:${key}`);
  }

  const shareMessage = () => {
    Share.share({
      message: "EVENTHUB",
    });
  };

  const ticket = () => {
    return (
      <View style={styles.ticketViewStyle}>
        <View style={{ margin: Default.fixPadding * 1.8 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                ...Fonts.Medium18white,
                marginBottom: Default.fixPadding,
              }}
            >
              Abhishek mhalaskar
            </Text>
            <Text style={{ ...Fonts.SemiBold15darkGrey }}>{`${tr(
              "bookingId"
            )}:#45256425DFG `}</Text>
          </View>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginVertical: Default.fixPadding * 2.5,
            }}
          >
            <Image
              style={styles.imageStyle}
              source={require("../../assets/images/img21.png")}
            />
            <View
              style={{
                flex: 1,
                alignItems: isRtl ? "flex-end" : "flex-start",
                marginLeft: isRtl ? 0 : Default.fixPadding * 1.2,
                marginRight: isRtl ? Default.fixPadding * 1.2 : 0,
              }}
            >
              <Text numberOfLines={1} style={{ ...Fonts.Bold16white }}>
                Jisoblack Pink Live Concert
              </Text>
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                  marginVertical: Default.fixPadding * 1.2,
                }}
              >
                <MaterialCommunityIcons
                  name="calendar-range"
                  size={17}
                  color={Colors.grey}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    textAlign: isRtl ? "right" : "left",
                    ...styles.commonTextStyle,
                  }}
                >
                  12-03-2022
                </Text>
              </View>

              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                }}
              >
                <Feather name="clock" size={17} color={Colors.darkGrey} />
                <Text
                  numberOfLines={1}
                  style={{
                    textAlign: isRtl ? "right" : "left",
                    ...styles.commonTextStyle,
                  }}
                >
                  Fri, 12:30 – 11:00 pm
                </Text>
              </View>

              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                  marginTop: Default.fixPadding * 1.2,
                }}
              >
                <Feather name="map-pin" size={17} color={Colors.darkGrey} />
                <Text
                  numberOfLines={1}
                  style={{
                    textAlign: isRtl ? "right" : "left",
                    ...styles.commonTextStyle,
                  }}
                >
                  Expo centre mall, new york
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
            }}
          >
            <View style={styles.commonViewStyle}>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold15white,
                  marginBottom: Default.fixPadding * 0.5,
                }}
              >
                {tr("ticketType")}
              </Text>
              <Text numberOfLines={1} style={{ ...Fonts.SemiBold14white }}>
                Gold
              </Text>
            </View>

            <View
              style={{
                marginHorizontal: Default.fixPadding * 0.5,
                ...styles.commonViewStyle,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold15white,
                  marginBottom: Default.fixPadding * 0.5,
                }}
              >
                {tr("seatNo")}
              </Text>
              <Text numberOfLines={1} style={{ ...Fonts.SemiBold14white }}>
                F5 -F6
              </Text>
            </View>

            <View style={styles.commonViewStyle}>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold15white,
                  marginBottom: Default.fixPadding * 0.5,
                }}
              >
                {tr("totalTicket")}
              </Text>
              <Text numberOfLines={1} style={{ ...Fonts.SemiBold14white }}>
                1 ticket
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              ...styles.circleStyle,
              marginLeft: -Default.fixPadding * 1.5,
            }}
          />
          <DashedLine
            dashGap={2.5}
            dashLength={2.5}
            dashThickness={1.5}
            dashColor={Colors.darkGrey}
            style={{ flex: 1 }}
          />
          <View
            style={{
              ...styles.circleStyle,
              marginRight: -Default.fixPadding * 1.5,
            }}
          />
        </View>

        <View style={styles.qrCodeViewStyle}>
          <Text
            style={{ ...Fonts.SemiBold14grey, marginTop: Default.fixPadding }}
          >
            {tr("showQr")}
          </Text>
          <Image
            source={require("../../assets/images/qrCode.png")}
            style={styles.qrCodeImageStyle}
          />
        </View>
      </View>
    );
  };

  const bottomButtons = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.buttonWrapperViewStyle,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("home/homeScreen")}
          style={{ backgroundColor: Colors.primary, ...styles.buttonStyle }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.ExtraBold18white }}>
            {tr("download")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={shareMessage}
          style={{
            backgroundColor: "rgba(148, 148, 148, 0.4)",
            ...styles.buttonStyle,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.ExtraBold18white }}>
            {tr("share")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
        <Header title={tr("myTicket")} navigation={navigation} />

        <ScrollView showsVerticalScrollIndicator={false}>
          {ticket()}
          {bottomButtons()}
        </ScrollView>
      </View>
    </View>
  );
};

export default TicketScreen;

const styles = StyleSheet.create({
  ticketViewStyle: {
    marginHorizontal: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 4,
    marginTop: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.lightBlue,
  },
  imageStyle: {
    width: 123,
    height: 119,
    borderRadius: 5,
  },
  commonTextStyle: {
    flex: 1,
    ...Fonts.Medium14darkGrey,
    marginHorizontal: Default.fixPadding * 0.7,
  },
  commonViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circleStyle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.darkBlue,
  },
  qrCodeViewStyle: {
    marginHorizontal: Default.fixPadding * 2,
    justifyContent: "center",
    alignItems: "center",
  },
  qrCodeImageStyle: {
    width: 161,
    height: 162,
    resizeMode: "contain",
    marginBottom: Default.fixPadding * 3.1,
    marginTop: Default.fixPadding * 2.2,
  },
  buttonWrapperViewStyle: {
    alignItems: "center",
    marginBottom: Default.fixPadding * 2,
    marginHorizontal: Default.fixPadding,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Default.fixPadding,
    padding: Default.fixPadding * 1.4,
    borderRadius: 5,
  },
});
