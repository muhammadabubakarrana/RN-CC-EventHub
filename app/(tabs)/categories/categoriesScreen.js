import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const CategoriesScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  function tr(key) {
    return t(`categoriesScreen:${key}`);
  }

  const header = () => {
    return (
      <View style={styles.headerViewStyle}>
        <Text style={{ ...Fonts.Bold20white }}>{tr("categories")}</Text>
      </View>
    );
  };

  const categoriesList = [
    {
      key: "1",
      image: require("../../../assets/images/categories1.png"),
      title: "Music",
    },
    {
      key: "2",
      image: require("../../../assets/images/categories2.png"),
      title: "Sports",
    },
    {
      key: "3",
      image: require("../../../assets/images/categories3.png"),
      title: "Education",
    },
    {
      key: "4",
      image: require("../../../assets/images/categories4.png"),
      title: "Sports",
    },
    {
      key: "5",
      image: require("../../../assets/images/categories5.png"),
      title: "Dance",
    },
    {
      key: "6",
      image: require("../../../assets/images/categories6.png"),
      title: "Food",
    },
    {
      key: "7",
      image: require("../../../assets/images/categories7.png"),
      title: "Science",
    },
    {
      key: "8",
      image: require("../../../assets/images/categories8.png"),
      title: "Health",
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.push("event/eventScreen", {
            headerTitle: `${item.title} ${tr("event")}`,
          })
        }
        style={styles.renderItemTouchableStyle}
      >
        <ImageBackground source={item.image} style={styles.imgStyle}>
          <LinearGradient
            colors={["rgba(30, 30, 30, 0)", "rgba(40, 40, 40, 0.9)"]}
            style={styles.linearGradientStyle}
          >
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold17white, textAlign: "center" }}
            >
              {item.title}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const categoriesFlatList = () => {
    return (
      <FlatList
        numColumns={2}
        data={categoriesList}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Default.fixPadding,
          paddingBottom: Default.fixPadding * 6.5,
          paddingTop: Default.fixPadding * 0.5,
        }}
      />
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
        {header()}
        {categoriesFlatList()}
      </View>
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  headerViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.5,
  },
  renderItemTouchableStyle: {
    flex: 1,
    padding: Default.fixPadding * 0.7,
    marginHorizontal: Default.fixPadding,
    marginBottom: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.lightBlue,
  },
  imgStyle: {
    overflow: "hidden",
    width: "100%",
    height: 112,
    borderRadius: 5,
  },
  linearGradientStyle: {
    flex: 1,
    justifyContent: "flex-end",
    padding: Default.fixPadding * 0.6,
  },
});
