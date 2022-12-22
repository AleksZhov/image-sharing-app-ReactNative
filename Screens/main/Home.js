import { Text, Button } from "react-native";
const Home = ({ navigation }) => {
  const onExitBtnPress = () => {
    navigation.navigate("Login");
  };
  return <Text>Home</Text>;
};
export default Home;
