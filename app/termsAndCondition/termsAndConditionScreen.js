import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import { useNavigation } from "expo-router";
import Header from "../../components/header";

const TermsAndConditionScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`termsAndConditionScreen:${key}`);
  }

  const termsCondition = () => {
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
            ...styles.textStyle,
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
        <Header title={tr("termsCondition")} navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {termsCondition()}
        </ScrollView>
      </View>
    </View>
  );
};

export default TermsAndConditionScreen;

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: Default.fixPadding * 0.5,
    marginHorizontal: Default.fixPadding * 2,
    marginBottom: Default.fixPadding,
  },
  textStyle: {
    ...Fonts.Bold14grey,
    marginBottom: Default.fixPadding,
  },
});
