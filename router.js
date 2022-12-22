import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Entypo, Feather, AntDesign } from "@expo/vector-icons";
import AddBtn from "./components/AddButton";

import { LoginScreen, RegistrationScreen } from "./Screens/auth";
import {
  CreatePostsScreen,
  Home,
  PostsScreen,
  ProfileScreen,
} from "./Screens/main";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerRight: () => (
              <Button onPress={console.log("Exit")} title="Exit" />
            ),
          }}
          name="Home"
          component={Home}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      initialRouteName="Публикации"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { paddingLeft: 50, paddingRight: 50, height: 83 },
      }}
    >
      <MainTab.Screen
        name="Публикации"
        component={PostsScreen}
        options={{
          tabBarIcon: () => <Feather name="grid" size={24} color="#BDBDBD" />,
          headerTitleAlign: "center",
          headerLeftContainerStyle: {
            paddingLeft: 16,
          },
          headerRightContainerStyle: {
            paddingRight: 16,
          },

          headerRight: () => (
            <Entypo name="log-out" size={24} color="#BDBDBD" />
          ),
        }}
      />
      <MainTab.Screen
        name="Создать публикацию"
        component={CreatePostsScreen}
        options={{
          headerTitleAlign: "center",
          headerLeftContainerStyle: {
            paddingLeft: 16,
          },
          headerRightContainerStyle: {
            paddingRight: 16,
          },
          headerLeft: () => (
            <AntDesign
              onPress={navigation.navigate("Публикации")}
              name="arrowleft"
              size={24}
              color="rgba(33, 33, 33, 0.8)"
            />
          ),
          tabBarIcon: () => <AddBtn />,
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default useRoute;
