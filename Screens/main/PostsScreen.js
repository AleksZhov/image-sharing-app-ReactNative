import { createStackNavigator } from "@react-navigation/stack";
import { Entypo} from "@expo/vector-icons";

import DefaultPostsScreen from "./nestedScreens/DefaultPostsScreen";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import MapScreen from "./nestedScreens/MapScreen";

const PostsStack = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  return <PostsStack.Navigator initialRouteName="DefaultPosts"
    screenOptions={{
        headerTitleAlign: "center",
        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
        headerRightContainerStyle: {
          paddingRight: 16,
      },
         headerRight: () => (
            <Entypo
              onPress={() => navigation.navigate("Login")}
              name="log-out"
              size={24}
              color="#BDBDBD"
            />
          ),
      
      }}>
    <PostsStack.Screen
      name="DefaultPosts"
      component={DefaultPostsScreen}
      options={{ title: "Публикации"}}
    />
    <PostsStack.Screen name="Comments" component={CommentsScreen} />
    <PostsStack.Screen name="Map" component={MapScreen} />
  </PostsStack.Navigator>;
};

export default PostsScreen;
