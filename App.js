import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, ImageBackground, Button } from "react-native";
import useRoute from "./router";

import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect, useCallback } from "react";
import * as Font from "expo-font";

import { NavigationContainer } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

const loadFonts = async ({ navigation }) => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });
};

export default function App() {
  const routing = useRoute();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    // <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
    //   <Text>
    //     Hello asdfasdf asdfasdfsdfa sdfasdfsdfsd fasdfasdfas dfasdfasdf
    //   </Text>
    // </View>
    <NavigationContainer onLayout={onLayoutRootView}>
      {routing}

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
