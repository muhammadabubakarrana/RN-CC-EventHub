import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";

const MyTicketsScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`myTicketsScreen:${key}`);
  }

  const header = () => {
    return (
      <View style={styles.headerViewStyle}>
        <Text style={{ ...Fonts.Bold20white }}>{tr("myTickets")}</Text>
      </View>
    );
  };

  const myTicketList = [
    {
      key: "1",
      image: require("../../../assets/images/img10.png"),
      name: "Backstreet boys event",
      address: "jogiyo expo center",
      date: "15 october 2022",
      expired: false,
    },
    {
      key: "2",
      image: require("../../../assets/images/img22.png"),
      name: "Austin education event",
      address: "VIP plaza stedium",
      date: "10 october 2022",
      expired: false,
    },
    {
      key: "3",
      image: require("../../../assets/images/img14.png"),
      name: "Musical night festival",
      address: "Union square musiam",
      date: "8 october 2022",
      expired: true,
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.renderItemViewStyle}>
        <TouchableOpacity
          onPress={() => navigation.push("ticket/ticketScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.titleAndImageViewStyle,
          }}
        >
          <Image source={item.image} style={styles.imageStyle} />
          <View
            style={{
              flex: 1,
              alignItems: isRtl ? "flex-end" : "flex-start",
              marginHorizontal: Default.fixPadding,
            }}
          >
            <Text numberOfLines={1} style={{ ...Fonts.Bold16white }}>
              {item.name}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.SemiBold15grey,
                marginVertical: Default.fixPadding * 0.4,
              }}
            >
              {item.address}
            </Text>
            <Text numberOfLines={1} style={{ ...Fonts.SemiBold14primary }}>
              {item.date}
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.buttonWrapperStyle,
          }}
        >
          <TouchableOpacity
            style={styles.directionTouchableStyle}
            onPress={() => navigation.push("direction/directionScreen")}
          >
            <Text numberOfLines={1} style={{ ...Fonts.Bold16grey }}>
              {tr("direction")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.push("ticket/ticketScreen")}
            style={{
              marginLeft: isRtl ? 0 : Default.fixPadding * 1.4,
              marginRight: isRtl ? Default.fixPadding * 1.4 : 0,
              backgroundColor: item.expired
                ? Colors.extraLightRed
                : Colors.primary,
              ...styles.expiredTouchableStyle,
            }}
          >
            <Text numberOfLines={1} style={{ ...Fonts.Bold16white }}>
              {item.expired ? tr("expired") : tr("viewTicket")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const myTicketFlatList = () => {
    return (
      <FlatList
        data={myTicketList}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: Default.fixPadding * 0.5,
          paddingBottom: Default.fixPadding * 6.5,
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
        {header()}
        {myTicketFlatList()}
      </View>
    </View>
  );
};

export default MyTicketsScreen;

const styles = StyleSheet.create({
  headerViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.5,
  },
  renderItemViewStyle: {
    marginHorizontal: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.lightBlue,
    ...Default.shadowDarkBlue,
  },
  titleAndImageViewStyle: {
    alignItems: "center",
    paddingTop: Default.fixPadding,
    paddingHorizontal: Default.fixPadding,
    paddingBottom: Default.fixPadding * 1.5,
  },
  imageStyle: {
    width: 74,
    height: 74,
    borderRadius: 5,
  },
  expiredTouchableStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.transparent,
  },
  directionTouchableStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: Default.fixPadding,
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  buttonWrapperStyle: {
    alignItems: "center",
    marginHorizontal: Default.fixPadding,
    marginBottom: Default.fixPadding,
  },
});
