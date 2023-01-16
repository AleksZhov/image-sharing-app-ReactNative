import { Text, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {  Feather, AntDesign } from "@expo/vector-icons";
import AddBtn from "../../components/AddButton";

import CreatePostsScreen from "./CreatePostsScreen";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";

const MainTab = createBottomTabNavigator();

const Home = ({ navigation }) => {
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
        options={{
          headerShown: false,
          tabBarIcon: () => <Feather name="grid" size={24} color="#BDBDBD" />,
         
        }}
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
