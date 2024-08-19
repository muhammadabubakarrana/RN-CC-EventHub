import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import { useNavigation } from "expo-router";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CommonButton from "../../components/commonButton";
import Header from "../../components/header";

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`editProfileScreen:${key}`);
  }

  const [openChangePhotoBottomSheet, setOpenChangePhotoBottomSheet] =
    useState(false);

  const [name, setName] = useState("Jecklin howard");
  const [emailAddress, setEmailAddress] = useState("Jecklinhoward@mail.com");
  const [mobileNumber, setMobileNumber] = useState("+91 1234567890");

  const userDetail = () => {
    return (
      <View style={styles.userDetailViewStyle}>
        <View>
          <Image
            source={require("../../assets/images/users/profile.png")}
            style={styles.imageStyle}
          />
          <TouchableOpacity
            onPress={() => setOpenChangePhotoBottomSheet(true)}
            style={{ right: isRtl ? null : 0, ...styles.cameraCircleStyle }}
          >
            <Feather name="camera" size={18} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            ...Fonts.SemiBold18white,
            marginTop: Default.fixPadding * 0.5,
          }}
        >
          Jecklin howard
        </Text>
        <Text
          style={{
            ...Fonts.SemiBold14grey,
          }}
        >
          +91 1234567890
        </Text>
      </View>
    );
  };

  const textInputs = () => {
    return (
      <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
        <Text
          style={{ textAlign: isRtl ? "right" : "left", ...Fonts.Bold15white }}
        >
          {tr("userName")}
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={tr("enterName")}
          placeholderTextColor={Colors.grey}
          selectionColor={Colors.primary}
          style={{
            textAlign: isRtl ? "right" : "left",
            ...styles.texInputStyle,
          }}
        />
        <Text
          style={{ textAlign: isRtl ? "right" : "left", ...Fonts.Bold15white }}
        >
          {tr("emailAddress")}
        </Text>
        <TextInput
          value={emailAddress}
          onChangeText={setEmailAddress}
          placeholder={tr("enterEmail")}
          keyboardType="email-address"
          placeholderTextColor={Colors.grey}
          selectionColor={Colors.primary}
          style={{
            textAlign: isRtl ? "right" : "left",
            ...styles.texInputStyle,
          }}
        />

        <Text
          style={{ textAlign: isRtl ? "right" : "left", ...Fonts.Bold15white }}
        >
          {tr("mobileNumber")}
        </Text>
        <TextInput
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder={tr("enterMobileNumber")}
          keyboardType="number-pad"
          placeholderTextColor={Colors.grey}
          selectionColor={Colors.primary}
          style={{
            textAlign: isRtl ? "right" : "left",
            ...styles.texInputStyle,
          }}
        />
      </View>
    );
  };

  const changePhotoBottomSheet = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={openChangePhotoBottomSheet}
        onRequestClose={() => setOpenChangePhotoBottomSheet(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setOpenChangePhotoBottomSheet(false)}
          style={{ flex: 1 }}
        >
          <View style={styles.sheetBackViewStyle}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.bottomSheetViewStyle}
            >
              <Text
                style={{
                  textAlign: "center",
                  ...Fonts.Bold18black,
                }}
              >
                {tr("changeProfilePhoto")}
              </Text>

              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                  marginTop: Default.fixPadding * 2.5,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setOpenChangePhotoBottomSheet(false)}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.circleViewStyle}>
                    <MaterialCommunityIcons
                      name="camera"
                      size={30}
                      color={Colors.blue}
                    />
                  </View>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.Bold16black,
                      marginTop: Default.fixPadding,
                    }}
                  >
                    {tr("camera")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setOpenChangePhotoBottomSheet(false)}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: Default.fixPadding * 0.5,
                  }}
                >
                  <View style={styles.circleViewStyle}>
                    <Ionicons name="image" size={30} color={Colors.green} />
                  </View>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.Bold16black,
                      marginTop: Default.fixPadding,
                    }}
                  >
                    {tr("gallery")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setOpenChangePhotoBottomSheet(false)}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.circleViewStyle}>
                    <MaterialCommunityIcons
                      name="trash-can"
                      size={30}
                      color={Colors.red}
                    />
                  </View>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.Bold16black,
                      marginTop: Default.fixPadding,
                    }}
                  >
                    {tr("removeImage")}
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
        <Header title={tr("editProfile")} navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          {userDetail()}
          {textInputs()}
        </ScrollView>
        <CommonButton title={tr("update")} onPress={() => navigation.pop()} />
      </View>
      {changePhotoBottomSheet()}
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  userDetailViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Default.fixPadding * 2,
    marginTop: Default.fixPadding * 0.5,
    marginBottom: Default.fixPadding * 3,
  },
  imageStyle: {
    width: 139,
    height: 139,
    borderRadius: 69.5,
  },
  cameraCircleStyle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 8,
    width: 37,
    height: 37,
    borderRadius: 18.5,
    backgroundColor: Colors.darkBlue,
  },
  texInputStyle: {
    ...Fonts.SemiBold16white,
    borderRadius: 10,
    marginTop: Default.fixPadding * 0.8,
    marginBottom: Default.fixPadding * 2,
    paddingHorizontal: Default.fixPadding * 1.6,
    paddingVertical: Default.fixPadding * 1.3,
    backgroundColor: Colors.lightBlue,
    ...Default.shadowDarkBlue,
  },
  bottomSheetViewStyle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: Default.fixPadding * 1.9,
    paddingHorizontal: Default.fixPadding,
    backgroundColor: Colors.white,
    ...Default.shadowBlack,
  },
  circleViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.white,
    ...Default.shadowBlack,
  },
  sheetBackViewStyle: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
});
