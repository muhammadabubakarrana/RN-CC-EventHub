import React from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import { useNavigation } from "expo-router";
import Header from "../../components/header";

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`privacyPolicyScreen:${key}`);
  }

  const image = () => {
    return (
      <View style={styles.imageViewStyle}>
        <Image
          source={require("../../assets/images/privacy.png")}
          style={styles.imageStyle}
        />
      </View>
    );
  };

  const privacyPolicy = () => {
    return (
      <View style={styles.containerStyle}>
        <Text
          style={{ textAlign: isRtl ? "right" : "left", ...styles.textStyle }}
        >
          Lorem ipsum dolor sit amet consectetur. Bibendum non quam senectus dui
          nec. Nec suspendisse id et cursussdx lorem neque justo. Lectus
          curabitur dictum velit et diam morbi amet faucibus sed. Pelle ntesque
          pulvinar massa justo pretium a neque justo posuere aliquam. Sedgestas
          sed orci nisi leo. Proin faucibus phasellus sit sosdbitasse facilisis.
          Est sapien leo turpis massaNec suspendisse id et cursussdx lorem neque
          justo. Lectus curabitur dictum velit et diam Lectus curabitur dictum
          velit et diam.
        </Text>
        <Text
          style={{ textAlign: isRtl ? "right" : "left", ...styles.textStyle }}
        >
          Lorem ipsum dolor sit amet consectetur. Bibendum nons quam senectus
          dui nec. Nec suspendisse id et cursussdx lorem neque justo. Lectus
          curabitur dictum velit etdiams morbi amet faucibus sed. Pellentesque
          pulvinar massas, justo pretium a neque justo posuere aliquam.
          Sedgestas sed orci nisi leo. Proin faucibus phasellus sit sosdbitasse
          facilisis. Est sapien leo turpis massaNec suspendisse idq et cursussdx
          lorem neque justo. Lectus curabitur dictum velit et diam Lectus
          curabitur dictum velit et diamatoms Lorem ipsum dolor sit amet
          consectetur. Bibendum nons quam senectus dui nec. Nec suspendisse id
          et cursussdx lorem neque justo. Lectus curabitur dictum velit et diam
          morbi amet faucibus sed. Pelle ntesque pulvinar massas justo pretium a
          neque justo posuere aliquam. Sedgestas sed orci nisi leo. Proin
          faucibus phasellus sit sosdbitasse facilisis. Est sapien leo turpis
          massaNec suspendisse ids et cursussdx lorem neque justo. Lectus
          curabitur dictum velit et diam Lectus curabitur dictum velit et diam
          atom
        </Text>
        <Text
          style={{ textAlign: isRtl ? "right" : "left", ...styles.textStyle }}
        >
          Lorem ipsum dolor sit amet consectetur. Bibendum nons quam senectus
          dui nec. Nec suspendisse id et cursussdx lorem neque justo. Lectus
          curabitur dictum velit etdiams morbi amet faucibus sed. Pellentesque
          pulvinar massas, justo pretium a neque justo posuere aliquam.
          Sedgestas sed orci nisi leo. Proin faucibus phasellus sit sosdbitasse
          facilisis. Est sapien leo turpis massaNec suspendisse idq et cursussdx
          lorem neque justo. Lectus curabitur dictum velit et diam Lectus
          curabitur dictum velit et diamatoms Lorem ipsum dolor sit amet
          consectetur. Bibendum nons quam senectus dui nec. Nec suspendisse id
          et cursussdx lorem neque justo. Lectus curabitur dictum velit et diam
          morbi amet faucibus sed. Pelle ntesque pulvinar massas justo pretium a
          neque justo posuere aliquam. Sedgestas sed orci nisi leo. Proin
          faucibus phasellus sit sosdbitasse facilisis. Est sapien leo turpis
          massaNec suspendisse ids et cursussdx lorem neque justo. Lectus
          curabitur dictum velit et diam Lectus curabitur dictum velit et diam
          atom
        </Text>
        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.Bold14grey,
          }}
        >
          Lorem ipsum dolor sit amet consectetur. Bibendum non quam senectus dui
          nec. Nec suspendisse id et cursussdx lorem neque justo. Lectus
          curabitur dictum velit et diam morbi amet faucibus sed. Pelle ntesque
          pulvinar massa justo pretium a neque justo posuere aliquam. Sedgestas
          sed orci nisi leo. Proin faucibus phasellus sit sosdbitasse facilisis.
          Est sapien leo turpis massaNec suspendisse id et cursussdx lorem neque
          justo. Lectus curabitur dictum velit et diam Lectus curabitur dictum
          velit et diam.
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.darkBlue }}>
        <Header title={tr("privacyPolicy")} navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {image()}
          {privacyPolicy()}
        </ScrollView>
      </View>
    </View>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  imageViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Default.fixPadding * 0.5,
  },
  imageStyle: {
    resizeMode: "contain",
    width: 200,
    height: 200,
  },
  containerStyle: {
    margin: Default.fixPadding * 2,
  },
  textStyle: {
    ...Fonts.Bold14grey,
    marginBottom: Default.fixPadding,
  },
});
