import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Dimensions,
} from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`profileScreen:${key}`);
  }

  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const header = () => {
    return (
      <View style={styles.headerViewStyle}>
        <Text style={{ ...Fonts.Bold20white }}>{tr("profile")}</Text>
      </View>
    );
  };

  const profileDetail = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.profileDetailViewStyle,
        }}
      >
        <Image
          source={require("../../../assets/images/users/profile.png")}
          style={styles.imageStyle}
        />
        <View
          style={{
            flex: 1,
            alignItems: isRtl ? "flex-end" : "flex-start",
            marginHorizontal: Default.fixPadding,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.SemiBold18white }}>
            Jecklin howard
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold14grey,
              marginTop: Default.fixPadding * 0.5,
            }}
          >
            +91 1234567890
          </Text>
        </View>
      </View>
    );
  };

  const data = [
    {
      key: 1,
      title: tr("editProfile"),
      icon: Feather,
      iconName: "user",
      navigateTo: "editProfile/editProfileScreen",
    },
    {
      key: 2,
      title: tr("favorite"),
      icon: Feather,
      iconName: "heart",
      navigateTo: "favorite/favoriteScreen",
    },
    {
      key: 3,
      title: tr("language"),
      icon: Ionicons,
      iconName: "globe-outline",
      navigateTo: "language/languageScreen",
    },
    {
      key: 4,
      title: tr("termsCondition"),
      icon: Feather,
      iconName: "file-text",
      navigateTo: "termsAndCondition/termsAndConditionScreen",
    },
    {
      key: 5,
      title: tr("privacyPolicy"),
      icon: Feather,
      iconName: "alert-circle",
      navigateTo: "privacyPolicy/privacyPolicyScreen",
    },
    {
      key: 6,
      title: tr("helpSupport"),
      icon: Feather,
      iconName: "mail",
      navigateTo: "helpAndSupport/helpAndSupportScreen",
    },
    {
      key: 7,
      title: tr("logout"),
      icon: Ionicons,
      iconName: "exit-outline",
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.key == 7) {
            setOpenLogoutModal(true);
          } else {
            navigation.push(item.navigateTo);
          }
        }}
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.renderItemViewStyle,
        }}
      >
        <item.icon
          name={item.iconName}
          size={18}
          color={item.key == 7 ? Colors.bittersweet : Colors.white}
        />
        <Text
          numberOfLines={1}
          style={{
            ...(item.key == 7
              ? Fonts.SemiBold17bittersweet
              : Fonts.SemiBold17white),
            textAlign: isRtl ? "right" : "left",
            ...styles.textStyle,
          }}
        >
          {item.title}
        </Text>

        <Feather
          name={isRtl ? "chevron-left" : "chevron-right"}
          size={20}
          color={Colors.white}
        />
      </TouchableOpacity>
    );
  };

  const flatList = () => {
    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View>{profileDetail()}</View>}
        contentContainerStyle={{ paddingBottom: Default.fixPadding * 5 }}
      />
    );
  };

  const logoutModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={openLogoutModal}
        onRequestClose={() => setOpenLogoutModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setOpenLogoutModal(false)}
          style={{ flex: 1 }}
        >
          <View style={styles.modalBackViewStyle}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.modalTouchableStyle}
            >
              <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
                <Text style={{ ...Fonts.Bold20primary, textAlign: "center" }}>
                  {tr("logout")}
                </Text>
                <Text style={styles.areYouSureTextStyle}>
                  {tr("areYouSure")}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setOpenLogoutModal(false)}
                  style={{
                    borderTopColor:
                      Platform.OS === "ios"
                        ? Colors.transparent
                        : "rgba(65, 62, 62, 0.08)",
                    ...styles.buttonStyle,
                    backgroundColor: Colors.white,
                    ...Default.shadowBlack,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.Bold18primary,
                    }}
                  >
                    {tr("cancel")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    borderColor: Colors.transparent,
                    ...styles.buttonStyle,
                    backgroundColor: Colors.primary,

                    ...Default.shadow,
                  }}
                  onPress={() => {
                    setOpenLogoutModal(false);
                    navigation.push("auth/loginScreen");
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.Bold18white,
                    }}
                  >
                    {tr("logout")}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
        {header()}
        {flatList()}
        {logoutModal()}
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  headerViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.5,
  },
  imageStyle: {
    width: 71,
    height: 71,
    borderRadius: 35.5,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  profileDetailViewStyle: {
    alignItems: "center",
    paddingHorizontal: Default.fixPadding * 2.2,
    paddingVertical: Default.fixPadding * 1.7,
    marginBottom: Default.fixPadding * 2.5,
    marginTop: Default.fixPadding * 0.5,
    backgroundColor: Colors.lightBlue,
  },
  textStyle: {
    flex: 1,
    marginHorizontal: Default.fixPadding,
  },
  renderItemViewStyle: {
    alignItems: "center",
    marginHorizontal: Default.fixPadding * 1.6,
    marginBottom: Default.fixPadding * 3.5,
  },
  modalTouchableStyle: {
    overflow: "hidden",
    width: width * 0.8,
    paddingTop: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  modalBackViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.transparentBlack,
  },
  areYouSureTextStyle: {
    ...Fonts.Medium15black,
    textAlign: "center",
    marginTop: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 3,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.2,
    borderTopWidth: 1,
  },
});
