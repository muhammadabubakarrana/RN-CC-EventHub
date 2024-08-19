import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import { useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Header from "../../components/header";

const SearchScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`searchScreen:${key}`);
  }

  const [search, setSearch] = useState();
  const [clearAll, setClearAll] = useState(false);

  const searchTextInput = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.searchViewStyle,
        }}
      >
        <Feather name="search" size={18} color={Colors.grey} />

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder={tr("searchYourEvent")}
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

  const recentSearchList = [
    "Friday music night event",
    "Friday music night event",
    "Friday music night event",
    "Friday music night event",
  ];

  const recentSearchListAndTitle = () => {
    return (
      <View
        style={{
          marginHorizontal: Default.fixPadding * 2,
          marginTop: Default.fixPadding,
        }}
      >
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            marginBottom: Default.fixPadding,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              textAlign: isRtl ? "right" : "left",
              marginRight: isRtl ? 0 : Default.fixPadding,
              marginLeft: isRtl ? Default.fixPadding : 0,
              ...Fonts.Bold17white,
            }}
          >
            {tr("recentSearch")}
          </Text>
          <TouchableOpacity onPress={() => setClearAll(true)}>
            <Text
              numberOfLines={1}
              style={{ maxWidth: 100, ...Fonts.Bold14grey }}
            >
              {tr("clearAll")}
            </Text>
          </TouchableOpacity>
        </View>

        {recentSearchList.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
                marginBottom:
                  recentSearchList.length - 1 === index
                    ? Default.fixPadding * 2.4
                    : Default.fixPadding * 1.5,
              }}
            >
              <Image
                source={require("../../assets/images/icons/history.png")}
                style={{ width: 18, height: 18, resizeMode: "contain" }}
              />
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  textAlign: isRtl ? "right" : "left",
                  ...Fonts.SemiBold14grey,
                  marginHorizontal: Default.fixPadding * 0.5,
                }}
              >
                {item}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };
  const categoryList = [
    {
      key: "1",
      image: require("../../assets/images/category1.png"),
      name: "Sports",
    },
    {
      key: "2",
      image: require("../../assets/images/category2.png"),
      name: "Music",
    },
    {
      key: "3",
      image: require("../../assets/images/category3.png"),
      name: "Dance",
    },
    {
      key: "4",
      image: require("../../assets/images/category4.png"),
      name: "Movie",
    },
    {
      key: "5",
      image: require("../../assets/images/category5.png"),
      name: "Art",
    },
    {
      key: "6",
      image: require("../../assets/images/category6.png"),
      name: "Food",
    },
    {
      key: "7",
      image: require("../../assets/images/category7.png"),
      name: "Science",
    },
    {
      key: "8",
      image: require("../../assets/images/category8.png"),
      name: "Health",
    },
  ];

  const renderItemCategory = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.push("event/eventScreen", {
            headerTitle: `${item.name} ${tr("event")}`,
          });
        }}
        style={styles.renderItemCategoryStyle}
      >
        <Image
          source={item.image}
          style={{ resizeMode: "contain", width: 28, height: 28 }}
        />
        <Text
          numberOfLines={1}
          style={{ ...Fonts.Bold16white, marginTop: Default.fixPadding * 0.5 }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const category = () => {
    return (
      <FlatList
        numColumns={4}
        data={categoryList}
        keyExtractor={(item) => item.key}
        renderItem={renderItemCategory}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        ListHeaderComponent={clearAll ? null : recentSearchListAndTitle}
        columnWrapperStyle={{
          paddingHorizontal: Default.fixPadding,
          paddingTop: clearAll ? Default.fixPadding : 0,
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
        <Header title={tr("search")} navigation={navigation} />
        {searchTextInput()}
        {category()}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchViewStyle: {
    alignItems: "center",
    paddingVertical: Default.fixPadding * 1.2,
    paddingHorizontal: Default.fixPadding * 0.9,
    borderRadius: 10,
    backgroundColor: Colors.lightBlue,
    marginHorizontal: Default.fixPadding * 2,
    marginBottom: Default.fixPadding,
  },
  texInputStyle: {
    flex: 1,
    marginHorizontal: Default.fixPadding,
    ...Fonts.Bold16white,
  },
  renderItemCategoryStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Default.fixPadding,
    paddingVertical: Default.fixPadding * 1.1,
    paddingHorizontal: Default.fixPadding * 0.5,
    marginBottom: Default.fixPadding * 2,
    borderColor: Colors.blueDianne,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: Colors.lightBlue,
    ...Default.shadowDarkBlue,
  },
});
