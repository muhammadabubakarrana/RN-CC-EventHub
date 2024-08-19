import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import { useNavigation } from "expo-router";
import Header from "../../components/header";

const seatsList = [
  {
    key: "1",
    type: "VIP",
    price: 130,
    data: [
      { title: "A", booked: ["A2"] },
      { title: "B", booked: ["B4", "B9"] },
      { title: "C", booked: ["C1", "C2"] },
    ],
  },
  {
    key: "2",
    type: "Gold",
    price: 100,
    data: [
      { title: "D", booked: ["D2"] },
      { title: "E", booked: ["E4", "E8"] },
      { title: "F", booked: ["F1", "F2"] },
      { title: "G", booked: ["G3", "G4", "G5", "G6", "G7"] },
    ],
  },
  {
    key: "3",
    type: "Economy",
    price: 80,
    data: [
      { title: "H", booked: ["H2"] },
      { title: "I", booked: ["I4", "I8"] },
      { title: "J", booked: ["J1", "J2"] },
      { title: "K", booked: ["K1", "K2", "K5", "K6", "K7"] },
      { title: "L", booked: ["L1", "L7", "L8", "L9"] },
    ],
  },
];

const SeatsScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`seatsScreen:${key}`);
  }

  const allEyesThisWay = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <Image
          source={require("../../assets/images/screen.png")}
          style={styles.screenImgStyle}
        />
        <Text numberOfLines={1} style={styles.allEyesThisWayTextStyle}>
          {tr("allEyes")}
        </Text>
      </View>
    );
  };

  const [selectedSeats, setSelectedSeats] = useState(["F5", "F6"]);

  const toggleSeat = (rowTitle, seatNumber) => {
    const seatKey = `${rowTitle}${seatNumber}`;
    if (selectedSeats.includes(seatKey)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatKey));
    } else {
      setSelectedSeats([...selectedSeats, seatKey]);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedSeats.forEach((seatKey) => {
      const row = seatKey.charAt(0);

      const section = seatsList.find((sec) =>
        sec.data.some(
          (rowData) => rowData.title === row || rowData.booked.includes(seatKey)
        )
      );

      if (section) {
        totalPrice += section.price;
      }
    });
    return totalPrice;
  };
  const seatContainer = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {allEyesThisWay()}
        <View>
          {seatsList.map((section) => (
            <View
              key={section.key}
              style={{
                marginHorizontal: Default.fixPadding * 2,
                marginBottom: Default.fixPadding * 1.7,
              }}
            >
              <Text numberOfLines={1} style={styles.titleTextStyle}>
                {section.type}(${section.price})
              </Text>
              {section.data.map((row) => (
                <View key={row.title} style={styles.titleAndSeatMainView}>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.Bold16grey,
                      width: 30,
                    }}
                  >
                    {row.title}
                  </Text>
                  <View style={styles.listContainerStyle}>
                    {[...Array(9)].map((_, index) => {
                      const seatNumber = index + 1;
                      const seatKey = `${row.title}${seatNumber}`;
                      const isBooked = row.booked.includes(seatKey);
                      const isSelected = selectedSeats.includes(seatKey);
                      return (
                        <TouchableOpacity
                          key={seatKey}
                          disabled={isBooked}
                          onPress={() => toggleSeat(row.title, seatNumber)}
                          style={{
                            ...styles.seatView,
                            backgroundColor: isBooked
                              ? Colors.primary
                              : isSelected
                              ? Colors.white
                              : Colors.lightBlue,
                            marginRight:
                              index == 1 ? Default.fixPadding * 2 : 0,
                            marginLeft: index == 7 ? 20 : 0,
                          }}
                        />
                      );
                    })}
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  const bottomTotalAndButton = () => {
    return (
      <View
        style={{
          paddingHorizontal: Default.fixPadding * 2,
          backgroundColor: Colors.lightBlue,
        }}
      >
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            marginTop: Default.fixPadding * 2.8,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginRight: isRtl ? 0 : Default.fixPadding,
              marginLeft: isRtl ? Default.fixPadding : 0,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.Bold16white,
                maxWidth: 85,
              }}
            >
              {`${selectedSeats.length} ${tr("seat")} - `}
            </Text>
            <FlatList
              horizontal
              inverted={isRtl}
              keyExtractor={(_, index) => index}
              data={selectedSeats}
              renderItem={({ item, index }) => {
                return (
                  <Text
                    numberOfLines={1}
                    style={{
                      flex: 1,
                      ...Fonts.Bold16white,
                    }}
                  >
                    {isRtl ? null : index !== 0 && ","}
                    {item}
                    {isRtl ? index !== 0 && "," : null}
                  </Text>
                );
              }}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <Text
            numberOfLines={1}
            style={{ ...Fonts.Bold16white, maxWidth: 100 }}
          >
            ${calculateTotalPrice()}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.confirmTouchableStyle}
          onPress={() => navigation.push("bookTicket/bookTicketScreen")}
        >
          <Text numberOfLines={1} style={{ ...Fonts.ExtraBold18white }}>
            {tr("confirm")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
        <Header title={tr("selectSeats")} navigation={navigation} />
        {seatContainer()}
        {bottomTotalAndButton()}
      </View>
    </View>
  );
};

export default SeatsScreen;

const styles = StyleSheet.create({
  screenImgStyle: {
    resizeMode: "contain",
    height: 29,
    width: 291,
    marginTop: Default.fixPadding * 0.5,
  },
  allEyesThisWayTextStyle: {
    ...Fonts.Bold16white,
    marginTop: -Default.fixPadding,
    maxWidth: 150,
    marginBottom: Default.fixPadding * 4.5,
  },
  confirmTouchableStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.4,
    marginBottom: Default.fixPadding * 3,
    marginTop: Default.fixPadding,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    ...Default.shadow,
  },
  titleAndSeatMainView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Default.fixPadding * 1.3,
  },
  seatView: {
    margin: 5,
    width: 20,
    height: 20,
  },
  titleTextStyle: {
    ...Fonts.Bold16grey,
    textAlign: "center",
    marginBottom: Default.fixPadding * 1.2,
  },
  listContainerStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
