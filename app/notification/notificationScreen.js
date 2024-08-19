import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  Animated,
} from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import SnackbarToast from "../../components/snackbarToast";
import { useNavigation } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import Header from "../../components/header";

const NotificationScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`notificationScreen:${key}`);
  }

  const [removeNotificationToast, setRemoveNotificationToast] = useState(false);
  const onDismiss = () => setRemoveNotificationToast(false);

  const notificationList = [
    {
      key: "1",
      name: "Ticket booked",
      other:
        "Congratulation! Your music night event ticket successfully booked",
      time: "2min ago",
    },
    {
      key: "2",
      name: "New trending event",
      other:
        "Check out new *backstreet boys event* in your area. Sunday 5 April ",
      time: "5min ago",
    },
    {
      key: "3",
      name: "Ticket booked",
      other:
        "Congratulation! Your music night Event ticket successfully booked",
      time: "1hr ago",
    },
    {
      key: "4",
      name: "Live Concert",
      other: "Lorem ipsum dolor amet consectetur Nunc mdictumst pharetra at.",
      time: "1hr ago",
    },
  ];

  const rowTranslateAnimatedValues = {};
  notificationList.forEach((_, i) => {
    rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
  });

  const [notification, setNotification] = useState(
    notificationList.map((notification, i) => ({
      key: `${i}`,
      name: notification.name,
      other: notification.other,
      time: notification.time,
    }))
  );
  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    if (
      value < -Dimensions.get("window").width ||
      value > Dimensions.get("window").width
    ) {
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...notification];
        const prevIndex = notification.findIndex((item) => item.key === key);
        newData.splice(prevIndex, 1);
        setNotification(newData);
        setRemoveNotificationToast(true);
      });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: Colors.darkBlue }}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.renderItemStyle,
          }}
        >
          <View style={styles.bellViewStyle}>
            <FontAwesome6 name="bell" size={22} color={Colors.primary} />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: isRtl ? "flex-end" : "flex-start",
              marginLeft: isRtl ? 0 : Default.fixPadding * 1.8,
              marginRight: isRtl ? Default.fixPadding * 1.8 : 0,
            }}
          >
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
                  marginRight: isRtl ? 0 : Default.fixPadding * 0.5,
                  marginLeft: isRtl ? Default.fixPadding * 0.5 : 0,
                  ...Fonts.Bold16white,
                }}
              >
                {item.name}
              </Text>
              <Text
                numberOfLines={1}
                style={{ ...Fonts.SemiBold14grey, maxWidth: 100 }}
              >
                {item.time}
              </Text>
            </View>
            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.SemiBold14grey,
                marginTop: Default.fixPadding * 0.3,
              }}
            >
              {item.other}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderHiddenItem = () => (
    <View style={styles.renderHiddenItemViewStyle} />
  );

  const emptyNotification = () => {
    return (
      <View style={styles.emptyNotificationViewStyle}>
        <Image
          source={require("../../assets/images/emptyNo.png")}
          style={{ width: 73, height: 78, resizeMode: "contain" }}
        />
        <Text style={styles.noNotificationTextStyle}>
          {tr("noNotificationYet")}
        </Text>
      </View>
    );
  };

  const notificationSwipeView = () => {
    return (
      <SwipeListView
        data={notification}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
        showsVerticalScrollIndicator={false}
        rightOpenValue={-Dimensions.get("window").width}
        leftOpenValue={Dimensions.get("window").width}
        contentContainerStyle={{ paddingTop: Default.fixPadding * 0.5 }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
        <Header title={tr("notification")} navigation={navigation} />
        {notification.length === 0
          ? emptyNotification()
          : notificationSwipeView()}
      </View>
      <SnackbarToast
        title={tr("removed")}
        visible={removeNotificationToast}
        onDismiss={onDismiss}
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  emptyNotificationViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Default.fixPadding * 2,
  },
  noNotificationTextStyle: {
    marginTop: Default.fixPadding,
    ...Fonts.SemiBold16grey,
  },
  renderHiddenItemViewStyle: {
    flex: 1,
    marginBottom: Default.fixPadding * 1.5,
    backgroundColor: Colors.red,
  },
  renderItemStyle: {
    alignItems: "center",
    paddingHorizontal: Default.fixPadding * 1.1,
    paddingVertical: Default.fixPadding * 0.8,
    marginHorizontal: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 1.5,
    borderRadius: 10,
    backgroundColor: Colors.lightBlue,
  },
  bellViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
});
