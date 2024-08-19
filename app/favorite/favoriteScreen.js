import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import SnackbarToast from "../../components/snackbarToast";
import { useNavigation } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/header";
import { SwipeListView } from "react-native-swipe-list-view";

const FavoriteScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`favoriteScreen:${key}`);
  }

  const [removeToast, setRemoveToast] = useState(false);
  const onDismiss = () => setRemoveToast(false);

  const favoriteList = [
    {
      key: "1",
      image: require("../../assets/images/img1.png"),
      title: "Musical night festival",
      address: "City centre mall",
      date: "15 october 2022",
    },
    {
      key: "2",
      image: require("../../assets/images/img14.png"),
      title: "Backstreet boys event",
      address: "jogiyo expo center",
      date: "20 october 2022",
    },
    {
      key: "3",
      image: require("../../assets/images/img13.png"),
      title: "Friday night music event",
      address: "Union square  museum",
      date: "25 october 2022",
    },
    {
      key: "4",
      image: require("../../assets/images/img3.png"),
      title: "Austin city education event",
      address: "Union square  museum",
      date: "25 october 2022",
    },
  ];

  const [favoriteData, setFavoriteData] = useState(
    favoriteList.map((item, index) => ({
      key: `${index}`,
      image: item.image,
      title: item.title,
      address: item.address,
      date: item.date,
    }))
  );

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...favoriteData];
    const prevIndex = favoriteData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setFavoriteData(newData);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: Colors.darkBlue }}>
        <TouchableOpacity
          onPress={() =>
            navigation.push("detail/detailScreen", { image: item.image })
          }
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.renderItemTouchableStyle,
          }}
        >
          <Image source={item.image} style={styles.imageStyle} />
          <View
            style={{
              flex: 1,
              alignItems: isRtl ? "flex-end" : "flex-start",
              marginHorizontal: Default.fixPadding,
            }}
          >
            <Text numberOfLines={1} style={{ ...Fonts.Bold16white }}>
              {item.title}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.SemiBold15grey,
                marginVertical: Default.fixPadding * 0.4,
              }}
            >
              {item.address}
            </Text>
            <Text numberOfLines={1} style={{ ...Fonts.Medium14primary }}>
              {item.date}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <TouchableOpacity
        style={{
          right: isRtl ? null : 0,
          ...styles.renderHiddenItemTouchableStyle,
        }}
        onPress={() => {
          deleteRow(rowMap, data.item.key);
          setRemoveToast(true);
        }}
      >
        <MaterialCommunityIcons
          name="delete-outline"
          size={24}
          color={Colors.white}
        />
      </TouchableOpacity>
    );
  };

  const favoriteSwiperView = () => {
    return (
      <>
        {favoriteData.length === 0 ? (
          <View style={styles.emptyViewStyle}>
            <Ionicons name="heart-dislike" color={Colors.grey} size={40} />

            <Text
              style={{
                ...Fonts.Bold16grey,
                textAlign: "center",
                marginTop: Default.fixPadding,
              }}
            >
              {tr("emptyFavoriteList")}
            </Text>
          </View>
        ) : (
          <SwipeListView
            data={favoriteData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={isRtl ? 0 : -41}
            leftOpenValue={isRtl ? 41 : 0}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: Default.fixPadding * 0.5 }}
          />
        )}
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
        <Header title={tr("favorite")} navigation={navigation} />
        {favoriteSwiperView()}
      </View>
      <SnackbarToast
        title={tr("remove")}
        visible={removeToast}
        onDismiss={onDismiss}
      />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  renderItemTouchableStyle: {
    alignItems: "center",
    padding: Default.fixPadding,
    marginHorizontal: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 1.5,
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    ...Default.shadowDarkBlue,
  },
  imageStyle: {
    width: 74,
    height: 74,
    borderRadius: 5,
  },
  renderHiddenItemTouchableStyle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 41,
    top: 0,
    bottom: 0,
    borderRadius: 10,
    marginBottom: Default.fixPadding * 1.5,
    backgroundColor: Colors.extraLightRed,
  },
  emptyViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Default.fixPadding * 2,
  },
});
