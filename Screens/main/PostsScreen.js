import { Text, Button } from "react-native";
const PostsScreen = ({ navigation, route }) => {
  const onExitBtnPress = () => {
    navigation.navigate("Login");
  };
  return <Text>PostsScreen</Text>;
};
export default PostsScreen;
