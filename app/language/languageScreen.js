import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import { useNavigation } from "expo-router";
import Header from "../../components/header";
import CommonButton from "../../components/commonButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LanguageScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`languageScreen:${key}`);
  }

  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.resolvedLanguage
  );

  async function onChangeLang(lang) {
    i18n.changeLanguage(lang);
    try {
      await AsyncStorage.setItem("@APP:languageCode", lang);
    } catch (error) {
      alert("something went wrong");
    }
  }

  const onDisableHandler = i18n.language === selectedLanguage;

  const languageList = [
    {
      key: "1",
      name: "English",
      lang: "en",
    },
    {
      key: "2",
      name: "हिन्दी",
      lang: "hi",
    },
    {
      key: "3",
      name: "bahasa Indonesia",
      lang: "id",
    },
    {
      key: "4",
      name: "中国人",
      lang: "ch",
    },
    {
      key: "5",
      name: "عربي",
      lang: "ar",
    },
    {
      key: "6",
      name: "Français",
      lang: "fr",
    },
    {
      key: "7",
      name: "Português",
      lang: "po",
    },
    {
      key: "8",
      name: "Italiano",
      lang: "it",
    },
    {
      key: "9",
      name: "Türkçe",
      lang: "tu",
    },
  ];

  const renderItem = ({ item }) => {
    const selected = selectedLanguage === item.lang;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setSelectedLanguage(item.lang)}
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.mainTouchableOpacityStyle,
        }}
      >
        <Text
          numberOfLines={1}
          style={{ textAlign: isRtl ? "right" : "left", ...styles.textStyle }}
        >
          {item.name}
        </Text>

        <MaterialCommunityIcons
          name={selected ? "record-circle" : "circle-outline"}
          size={20}
          color={selected ? Colors.primary : Colors.grey}
        />
      </TouchableOpacity>
    );
  };

  const languageFlatLit = () => {
    return (
      <FlatList
        data={languageList}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: Default.fixPadding * 0.5 }}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bgColor }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
        <Header title={tr("language")} navigation={navigation} />
        {languageFlatLit()}

        <CommonButton
          disabled={onDisableHandler}
          title={tr("update")}
          onPress={() => {
            onChangeLang(selectedLanguage);
            navigation.pop();
          }}
        />
      </View>
    </View>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  mainTouchableOpacityStyle: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: Default.fixPadding * 1.5,
    marginBottom: Default.fixPadding * 1.4,
    marginHorizontal: Default.fixPadding * 2,
    borderRadius: 8,
    backgroundColor: Colors.lightBlue,
  },
  textStyle: {
    flex: 1,
    overflow: "hidden",
    ...Fonts.Bold16white,
  },
});
