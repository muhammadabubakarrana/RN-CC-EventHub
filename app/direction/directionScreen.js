import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import { useNavigation } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "../../constants/key";

const DirectionScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`directionScreen:${key}`);
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

  const [coordinates] = useState([
    {
      latitude: 37.7117876,
      longitude: -122.4134812,
    },
    {
      latitude: 37.783707,
      longitude: -122.4721769,
    },
  ]);

  const mapView = () => {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.751707,
          longitude: -122.4353769,
          latitudeDelta: 0.16122,
          longitudeDelta: 0.16422,
        }}
      >
        <Marker coordinate={coordinates[0]}>
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
        <Marker coordinate={coordinates[1]}>
          <Image
            source={require("../../assets/images/img10.png")}
            style={styles.markerUserImageStyle}
          />
        </Marker>

        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey={GOOGLE_API_KEY}
          strokeWidth={3}
          strokeColor={Colors.lightBlue}
        />
      </MapView>
    );
  };

  const details = () => {
    return (
      <View style={styles.detailsViewStyle}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.boxStyle,
          }}
        >
          <Image
            source={require("../../assets/images/img10.png")}
            style={styles.detailImgStyle}
          />
          <View
            style={{
              flex: 1,
              alignItems: isRtl ? "flex-end" : "flex-start",
              marginHorizontal: Default.fixPadding,
            }}
          >
            <Text numberOfLines={1} style={{ ...Fonts.Bold16white }}>
              Musical night festival
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.SemiBold15grey,
                marginVertical: Default.fixPadding * 0.3,
              }}
            >
              Musical night festival
            </Text>
            <Text numberOfLines={1} style={{ ...Fonts.Medium14primary }}>
              2.5km away (20min)
            </Text>
          </View>
        </View>
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
        {details()}
      </View>
    </View>
  );
};

export default DirectionScreen;

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
    alignSelf: "center",
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Colors.periwinkleGray,
  },
  positionViewStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  markerUserImageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.white,
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
  detailsViewStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  boxStyle: {
    zIndex: 1,
    alignItems: "center",
    padding: Default.fixPadding,
    borderRadius: 10,
    backgroundColor: Colors.lightBlue,
    marginHorizontal: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 3,
  },
  detailImgStyle: {
    width: 74,
    height: 74,
    borderRadius: 5,
  },
});
