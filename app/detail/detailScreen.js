import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Share,
  Platform,
  FlatList,
  Dimensions,
} from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import SnackbarToast from "../../components/snackbarToast";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import CollapsibleToolbar from "react-native-collapsible-toolbar";
import { LinearGradient } from "expo-linear-gradient";
import CommonButton from "../../components/commonButton";

const { width } = Dimensions.get("window");

const DetailScreen = () => {
  const navigation = useNavigation();

  const { image } = useLocalSearchParams();
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`detailScreen:${key}`);
  }

  const [readMore, setReadMore] = useState(true);

  const [toastTitle, setToastTitle] = useState();
  const [visibleToast, setVisibleToast] = useState(false);
  const onDismissToast = () => setVisibleToast(false);

  const [favorite, setFavorite] = useState(true);

  const shareMessage = () => {
    Share.share({
      message: "EVENTHUB",
    });
  };

  const eventDetail = () => {
    return (
      <View style={{ marginBottom: Default.fixPadding * 1.5 }}>
        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.Bold16white,
            marginBottom: Default.fixPadding * 0.8,
          }}
        >
          {tr("eventDetail")}
        </Text>
        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.SemiBold14grey,
          }}
        >
          {readMore
            ? `Lorem ipsum dolor sit amet consectetur. Nunc mdictumst pharetra at. Dui quis mattis ultrices et id eget arcuongue. ipsum in egestas vitae amet. Nec quiacinia aliquet nibh. Impcvx cerdiet evcvu amet consectetur at ac orci enim turpis leo. In facilisis adipiscing a metusvretium erat eget neque laoreet. Eros id tincidunt`
            : `Lorem ipsum dolor sit amet consectetur. Nunc mdictumst pharetra at. Dui quis mattis ultrices et id eget arcuongue. Leo hendrerit ipsum in egestas vitae amet. Nec quiacinia aliquet nibh. Impcvxc cerdiet evcvu amet consectetur at ac orci enim turpis leo. In facilisis adipiscing a metusvretium erat eget neque laoreet. Eros id tincidunt t pharetra at. Dui quis mattis ultrices et id eget arcuongue. Leo hendrerit ipsum in egestas vitae amet. Nec quiacinia aliquet nibh. Impcvx cerdiet evcvu amet consectetur at ac orci enim turpis leo. In facilisis adipiscing a metusvretium erat eget neque laoreet. Eros id tincidunt`}
          <Text
            onPress={() => setReadMore((prev) => !prev)}
            style={{ ...Fonts.SemiBold14primary }}
          >
            {readMore ? ` ${tr("readMore")}` : ` ${tr("readLess")}`}
          </Text>
        </Text>
      </View>
    );
  };

  const data = [
    require("../../assets/images/users/user1.png"),
    require("../../assets/images/users/user2.png"),
    require("../../assets/images/users/user3.png"),
    require("../../assets/images/users/user4.png"),
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          marginLeft: isRtl ? 0 : index === 0 ? 0 : -Default.fixPadding * 1.5,
          marginRight: isRtl
            ? index === 0
              ? 0
              : -Default.fixPadding * 1.5
            : 0,
        }}
      >
        <Image source={item} style={styles.imageCircleStyle} />
      </View>
    );
  };

  const ticketSold = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          marginBottom: Default.fixPadding * 2,
        }}
      >
        <View
          style={{
            maxWidth: width / 2,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <FlatList
            horizontal
            inverted={isRtl}
            data={data}
            renderItem={renderItem}
            keyExtractor={(_, index) => index}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Text numberOfLines={1} style={{ ...Fonts.Bold16grey, maxWidth: 150 }}>
          +1400 {tr("ticketSold")}
        </Text>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View style={{ marginTop: -Default.fixPadding * 3 }}>
        <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginBottom: Default.fixPadding * 2.5,
            }}
          >
            <View
              style={{ flex: 1, alignItems: isRtl ? "flex-end" : "flex-start" }}
            >
              <Text numberOfLines={1} style={{ ...Fonts.Bold20white }}>
                Jisoblack Pink Live Concert
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.Bold16primary,
                  marginVertical: Default.fixPadding * 0.8,
                }}
              >
                $200.00/person
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.Bold14grey,
                }}
              >
                Music concert
              </Text>
            </View>
            <Feather
              name="map"
              size={22}
              color={Colors.primary}
              onPress={() => navigation.push("direction/directionScreen")}
            />
          </View>

          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginBottom: Default.fixPadding * 2,
            }}
          >
            <View style={styles.commonViewStyle}>
              <AntDesign name="calendar" size={20} color={Colors.primary} />
            </View>

            <View
              style={{
                flex: 1,
                alignItems: isRtl ? "flex-end" : "flex-start",
                marginHorizontal: Default.fixPadding * 1.2,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold16white,
                  marginBottom: Default.fixPadding * 0.3,
                }}
              >
                22 June 2022
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold14grey,
                  marginBottom: Default.fixPadding * 0.3,
                }}
              >
                Sunday, 8:00PM-12:00PM
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginBottom: Default.fixPadding * 2,
            }}
          >
            <View style={styles.commonViewStyle}>
              <Feather name="map-pin" size={20} color={Colors.primary} />
            </View>

            <View
              style={{
                flex: 1,
                alignItems: isRtl ? "flex-end" : "flex-start",
                marginHorizontal: Default.fixPadding * 1.2,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold16white,
                  marginBottom: Default.fixPadding * 0.3,
                }}
              >
                jogiyo expo center
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold14grey,
                  marginBottom: Default.fixPadding * 0.3,
                }}
              >
                2464 Royal Ln. Mesa, New Jersey 45463
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginBottom: Default.fixPadding * 2,
            }}
          >
            <View style={styles.commonViewStyle}>
              <Image
                source={require("../../assets/images/users/user1.png")}
                style={styles.userImgStyle}
              />
            </View>

            <View
              style={{
                flex: 1,
                alignItems: isRtl ? "flex-end" : "flex-start",
                marginHorizontal: Default.fixPadding * 1.2,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold16white,
                  marginBottom: Default.fixPadding * 0.3,
                }}
              >
                Eleanor Pena
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold14grey,
                  marginBottom: Default.fixPadding * 0.3,
                }}
              >
                Organizer
              </Text>
            </View>
          </View>

          {eventDetail()}
        </View>
        {ticketSold()}
      </View>
    );
  };

  const renderNavBar = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          paddingVertical:
            Platform.OS === "android" ? Default.fixPadding * 1.5 : 0,
          ...styles.renderNavBarViewStyle,
        }}
      >
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Feather
            name={isRtl ? "arrow-right" : "arrow-left"}
            size={25}
            color={Colors.white}
          />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={shareMessage}
            style={{
              ...styles.shareAndLikeTouchableStyle,
              marginRight: isRtl ? 0 : Default.fixPadding,
              marginLeft: isRtl ? Default.fixPadding : 0,
            }}
          >
            <Ionicons
              name="share-social-outline"
              size={16}
              color={Colors.white}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.shareAndLikeTouchableStyle }}
            onPress={() => {
              setFavorite((prev) => !prev);
              if (favorite) {
                setToastTitle(tr("remove"));
              } else {
                setToastTitle(tr("added"));
              }
              setVisibleToast(true);
            }}
          >
            <Image
              source={
                favorite
                  ? require("../../assets/images/icons/heartWhite.png")
                  : require("../../assets/images/icons/heart.png")
              }
              style={{ width: 16, height: 16, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderToolBar = () => {
    return (
      <ImageBackground source={image} style={{ width: "100%", height: 316 }}>
        <LinearGradient
          colors={["rgba(17, 43, 61, 0)", "rgba(17, 43, 61, 1)"]}
          style={{ flex: 1 }}
        />
      </ImageBackground>
    );
  };

  const collapsibleToolbar = () => {
    return (
      <CollapsibleToolbar
        renderContent={renderContent}
        renderNavBar={renderNavBar}
        renderToolBar={renderToolBar}
        collapsedNavBarBackgroundColor={Colors.darkBlue}
        toolBarHeight={310}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
        {collapsibleToolbar()}
        <CommonButton
          title={tr("buyTicket")}
          onPress={() => navigation.push("seats/seatsScreen")}
        />
      </View>

      <SnackbarToast
        visible={visibleToast}
        title={toastTitle}
        onDismiss={onDismissToast}
      />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  commonViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: Colors.lightBlue,
  },
  userImgStyle: {
    width: 31,
    height: 31,
  },
  shareAndLikeTouchableStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(14, 42, 61, 0.6)",
  },
  renderNavBarViewStyle: {
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: Default.fixPadding * 2,
  },
  imageCircleStyle: {
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.lightBlue,
  },
});
