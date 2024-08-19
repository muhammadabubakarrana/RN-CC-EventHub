import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CommonButton from "../../components/commonButton";
import Header from "../../components/header";

const HelpAndSupportScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`helpAndSupportScreen:${key}`);
  }
  const [name, setName] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [message, setMessage] = useState();

  const imageAndCallAndMail = () => {
    return (
      <View style={{ marginTop: Default.fixPadding * 0.5 }}>
        <Image
          source={require("../../assets/images/help.png")}
          style={styles.imageStyle}
        />
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            marginHorizontal: Default.fixPadding,
            marginTop: Default.fixPadding * 2,
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              ...styles.callAndMainViewStyle,
            }}
          >
            <Image
              source={require("../../assets/images/icons/calling.png")}
              style={{ width: 20, height: 20, resizeMode: "contain" }}
            />
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.Bold16white,
                marginHorizontal: Default.fixPadding,
                maxWidth: 100,
              }}
            >
              {tr("callUs")}
            </Text>
          </View>

          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              ...styles.callAndMainViewStyle,
            }}
          >
            <Ionicons name="mail" size={20} color={Colors.white} />
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.Bold16white,
                marginHorizontal: Default.fixPadding,
                maxWidth: 100,
              }}
            >
              {tr("mailUs")}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const textInputs = () => {
    return (
      <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
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
        <TextInput
          value={emailAddress}
          onChangeText={setEmailAddress}
          placeholder={tr("enterEmailAddress")}
          keyboardType="email-address"
          placeholderTextColor={Colors.grey}
          selectionColor={Colors.primary}
          style={{
            textAlign: isRtl ? "right" : "left",
            ...styles.texInputStyle,
          }}
        />

        <TextInput
          value={message}
          onChangeText={setMessage}
          multiline={true}
          numberOfLines={7}
          textAlignVertical="top"
          placeholder={tr("writeMessageHere")}
          placeholderTextColor={Colors.grey}
          selectionColor={Colors.primary}
          style={{
            height: 150,
            textAlign: isRtl ? "right" : "left",
            ...styles.texInputStyle,
          }}
        />
      </View>
    );
  };

  const bottomView = () => {
    return (
      <View style={styles.borderViewStyle}>
        <Text style={styles.forQuickTextStyle}>{tr("forQuickContact")}</Text>
        {textInputs()}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
        <Header title={tr("helpSupport")} navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {imageAndCallAndMail()}
          {bottomView()}
        </ScrollView>
        <View style={{ backgroundColor: Colors.lightBlue }}>
          <CommonButton title={tr("send")} onPress={() => navigation.pop()} />
        </View>
      </View>
    </View>
  );
};

export default HelpAndSupportScreen;

const styles = StyleSheet.create({
  imageStyle: {
    width: 160,
    height: 192,
    alignSelf: "center",
  },
  callAndMainViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: Colors.lightBlue,
    marginHorizontal: Default.fixPadding,
    padding: Default.fixPadding * 1.2,
  },
  borderViewStyle: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: Default.fixPadding * 2,
    paddingTop: Default.fixPadding * 2,
    backgroundColor: Colors.lightBlue,
  },
  forQuickTextStyle: {
    ...Fonts.Bold18white,
    textAlign: "center",
    marginHorizontal: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 2.5,
  },
  texInputStyle: {
    ...Fonts.SemiBold16white,
    borderWidth: 1,
    borderColor: "rgba(240, 240, 240, 0.4)",
    borderRadius: 10,
    padding: Default.fixPadding * 1.5,
    marginBottom: Default.fixPadding * 2.5,
  },
});
