import { Text, Button } from "react-native";
const MapScren = ({ navigation }) => {
  const onExitBtnPress = () => {
    navigation.navigate("LMapScren");
  };
  return <Text>MapScren</Text>;
};
export default MapScren;
