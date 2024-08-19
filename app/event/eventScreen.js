import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import SnackbarToast from "../../components/snackbarToast";
import { useNavigation, useLocalSearchParams } from "expo-router";
import Header from "../../components/header";
import { LinearGradient } from "expo-linear-gradient";

const EventScreen = () => {
  const { headerTitle } = useLocalSearchParams();
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`eventScreen:${key}`);
  }

  const [toastTitle, setToastTitle] = useState();
  const [visibleToast, setVisibleToast] = useState(false);
  const onDismissToast = () => setVisibleToast(false);

  const eventList = [
    {
      key: "1",
      image: require("../../assets/images/img2.png"),
      title: "Musical night festival",
      address: "City centre mall",
      date: "15 october 2022",
      price: "$125.00",
    },
    {
      key: "2",
      image: require("../../assets/images/img1.png"),
      title: "Friday night  music event",
      address: "White sands plaza",
      date: "15 october 2022",
      price: "$125.00",
    },
    {
      key: "3",
      image: require("../../assets/images/img4.png"),
      title: "Backstreet boys event",
      address: "Union square  museum",
      date: "20 october 2022",
      price: "$110.00",
    },
    {
      key: "4",
      image: require("../../assets/images/img18.png"),
      title: "Austin city music festival",
      address: "VIP plaza stedium",
      date: "15 november 2022",
      price: "$150.00",
    },
    {
      key: "5",
      image: require("../../assets/images/img19.png"),
      title: "Space them party mix",
      address: "Greenwich village",
      date: "15 November 2022",
      price: "$160.00",
    },
    {
      key: "6",
      image: require("../../assets/images/img20.png"),
      title: "John brother event",
      address: "City centre mall",
      date: "10 october 2022",
      price: "$130.00",
    },
  ];

  const [selectedUpcomingEvent, setSelectedUpcomingEvent] = useState([
    "1",
    "2",
    "3",
  ]);

  const renderItem = ({ item }) => {
    const isSelected = selectedUpcomingEvent.includes(item.key);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.push("detail/detailScreen", { image: item.image })
        }
        style={styles.upcomingEventTouchableStyle}
      >
        <ImageBackground
          source={item.image}
          style={styles.upcomingEventImgStyle}
        >
          <LinearGradient
            colors={["rgba(30, 30, 30, 0)", "rgba(30, 30, 30, 0.8)"]}
            style={{ flex: 1, justifyContent: "flex-end" }}
          >
            <TouchableOpacity
              onPress={() => {
                if (isSelected) {
                  setSelectedUpcomingEvent((prev) =>
                    prev.filter((i) => i !== item.key)
                  );
                  setToastTitle(tr("remove"));
                } else {
                  setSelectedUpcomingEvent((prev) => [...prev, item.key]);
                  setToastTitle(tr("added"));
                }
                setVisibleToast(true);
              }}
              style={{
                right: isRtl ? null : 0,
                alignSelf: isRtl ? "flex-start" : "flex-end",
                ...styles.heartTouchableStyle,
              }}
            >
              <Image
                source={
                  isSelected
                    ? require("../../assets/images/icons/heartWhite.png")
                    : require("../../assets/images/icons/heart.png")
                }
                style={{ width: 16, height: 16, resizeMode: "contain" }}
              />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
                marginHorizontal: Default.fixPadding,
                marginBottom: Default.fixPadding * 0.9,
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
                  {item.title}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.SemiBold15darkGrey,
                    marginVertical: Default.fixPadding * 0.3,
                  }}
                >
                  {item.address}
                </Text>
                <Text numberOfLines={1} style={{ ...Fonts.Medium14primary }}>
                  {item.date}
                </Text>
              </View>
              <Text
                numberOfLines={1}
                style={{ ...Fonts.Bold17white, maxWidth: 100 }}
              >
                {item.price}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const eventFlatList = () => {
    return (
      <FlatList
        data={eventList}
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
        <Header title={headerTitle} navigation={navigation} />
        {eventFlatList()}
      </View>

      <SnackbarToast
        visible={visibleToast}
        title={toastTitle}
        onDismiss={onDismissToast}
      />
    </View>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  upcomingEventImgStyle: {
    borderRadius: 10,
    height: 190,
    width: "100%",
  },
  upcomingEventTouchableStyle: {
    overflow: "hidden",
    borderRadius: 10,
    marginHorizontal: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 1.5,
  },
  heartTouchableStyle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 28,
    height: 28,
    borderRadius: 5,
    marginHorizontal: Default.fixPadding * 0.7,
    marginVertical: Default.fixPadding * 0.9,
    top: 0,
    backgroundColor: Colors.lightBlue,
  },
});
