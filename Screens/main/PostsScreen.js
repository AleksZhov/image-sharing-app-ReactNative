import { createStackNavigator } from "@react-navigation/stack";

import DefaultPostsScreen from "./nestedScreens/DefaultPostsScreen";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import MapScreen from "./nestedScreens/MapScreen";

const PostsStack = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  
  <PostsStack.Navigator initialRouteName="DefaultPosts">
    <PostsStack.Screen
      name="DefaultPosts"
      component={MapScreen}
      // options={{ headerShown: false }}
    />
    {/* <PostsStack.Screen name="Comments" component={CommentsScreen} />
    <PostsStack.Screen name="Map" component={MapScreen} /> */}
  </PostsStack.Navigator>;
};

export default PostsScreen;
