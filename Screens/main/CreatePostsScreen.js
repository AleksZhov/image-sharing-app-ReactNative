import { Text, Button } from "react-native";
const CreatePostsScreen = ({ navigation }) => {
  const onExitBtnPress = () => {
    navigation.navigate("LCreatePostsScreen");
  };
  return <Text>CreatePostsScreen</Text>;
};
export default CreatePostsScreen;
