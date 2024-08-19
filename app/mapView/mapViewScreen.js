import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import SnackbarToast from "../../components/snackbarToast";
import { useNavigation } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker } from "react-native-maps";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.9;

const MapViewScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`mapViewScreen:${key}`);
  }

  const header = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.headerViewStyle,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{ alignSelf: "flex-start" }}
        >
          <Feather
            name={isRtl ? "arrow-right" : "arrow-left"}
            size={25}
            color={Colors.white}
          />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            alignItems: isRtl ? "flex-end" : "flex-start",
            marginHorizontal: Default.fixPadding,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.Bold18white }}>
            {tr("eventNearYou")}
          </Text>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginTop: Default.fixPadding * 0.4,
            }}
          >
            <Ionicons name="location-sharp" size={15} color={Colors.grey} />
            <Text numberOfLines={1} style={styles.locationTextStyle}>
              New York, USA
            </Text>
            <Feather name="chevron-down" size={20} color={Colors.grey} />
          </View>
        </View>

        <Image
          source={require("../../assets/images/users/profile.png")}
          style={styles.profileImgStyle}
        />
      </View>
    );
  };

  const eventNearYouList = [
    {
      key: "1",
      image: require("../../assets/images/img2.png"),
      title: "Musical night festival",
      address: "City centre mall",
      date: "15 october 2022",
      price: "$125.00",
      coordinate: {
        latitude: 22.6393867,
        longitude: 88.4354486,
      },
    },
    {
      key: "2",
      image: require("../../assets/images/img19.png"),
      title: "Friday night  music event",
      address: "White sands plaza",
      date: "15 october 2022",
      price: "$125.00",
      coordinate: {
        latitude: 22.6345648,
        longitude: 88.4477279,
      },
    },
    {
      key: "3",
      image: require("../../assets/images/img4.png"),
      title: "Backstreet boys event",
      address: "Union square  museum",
      date: "20 october 2022",
      price: "$110.00",
      coordinate: {
        latitude: 22.6281662,
        longitude: 88.4410113,
      },
    },
    {
      key: "4",
      image: require("../../assets/images/img18.png"),
      title: "Austin city music festival",
      address: "VIP plaza stedium",
      date: "15 november 2022",
      price: "$150.00",
      coordinate: {
        latitude: 22.6293867,
        longitude: 88.4254486,
      },
    },
    {
      key: "5",
      image: require("../../assets/images/img20.png"),
      title: "Space them party mix",
      address: "Greenwich village",
      date: "15 November 2022",
      price: "$160.00",
      coordinate: {
        latitude: 22.6145648,
        longitude: 88.4377279,
      },
    },
  ];

  const initialMapData = {
    latitude: 22.62938671242907,
    longitude: 88.4354486029795,
    latitudeDelta: 0.03864195044303443,
    longitudeDelta: 0.030142817690068,
  };

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= eventNearYouList.length) {
        index = eventNearYouList.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = eventNearYouList[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: initialMapData.latitudeDelta,
              longitudeDelta: initialMapData.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = eventNearYouList.map((_, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.6, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;
    let x = markerID * CARD_WIDTH + markerID * 15;
    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  const _map = useRef(null);
  const _scrollView = useRef(null);

  const [toastTitle, setToastTitle] = useState();
  const [visibleToast, setVisibleToast] = useState(false);
  const onDismissToast = () => setVisibleToast(false);

  const [selectedUpcomingEvent, setSelectedUpcomingEvent] = useState([
    "3",
    "4",
    "5",
  ]);

  const mapView = () => {
    return (
      <MapView ref={_map} initialRegion={initialMapData} style={{ flex: 1 }}>
        <Marker
          coordinate={{
            latitude: 22.62938671242907,
            longitude: 88.4354486029795,
          }}
        >
          <View style={styles.mainCircleStyle}>
            <View style={styles.subCircleStyle}>
              <View style={styles.blueCircle}>
                <Image
                  source={require("../../assets/images/icons/direction.png")}
                  style={{ width: 20, height: 20, resizeMode: "contain" }}
                />
              </View>
            </View>
          </View>
        </Marker>
        {eventNearYouList.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              onPress={(e) => onMarkerPress(e)}
            >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  resizeMode="contain"
                  source={require("../../assets/images/icons/marker.png")}
                  style={[styles.marker, scaleStyle]}
                />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>
    );
  };

  const bottomNearYouList = () => {
    return (
      <View
        style={{
          bottom: 0,
          position: "absolute",
        }}
      >
        <Animated.ScrollView
          horizontal
          pagingEnabled
          ref={_scrollView}
          scrollEventThrottle={1}
          snapToAlignment="center"
          decelerationRate={"fast"}
          snapToInterval={CARD_WIDTH + 18}
          style={{ zIndex: 1 }}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  },
                },
              },
            ],
            { useNativeDriver: false }
          )}
        >
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            {eventNearYouList.map((item, index) => {
              const isSelected = selectedUpcomingEvent.includes(item.key);

              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.9}
                  onPress={() =>
                    navigation.push("detail/detailScreen", {
                      image: item.image,
                    })
                  }
                  style={styles.nearYouEventTouchableStyle}
                >
                  <ImageBackground
                    source={item.image}
                    style={styles.nearYouEventImgStyle}
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
                            setSelectedUpcomingEvent((prev) => [
                              ...prev,
                              item.key,
                            ]);
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
                          style={{
                            width: 16,
                            height: 16,
                            resizeMode: "contain",
                          }}
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
                          <Text
                            numberOfLines={1}
                            style={{ ...Fonts.Bold16white }}
                          >
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
                          <Text
                            numberOfLines={1}
                            style={{ ...Fonts.Medium14primary }}
                          >
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
            })}
          </View>
        </Animated.ScrollView>
        {linearGradientBottom()}
      </View>
    );
  };

  const linearGradientBottom = () => {
    return (
      <View style={styles.positionViewStyle}>
        <LinearGradient
          colors={[
            Colors.transparentWhite,
            Colors.transparentWhite,
            "rgba(34, 57, 73, 0.5)",
          ]}
          style={{ flex: 1 }}
        />
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {mapView()}
        {bottomNearYouList()}
      </View>
      <SnackbarToast
        visible={visibleToast}
        title={toastTitle}
        onDismiss={onDismissToast}
        style={{ zIndex: 1 }}
      />
    </View>
  );
};

export default MapViewScreen;

const styles = StyleSheet.create({
  headerViewStyle: {
    padding: Default.fixPadding * 2,
    backgroundColor: Colors.darkBlue,
  },
  locationTextStyle: {
    ...Fonts.SemiBold14grey,
    marginHorizontal: Default.fixPadding * 0.4,
    maxWidth: 200,
  },
  profileImgStyle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Colors.periwinkleGray,
    alignSelf: "center",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 35,
  },
  marker: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  nearYouEventImgStyle: {
    borderRadius: 10,
    height: 190,
    width: CARD_WIDTH,
  },
  nearYouEventTouchableStyle: {
    overflow: "hidden",
    borderRadius: 10,
    marginHorizontal: Default.fixPadding * 0.5,
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 3,
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
  mainCircleStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "rgba(34, 57, 73, 0.2)",
  },
  subCircleStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(34, 57, 73, 0.5)",
  },
  blueCircle: {
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: Colors.lightBlue,
  },
  positionViewStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});
