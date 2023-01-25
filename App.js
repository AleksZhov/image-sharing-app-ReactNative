

import { Provider } from "react-redux";
import { store } from "./redux/store"

import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect, useCallback } from "react";
import * as Font from "expo-font";

import Main from "./components/Main";

import { View, Text } from "react-native";

SplashScreen.preventAutoHideAsync();

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });
};

export default function App() {
 

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
    // <View  onLayout={onLayoutRootView} style={{ flex: 1 }}>
    //   <Text>
    //     Hello asdfasdf asdfasdfsdfa sdfasdfsdfsd fasdfasdfas dfasdfasdf
    //   </Text>
    //  </View>
    <Provider store={store}>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <Main  />
        </View>
    </Provider>
  );
}
