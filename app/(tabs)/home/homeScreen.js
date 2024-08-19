import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
} from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import SnackbarToast from "../../../components/snackbarToast";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`homeScreen:${key}`);
  }

  const [toastTitle, setToastTitle] = useState();
  const [visibleToast, setVisibleToast] = useState(false);
  const onDismissToast = () => setVisibleToast(false);

  const header = () => {
    return (
      <View style={styles.headerViewStyle}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/images/users/profile.png")}
            style={styles.profileImgStyle}
          />
          <View
            style={{
              flex: 1,
              alignItems: isRtl ? "flex-end" : "flex-start",
              marginHorizontal: Default.fixPadding,
            }}
          >
            <Text numberOfLines={1} style={{ ...Fonts.SemiBold16white }}>
              {tr("lets")}
            </Text>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
                marginTop: Default.fixPadding * 0.3,
              }}
            >
              <Ionicons name="location-sharp" size={15} color={Colors.grey} />
              <Text numberOfLines={1} style={styles.locationTextStyle}>
                New York, USA
              </Text>
              <Feather name="chevron-down" size={20} color={Colors.grey} />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.push("notification/notificationScreen")}
          >
            <FontAwesome6 name="bell" color={Colors.white} size={22} />
            <View
              style={{
                right: isRtl ? null : 2,
                left: isRtl ? 2 : null,
                ...styles.primaryDotStyle,
              }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.push("search/searchScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.searchTouchableStyle,
          }}
        >
          <Feather name="search" size={18} color={Colors.grey} />
          <Text
            numberOfLines={1}
            style={{
              textAlign: isRtl ? "right" : "left",
              ...styles.searchTextStyle,
            }}
          >
            {tr("search")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const upcomingEventList = [
    {
      key: "1",
      image: require("../../../assets/images/img1.png"),
      title: "Musical night festival",
      address: "City centre mall",
      date: "15 October 2022",
      price: "$125.00",
    },
    {
      key: "2",
      image: require("../../../assets/images/img2.png"),
      title: "Backstreet boys event",
      address: "Backstreet boys event",
      date: "18 October 2022",
      price: "$225.00",
    },
    {
      key: "3",
      image: require("../../../assets/images/img3.png"),
      title: "Austin city education event",
      address: "VIP plaza stadium",
      date: "15 November 2022",
      price: "$150.00",
    },
    {
      key: "4",
      image: require("../../../assets/images/img4.png"),
      title: "John brother event",
      address: "Union square  museum",
      date: "20 October 2022",
      price: "$110.00",
    },
    {
      key: "5",
      image: require("../../../assets/images/img5.png"),
      title: "Space them party mix",
      address: "Greenwich village",
      date: "15 November 2022",
      price: "$160.00",
    },
  ];

  const [selectedUpcomingEvent, setSelectedUpcomingEvent] = useState([
    "3",
    "4",
    "5",
  ]);

  const renderItemUpcomingEvent = ({ item }) => {
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
                top: 0,
                backgroundColor: Colors.lightBlue,
                alignSelf: isRtl ? "flex-start" : "flex-end",
                ...styles.heartTouchableStyle,
              }}
            >
              <Image
                source={
                  isSelected
                    ? require("../../../assets/images/icons/heartWhite.png")
                    : require("../../../assets/images/icons/heart.png")
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

  const upcomingEventListAndTitle = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.upcomingWrapperStyle,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              textAlign: isRtl ? "right" : "left",
              marginRight: isRtl ? 0 : Default.fixPadding,
              marginLeft: isRtl ? Default.fixPadding : 0,
              ...Fonts.Bold18white,
            }}
          >
            {tr("upcomingEvent")}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.push("event/eventScreen", {
                headerTitle: tr("upcomingEvent"),
              })
            }
          >
            <Text
              numberOfLines={1}
              style={{ maxWidth: 100, ...Fonts.Bold14primary }}
            >
              {tr("viewAll")}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          inverted={isRtl}
          data={upcomingEventList}
          keyExtractor={(item) => item.key}
          renderItem={renderItemUpcomingEvent}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: Default.fixPadding * 1.5,
          }}
        />
      </View>
    );
  };

  const categoryList = [
    {
      key: "1",
      image: require("../../../assets/images/category1.png"),
      name: "Sports",
    },
    {
      key: "2",
      image: require("../../../assets/images/category2.png"),
      name: "Music",
    },
    {
      key: "3",
      image: require("../../../assets/images/category3.png"),
      name: "Dance",
    },
    {
      key: "4",
      image: require("../../../assets/images/category4.png"),
      name: "Movie",
    },
    {
      key: "5",
      image: require("../../../assets/images/category5.png"),
      name: "Art",
    },
    {
      key: "6",
      image: require("../../../assets/images/category6.png"),
      name: "Food",
    },
  ];

  const renderItemCategory = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.push("event/eventScreen", {
            headerTitle: `${item.name} ${tr("event")}`,
          })
        }
        style={styles.renderItemCategoryStyle}
      >
        <Image
          source={item.image}
          style={{ resizeMode: "contain", width: 28, height: 28 }}
        />
        <Text
          numberOfLines={1}
          style={{ ...Fonts.Bold16white, marginTop: Default.fixPadding * 0.5 }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const category = () => {
    return (
      <FlatList
        horizontal
        inverted={isRtl}
        data={categoryList}
        keyExtractor={(item) => item.key}
        renderItem={renderItemCategory}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: Default.fixPadding }}
      />
    );
  };

  const eventNearYouList = [
    {
      key: "1",
      image: require("../../../assets/images/img6.png"),
      title: "Musical night festival",
      address: "City centre mall",
      date: "15 october 2022",
    },
    {
      key: "2",
      image: require("../../../assets/images/img7.png"),
      title: "Backstreet boys event",
      address: "jogiyo expo center",
      date: "20 october 2022",
    },
    {
      key: "3",
      image: require("../../../assets/images/img8.png"),
      title: "Austin city music festival",
      address: "Union square  museum",
      date: "25 october 2022",
    },
  ];

  const [selectedEventNearYou, setSelectedEventNearYou] = useState(["3"]);

  const eventNearYouListAndTitle = () => {
    return (
      <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              textAlign: isRtl ? "right" : "left",
              marginRight: isRtl ? 0 : Default.fixPadding,
              marginLeft: isRtl ? Default.fixPadding : 0,
              ...Fonts.Bold18white,
            }}
          >
            {tr("eventNearYou")}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.push("eventNearYou/eventNearYouScreen")}
          >
            <Text
              numberOfLines={1}
              style={{ maxWidth: 100, ...Fonts.Bold14primary }}
            >
              {tr("viewAll")}
            </Text>
          </TouchableOpacity>
        </View>

        {eventNearYouList.map((item, index) => {
          const isSelected = selectedEventNearYou.includes(item.key);

          return (
            <TouchableOpacity
              key={item.key}
              onPress={() =>
                navigation.push("detail/detailScreen", { image: item.image })
              }
              style={{
                marginTop: index === 0 ? Default.fixPadding : 0,
                flexDirection: isRtl ? "row-reverse" : "row",
                ...styles.eventNearYouTouchableStyle,
              }}
            >
              <Image
                source={item.image}
                style={{ width: 74, height: 74, borderRadius: 5 }}
              />
              <View
                style={{
                  flex: 1,
                  alignItems: isRtl ? "flex-end" : "flex-start",
                  marginLeft: isRtl
                    ? Default.fixPadding * 3.5
                    : Default.fixPadding,
                  marginRight: isRtl
                    ? Default.fixPadding
                    : Default.fixPadding * 3.5,
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
                  backgroundColor: Colors.darkToryBlue,
                  ...styles.heartTouchableStyle,
                }}
              >
                <Image
                  source={
                    isSelected
                      ? require("../../../assets/images/icons/heartWhite.png")
                      : require("../../../assets/images/icons/heart.png")
                  }
                  style={{ width: 16, height: 16, resizeMode: "contain" }}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const popularEventList = [
    {
      key: "1",
      image: require("../../../assets/images/img9.png"),
      name: "Amelie Lens",
      date: "21 september, 2022",
    },
    {
      key: "2",
      image: require("../../../assets/images/img10.png"),
      name: "Johan brother",
      date: "21 september, 2022",
    },
    {
      key: "3",
      image: require("../../../assets/images/img11.png"),
      name: "Exit Festival",
      date: "27-29 october, 2022",
    },
    {
      key: "4",
      image: require("../../../assets/images/img12.png"),
      name: "Eduction event",
      date: "21 september, 2022",
    },
  ];

  const [selectedPopularEvent, setSelectedPopularEvent] = useState(["3"]);

  const renderItemPopularEvent = ({ item }) => {
    const isSelected = selectedPopularEvent.includes(item.key);

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.push("detail/detailScreen", { image: item.image })
        }
        style={styles.renderItemPopularEventTouchableStyle}
      >
        <ImageBackground source={item.image} style={styles.popularImageStyle}>
          <LinearGradient
            colors={["rgba(30, 30, 30, 0)", "rgba(30, 30, 30, 0.9)"]}
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: isRtl ? "flex-end" : "flex-start",
              paddingHorizontal: Default.fixPadding * 1.6,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.Bold16white,
                marginBottom: Default.fixPadding * 0.2,
              }}
            >
              {item.name}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.Medium12grey,
                marginBottom: Default.fixPadding * 1.2,
              }}
            >
              {item.date}
            </Text>

            <TouchableOpacity
              onPress={() => {
                if (isSelected) {
                  setSelectedPopularEvent((prev) =>
                    prev.filter((i) => i !== item.key)
                  );
                  setToastTitle(tr("remove"));
                } else {
                  setSelectedPopularEvent((prev) => [...prev, item.key]);
                  setToastTitle(tr("added"));
                }
                setVisibleToast(true);
              }}
              style={{
                right: isRtl ? null : 0,
                left: isRtl ? 0 : null,
                top: 0,
                backgroundColor: Colors.darkToryBlue,
                ...styles.heartTouchableStyle,
              }}
            >
              <Image
                source={
                  isSelected
                    ? require("../../../assets/images/icons/heartWhite.png")
                    : require("../../../assets/images/icons/heart.png")
                }
                style={{ width: 16, height: 16, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  const popularEventListAndTitle = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              textAlign: isRtl ? "right" : "left",
              marginRight: isRtl ? 0 : Default.fixPadding,
              marginLeft: isRtl ? Default.fixPadding : 0,
              ...Fonts.Bold18white,
            }}
          >
            {tr("popularEvent")}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.push("event/eventScreen", {
                headerTitle: tr("popularEvent"),
              })
            }
          >
            <Text
              numberOfLines={1}
              style={{ maxWidth: 100, ...Fonts.Bold14primary }}
            >
              {tr("viewAll")}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          inverted={isRtl}
          data={popularEventList}
          keyExtractor={(item) => item.key}
          renderItem={renderItemPopularEvent}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: Default.fixPadding }}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {upcomingEventListAndTitle()}
          {category()}
          {eventNearYouListAndTitle()}
          {popularEventListAndTitle()}
        </ScrollView>
      </View>
      <SnackbarToast
        visible={visibleToast}
        title={toastTitle}
        onDismiss={onDismissToast}
        style={styles.toastStyle}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  toastStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 60,
  },
  headerViewStyle: {
    marginHorizontal: Default.fixPadding * 2,
    marginTop: Default.fixPadding * 2,
    marginBottom: Default.fixPadding,
  },
  profileImgStyle: {
    borderWidth: 1,
    borderColor: Colors.periwinkleGray,
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  locationTextStyle: {
    ...Fonts.SemiBold14grey,
    marginHorizontal: Default.fixPadding * 0.4,
    maxWidth: 200,
  },
  primaryDotStyle: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  searchTouchableStyle: {
    alignItems: "center",
    marginTop: Default.fixPadding * 1.6,
    paddingVertical: Default.fixPadding * 1.2,
    paddingHorizontal: Default.fixPadding * 0.9,
    borderRadius: 10,
    backgroundColor: Colors.lightBlue,
  },
  searchTextStyle: {
    flex: 1,
    ...Fonts.Bold16grey,
    marginHorizontal: Default.fixPadding,
  },
  upcomingWrapperStyle: {
    alignItems: "center",
    marginHorizontal: Default.fixPadding * 2,
    marginTop: Default.fixPadding,
  },
  upcomingEventImgStyle: {
    borderRadius: 10,
    height: 190,
    width: width * 0.9,
  },
  upcomingEventTouchableStyle: {
    overflow: "hidden",
    borderRadius: 10,
    marginHorizontal: Default.fixPadding * 0.5,
    marginTop: Default.fixPadding,
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
  },
  renderItemCategoryStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    marginHorizontal: Default.fixPadding,
    paddingVertical: Default.fixPadding * 1.1,
    paddingHorizontal: Default.fixPadding * 0.5,
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 2.5,
    borderColor: Colors.blueDianne,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: Colors.lightBlue,
    ...Default.shadowDarkBlue,
  },
  eventNearYouTouchableStyle: {
    alignItems: "center",
    marginBottom: Default.fixPadding * 1.5,
    padding: Default.fixPadding,
    borderRadius: 10,
    backgroundColor: Colors.lightBlue,
    ...Default.shadowBlack,
  },
  popularImageStyle: {
    width: 161,
    height: 215,
    borderRadius: 10,
  },
  renderItemPopularEventTouchableStyle: {
    overflow: "hidden",
    borderRadius: 10,
    marginHorizontal: Default.fixPadding,
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 8.5,
  },
});
