import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import { useNavigation } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Header from "../../components/header";

const OfferScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`offerScreen:${key}`);
  }

  const [code, setCode] = useState("Prom3sdghj");

  const availableOfferList = [
    {
      key: "1",
      image: require("../../assets/images/bank1.png"),
      name: "SBI card offer",
      other: "Get 25 % discount on using sbi card",
      validTill: "25 dec 2022",
      code: "GET2051",
    },
    {
      key: "2",
      image: require("../../assets/images/bank2.png"),
      name: "SBI card offer",
      other: "Get 15 % discount on using Paytm wallet",
      validTill: "25 dec 2022",
      code: "GET2051",
    },
    {
      key: "3",
      image: require("../../assets/images/bank3.png"),
      name: "SBI card offer",
      other: "Get 20 % discount on using icici bank card",
      validTill: "25 dec 2022",
      code: "GET2051",
    },
  ];

  const listHeaderComponent = () => {
    return (
      <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.Bold16white,
          }}
        >
          {tr("enterPromocode")}
        </Text>

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.promoCodeViewStyle,
          }}
        >
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder={tr("enterPromocode")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            style={{
              textAlign: isRtl ? "right" : "left",
              marginRight: isRtl ? 0 : Default.fixPadding,
              marginLeft: isRtl ? Default.fixPadding : 0,
              ...styles.texInputStyle,
            }}
          />

          {code && (
            <Ionicons
              name="checkmark-circle-sharp"
              size={24}
              color={Colors.primary}
            />
          )}
        </View>

        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.Bold16white,
            marginBottom: Default.fixPadding * 1.5,
          }}
        >
          {tr("availableOffer")}
        </Text>
      </View>
    );
  };

  const availableOfferData = () => {
    return (
      <View>
        {availableOfferList.map((item, index) => {
          const highlightDiscount = (text) => {
            const parts = text.split(/(\d+ % discount)/);
            return parts.map((part, index) =>
              part.match(/\d+ %/) ? (
                <Text key={index} style={{ ...Fonts.SemiBold14primary }}>
                  {part}
                </Text>
              ) : (
                part
              )
            );
          };
          return (
            <View
              key={index}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                ...styles.renderItemViewStyle,
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
                <Text numberOfLines={1} style={{ ...Fonts.Bold16white }}>
                  {item.name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ ...Fonts.SemiBold12grey }}
                >{`${tr("validTill")}: ${item.validTill}`}</Text>

                <Text
                  numberOfLines={2}
                  style={{
                    textAlign: isRtl ? "right" : "left",
                    marginVertical: Default.fixPadding * 0.5,
                    ...Fonts.SemiBold14white,
                  }}
                >
                  {highlightDiscount(item.other)}
                </Text>

                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    alignSelf: isRtl ? "flex-end" : "flex-start",
                    ...styles.codeViewStyle,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.SemiBold14primary,
                      marginRight: isRtl ? 0 : Default.fixPadding,
                      marginLeft: isRtl ? Default.fixPadding : 0,
                      maxWidth: 100,
                    }}
                  >
                    {item.code}
                  </Text>
                  <MaterialIcons
                    name="content-copy"
                    size={20}
                    color={Colors.primary}
                  />
                </View>
              </View>
              <Image source={item.image} style={styles.imageStyle} />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
        <Header title={tr("offer")} navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          {listHeaderComponent()}
          {availableOfferData()}
        </ScrollView>
      </View>
    </View>
  );
};

export default OfferScreen;

const styles = StyleSheet.create({
  renderItemViewStyle: {
    alignItems: "center",
    marginHorizontal: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 2.6,
    paddingHorizontal: Default.fixPadding * 1.5,
    paddingVertical: Default.fixPadding,
    borderRadius: 10,
    backgroundColor: Colors.lightBlue,
    ...Default.shadowDarkBlue,
  },
  imageStyle: {
    width: 124,
    height: 124,
    borderRadius: 5,
  },
  codeViewStyle: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 5,
    padding: Default.fixPadding * 0.8,
    borderColor: Colors.primary,
    marginTop: Default.fixPadding,
  },
  promoCodeViewStyle: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.primary,
    paddingHorizontal: Default.fixPadding * 1.8,
    paddingVertical: Default.fixPadding * 1.1,
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 2,
    backgroundColor: Colors.lightBlue,
  },
  texInputStyle: {
    flex: 1,
    ...Fonts.SemiBold15primary,
  },
});
