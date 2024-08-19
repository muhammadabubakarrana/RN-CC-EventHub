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
import SnackbarToast from "../../components/snackbarToast";
import { useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";

const EventNearYouScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`eventNearYouScreen:${key}`);
  }

  const [toastTitle, setToastTitle] = useState();
  const [visibleToast, setVisibleToast] = useState(false);
  const onDismissToast = () => setVisibleToast(false);

  const header = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.headerViewStyle,
        }}
      >
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Feather
            name={isRtl ? "arrow-right" : "arrow-left"}
            size={25}
            color={Colors.white}
          />
        </TouchableOpacity>
        <Text
          numberOfLines={1}
          style={{
            textAlign: isRtl ? "right" : "left",
            ...styles.titleTextStyle,
          }}
        >
          {tr("eventNearYou")}
        </Text>

        <Feather
          name="map"
          size={24}
          color={Colors.white}
          onPress={() => navigation.push("mapView/mapViewScreen")}
        />
      </View>
    );
  };

  const nearYouList = [
    {
      key: "1",
      image: require("../../assets/images/img6.png"),
      title: "Musical night festival",
      address: "City centre mall",
      date: "15 october 2022",
    },
    {
      key: "2",
      image: require("../../assets/images/img14.png"),
      title: "Backstreet boys event",
      address: "jogiyo expo center",
      date: "20 october 2022",
    },
    {
      key: "3",
      image: require("../../assets/images/img13.png"),
      title: "Austin city music festival",
      address: "Union square  museum",
      date: "25 october 2022",
    },
    {
      key: "4",
      image: require("../../assets/images/img3.png"),
      title: "Austin city music festival",
      address: "Union square  museum",
      date: "25 october 2022",
    },
    {
      key: "5",
      image: require("../../assets/images/img15.png"),
      title: "Austin city music festival",
      address: "Union square  museum",
      date: "25 october 2022",
    },
    {
      key: "6",
      image: require("../../assets/images/img8.png"),
      title: "Austin city music festival",
      address: "Union square  museum",
      date: "25 october 2022",
    },
    {
      key: "7",
      image: require("../../assets/images/img16.png"),
      title: "Austin city music festival",
      address: "Union square  museum",
      date: "25 october 2022",
    },
    {
      key: "8",
      image: require("../../assets/images/img8.png"),
      title: "Austin city music festival",
      address: "Union square  museum",
      date: "25 october 2022",
    },
    {
      key: "9",
      image: require("../../assets/images/img17.png"),
      title: "Austin city music festival",
      address: "Union square  museum",
      date: "25 october 2022",
    },
  ];

  const [selectedEventNearYou, setSelectedEventNearYou] = useState([]);

  const renderItem = ({ item }) => {
    const isSelected = selectedEventNearYou.includes(item.key);

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.push("detail/detailScreen", { image: item.image })
        }
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
            marginLeft: isRtl ? Default.fixPadding * 3.5 : Default.fixPadding,
            marginRight: isRtl ? Default.fixPadding : Default.fixPadding * 3.5,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.Bold16white }}>
            {item.title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold15grey,
              marginVertical: Default.fixPadding * 0.3,
            }}
          >
            {item.address}
          </Text>
          <Text numberOfLines={1} style={{ ...Fonts.Medium14primary }}>
            {item.date}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (isSelected) {
              setSelectedEventNearYou((prev) =>
                prev.filter((i) => i !== item.key)
              );
              setToastTitle(tr("remove"));
            } else {
              setSelectedEventNearYou((prev) => [...prev, item.key]);
              setToastTitle(tr("added"));
            }
            setVisibleToast(true);
          }}
          style={{
            right: isRtl ? null : 0,
            left: isRtl ? 0 : null,
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
      </TouchableOpacity>
    );
  };

  const nearYouFlatList = () => {
    return (
      <FlatList
        keyExtractor={(item) => item.key}
        data={nearYouList}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: Default.fixPadding * 0.5 }}
      />
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
        {header()}
        {nearYouFlatList()}
      </View>

      <SnackbarToast
        visible={visibleToast}
        title={toastTitle}
        onDismiss={onDismissToast}
      />
    </View>
  );
};

export default EventNearYouScreen;

const styles = StyleSheet.create({
  headerViewStyle: {
    alignItems: "center",
    paddingVertical: Default.fixPadding * 1.5,
    paddingHorizontal: Default.fixPadding * 2,
    backgroundColor: Colors.darkBlue,
  },
  titleTextStyle: {
    flex: 1,
    overflow: "hidden",
    marginHorizontal: Default.fixPadding,
    ...Fonts.Bold18white,
  },
  renderItemTouchableStyle: {
    alignItems: "center",
    padding: Default.fixPadding,
    marginHorizontal: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 1.5,
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    ...Default.shadowDarkBlue,
  },
  imageStyle: {
    width: 74,
    height: 74,
    borderRadius: 5,
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
    backgroundColor: Colors.darkToryBlue,
  },
});
