import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { withTranslation } from "react-i18next";
import { LogBox } from "react-native";
import { Stack } from "expo-router";
import i18n from "../languages/index"; //don't remove this line

LogBox.ignoreAllLogs();

const MainNavigation = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="onboarding/onboardingScreen"
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="auth/loginScreen"
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="auth/registerScreen" />
      <Stack.Screen name="auth/otpVerificationScreen" />
      <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
      <Stack.Screen name="notification/notificationScreen" />
      <Stack.Screen name="search/searchScreen" />
      <Stack.Screen name="detail/detailScreen" />
      <Stack.Screen name="eventNearYou/eventNearYouScreen" />
      <Stack.Screen name="event/eventScreen" />
      <Stack.Screen name="seats/seatsScreen" />
      <Stack.Screen name="bookTicket/bookTicketScreen" />
      <Stack.Screen name="offer/offerScreen" />
      <Stack.Screen name="paymentMethod/paymentMethodScreen" />
      <Stack.Screen name="creditCard/creditCardScreen" />
      <Stack.Screen name="ticketBooked/ticketBookedScreen" />
      <Stack.Screen name="mapView/mapViewScreen" />
      <Stack.Screen name="direction/directionScreen" />
      <Stack.Screen name="ticket/ticketScreen" />
      <Stack.Screen name="editProfile/editProfileScreen" />
      <Stack.Screen name="favorite/favoriteScreen" />
      <Stack.Screen name="language/languageScreen" />
      <Stack.Screen name="termsAndCondition/termsAndConditionScreen" />
      <Stack.Screen name="privacyPolicy/privacyPolicyScreen" />
      <Stack.Screen name="helpAndSupport/helpAndSupportScreen" />
    </Stack>
  );
};

const ReloadAppOnLanguageChange = withTranslation("translation", {
  bindI18n: "languageChanged",
  bindStore: false,
})(MainNavigation);

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Bold: require("./../assets/fonts/Mulish-Bold.ttf"),
    Regular: require("./../assets/fonts/Mulish-Regular.ttf"),
    SemiBold: require("./../assets/fonts/Mulish-SemiBold.ttf"),
    Medium: require("./../assets/fonts/Mulish-Medium.ttf"),
    ExtraBold: require("./../assets/fonts/Mulish-ExtraBold.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <ReloadAppOnLanguageChange />;
}
