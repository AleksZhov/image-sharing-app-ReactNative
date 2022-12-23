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

const useRoute = () => {
  return (
    <AuthStack.Navigator initialRouteName="Home">
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
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
    </AuthStack.Navigator>
  );
};

export default useRoute;
