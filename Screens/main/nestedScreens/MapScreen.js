import { Text, Button } from "react-native";
import MapView from "react-native-maps";
const MapScreen = ({ navigation }) => {
  const onExitBtnPress = () => {
    navigation.navigate("LMapScren");
  };
  return <Text>MapScreen</Text>;
};
export default MapScreen;
