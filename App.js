import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground } from "react-native";
import { LoginScreen, RegistrationScreen } from "./Screens/auth";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect, useCallback } from "react";
import * as Font from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
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
        // Tell the application to render
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }
  return (
    // <NavigationContainer onLayout={onLayoutRootView}>
    //   <Stack.Navigator initialRouteName="Login">
    //     <Stack.Screen name="Registration" component={RegistrationScreen} />
    //     <Stack.Screen name="Login" component={LoginScreen} />
    //   </Stack.Navigator>
    //   <StatusBar style="auto" />
    // </NavigationContainer>
    <RegistrationScreen />
    // <LoginScreen />
  );
}
