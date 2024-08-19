import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import { useNavigation } from "expo-router";
import CommonButton from "../../components/commonButton";
import Header from "../../components/header";

const PaymentMethodScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`paymentMethodScreen:${key}`);
  }

  const data = [
    {
      key: "1",
      image: require("../../assets/images/pay4.png"),
      name: "Credit card",
      other: "Pay via credit card",
    },
    {
      key: "2",
      image: require("../../assets/images/pay2.png"),
      name: "Paypal",
      other: "Pay via paypal",
    },
    {
      key: "3",
      image: require("../../assets/images/pay3.png"),
      name: "Google pay",
      other: "Pay instant via Google pay",
    },
    {
      key: "4",
      image: require("../../assets/images/pay1.png"),
      name: "Visa card",
      other: "Pay via visa card",
    },
  ];

  const [selected, setSelected] = useState("Credit card");

  const renderItem = ({ item }) => {
    const isSelected = selected === item.name;
    return (
      <TouchableOpacity
        onPress={() => setSelected(item.name)}
        activeOpacity={0.8}
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.renderItemTouchableStyle,
        }}
      >
        <Image source={item.image} style={styles.imageStyle} />
        <View
          style={{
            flex: 1,
            alignItems: isRtl ? "flex-end" : "flex-start",
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.Bold16white }}>
            {item.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.Bold14grey, marginTop: Default.fixPadding * 0.3 }}
          >
            {item.other}
          </Text>
        </View>

        <View
          style={{
            ...styles.circleStyle,
            backgroundColor: isSelected
              ? Colors.transparent
              : "rgba(148, 148, 148, 0.5)",
            borderColor: isSelected ? Colors.primary : Colors.transparent,
          }}
        ></View>
      </TouchableOpacity>
    );
  };

  const paymentMethodFlatList = () => {
    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: Default.fixPadding * 0.5 }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
        <Header title={tr("selectPaymentMethod")} navigation={navigation} />
        {paymentMethodFlatList()}

        <CommonButton
          title={tr("continue")}
          onPress={() => navigation.push("creditCard/creditCardScreen")}
        />
      </View>
    </View>
  );
};

export default PaymentMethodScreen;

const styles = StyleSheet.create({
  renderItemTouchableStyle: {
    alignItems: "center",
    marginHorizontal: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 2,
    paddingVertical: Default.fixPadding * 0.8,
    paddingHorizontal: Default.fixPadding,
    borderRadius: 10,
    backgroundColor: Colors.lightBlue,
  },
  imageStyle: {
    width: 29,
    height: 29,
    resizeMode: "contain",
  },
  circleStyle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 6,
  },
});
