import React, { useCallback, useState } from "react";
import { Tabs } from "expo-router";
import { View, Text, StyleSheet, BackHandler, Platform } from "react-native";
import { Fonts, Colors, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import SnackbarToast from "../../components/snackbarToast";
import { BlurView } from "expo-blur";

const Layout = () => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`layout:${key}`);
  }
  const [visibleToast, setVisibleToast] = useState(false);
  const onDismissVisibleToast = () => setVisibleToast(false);

  const [exitApp, setExitApp] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (Platform.OS === "android") {
          setTimeout(() => {
            setExitApp(0);
          }, 2000);

          if (exitApp === 0) {
            setExitApp(exitApp + 1);
            setVisibleToast(true);
          } else if (exitApp === 1) {
            BackHandler.exitApp();
          }
          return true;
        }
      };
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
      };
    }, [exitApp])
  );

  const bottomTab = () => {
    return (
      <Tabs
        initialRouteName="home/homeScreen"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarItemStyle: {
            height: 65,
          },
          tabBarBackground: () => (
            <BlurView
              intensity={60}
              tint="dark"
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor:
                  Platform.OS === "ios"
                    ? Colors.transparent
                    : "rgba(17, 43, 61, 0.6)",
              }}
            />
          ),

          tabBarIcon: ({ focused }) => {
            if (route.name === "home/homeScreen") {
              return (
                <View style={styles.commonViewStyle}>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Octicons
                      size={20}
                      name="home"
                      color={focused ? Colors.white : Colors.whiteOpacity40}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        ...(focused
                          ? Fonts.SemiBold15white
                          : Fonts.SemiBold15whiteOpacity40),
                        ...styles.textStyle,
                      }}
                    >
                      {tr("home")}
                    </Text>
                  </View>
                </View>
              );
            } else if (route.name === "categories/categoriesScreen") {
              return (
                <View style={styles.commonViewStyle}>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Ionicons
                      size={20}
                      name="grid-outline"
                      color={focused ? Colors.white : Colors.whiteOpacity40}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        ...(focused
                          ? Fonts.SemiBold15white
                          : Fonts.SemiBold15whiteOpacity40),
                        ...styles.textStyle,
                      }}
                    >
                      {tr("categories")}
                    </Text>
                  </View>
                </View>
              );
            } else if (route.name === "myTickets/myTicketsScreen") {
              return (
                <View style={styles.commonViewStyle}>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <MaterialCommunityIcons
                      size={21}
                      name="ticket-confirmation-outline"
                      color={focused ? Colors.white : Colors.whiteOpacity40}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        ...(focused
                          ? Fonts.SemiBold15white
                          : Fonts.SemiBold15whiteOpacity40),
                        ...styles.textStyle,
                      }}
                    >
                      {tr("myTickets")}
                    </Text>
                  </View>
                </View>
              );
            } else if (route.name === "profile/profileScreen") {
              return (
                <View style={styles.commonViewStyle}>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Ionicons
                      size={21}
                      name="person-outline"
                      color={focused ? Colors.white : Colors.whiteOpacity40}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        ...(focused
                          ? Fonts.SemiBold15white
                          : Fonts.SemiBold15whiteOpacity40),
                        ...styles.textStyle,
                      }}
                    >
                      {tr("profile")}
                    </Text>
                  </View>
                </View>
              );
            }
          },
        })}
      >
        <Tabs.Screen
          name={isRtl ? "profile/profileScreen" : "home/homeScreen"}
        />
        <Tabs.Screen
          name={
            isRtl ? "myTickets/myTicketsScreen" : "categories/categoriesScreen"
          }
        />
        <Tabs.Screen
          name={
            isRtl ? "categories/categoriesScreen" : "myTickets/myTicketsScreen"
          }
        />
        <Tabs.Screen
          name={isRtl ? "home/homeScreen" : "profile/profileScreen"}
        />
      </Tabs>
    );
  };
  return (
    <>
      {bottomTab()}
      <SnackbarToast
        visible={visibleToast}
        title={tr("tapBack")}
        onDismiss={onDismissVisibleToast}
      />
    </>
  );
};
const styles = StyleSheet.create({
  commonViewStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarStyle: {
    height: 65,
    borderTopColor: Colors.transparent,
    shadowColor: Colors.darkBlue,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    elevation: 23,
    position: "absolute",
  },
  textStyle: {
    overflow: "hidden",
    marginTop: Default.fixPadding * 0.5,
    marginHorizontal: Default.fixPadding * 0.4,
  },
});

export default Layout;
