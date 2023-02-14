import { Text, Button } from "react-native";
import { useRoute,getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {  Feather, AntDesign } from "@expo/vector-icons";
import AddBtn from "../../components/AddButton";

import CreatePostsScreen from "./CreatePostsScreen";
import CreatePost from "./CreatePostComponents/CreatePost";

import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen"

const MainTab = createBottomTabNavigator();

const Home = ({ navigation, route }) => {
  
  
  
  
  const navToPosts = ()=>{navigation.navigate("Posts")}
  return (
    <MainTab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
        headerRightContainerStyle: {
          paddingRight: 16,
        },
        tabBarShowLabel: false,
        tabBarStyle: { paddingLeft: 50, paddingRight: 50, height: 83 },
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={({ route }) => ({
          headerShown: false,
                    tabBarIcon: () => (
                        <Feather name="grid" size={24} color={"#BDBDBD"} />
                    ),
                    tabBarStyle: ((route) => {
                        const routeName =
                            getFocusedRouteNameFromRoute(route) ?? "";
                        if (routeName === "Comments") {
                            return { display: "none" };
                        }
                        return { height: 83 };
                    })(route),
                })}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          headerShown: true,
          title: "Создать публикацию",
          headerLeft:()=><AntDesign onPress={navToPosts} name="arrowleft" size={24} color="black" />,
          tabBarIcon: () => <AddBtn />,
          tabBarStyle: { display: "none" },
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
export default Home;
