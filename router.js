import { createStackNavigator } from "@react-navigation/stack";


import { Entypo, Feather, AntDesign } from "@expo/vector-icons";
import AddBtn from "./components/AddButton";

import { LoginScreen, RegistrationScreen } from "./Screens/auth";
import {
  Home,
} from "./Screens/main";

const AuthStack = createStackNavigator();


const useRoute = (isAuth) => {
  if (isAuth){return (
    <AuthStack.Navigator initialRouteName="Home">
     
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
    </AuthStack.Navigator>
  );
  }
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
      
      
    </AuthStack.Navigator>
  );
};

export default useRoute;
