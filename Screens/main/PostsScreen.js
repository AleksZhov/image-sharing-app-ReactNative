import { createStackNavigator } from "@react-navigation/stack";
import { Entypo, AntDesign, } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import DefaultPostsScreen from "./nestedScreens/DefaultPostsScreen";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import MapScreen from "./nestedScreens/MapScreen";
import { useDispatch } from "react-redux";
import { authSignOut } from "../../redux/auth/authOperations";

const PostsStack = createStackNavigator();

const PostsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  
  return <PostsStack.Navigator initialRouteName="DefaultPosts"
    screenOptions={{
        headerTitleAlign: "center",
        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
        headerRightContainerStyle: {
          paddingRight: 16,
      },
       
      
      }}>
    <PostsStack.Screen
      name="DefaultPosts"
      component={DefaultPostsScreen}
      options={{
        title: "Публикации",
          headerRight: () => (
            <Entypo
              onPress={() => dispatch(authSignOut())}
              name="log-out"
              size={24}
              color="#BDBDBD"
            />
          ),
       
      }}
    />
    <PostsStack.Screen name="Comments" component={CommentsScreen} options={{ title:"Комментарии", headerLeft: () => <AntDesign onPress={()=>navigation.navigate("DefaultPosts")} name="arrowleft" size={24} color="black" />,}} />
    <PostsStack.Screen name="Map" component={MapScreen} />
  </PostsStack.Navigator>;
};

export default PostsScreen;
