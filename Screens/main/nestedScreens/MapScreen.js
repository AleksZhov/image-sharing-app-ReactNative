import { View ,StyleSheet,Dimensions, TouchableOpacity, Text} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";

const MapScreen = ({ navigation, route }) => {

  const { latitude, longitude } = route.params.locat;
  console.log(latitude, longitude);
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);
  // useEffect(() => {
  //   if (route.params?.locat) {
  //     setLatitude(route.params.locat.latitude);
  //     setLongitude(route.params.locat.longitude);
  //   }
   
  // }, [route.params]);



  return <View styles={st.cont}>
    <TouchableOpacity style={st.backBtn} onPress={navigation.navigate("DefaultPosts")}><AntDesign  name="arrowleft" size={24} color="black" /></TouchableOpacity>
    <MapView
        style={st.mapStyle}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel = {15}
        // onMapReady={() => console.log("Map is ready")}
        // onRegionChange={() => console.log("Region change")}
      >
        <Marker
          title="I am here"
          coordinate={{ latitude, longitude}}
          description='Hello'
        />
      </MapView></View>;
  //  return <View style ={{flex:1, alignItems:"center", justifyContent:"center"}}><Text>Map View</Text>
  // <Text>Map View</Text>
  // <Text>Map View</Text>
  // <Text>Map View</Text>
  // <Text>Map View</Text>
  // <Text>Map View</Text></View>
};


const st = StyleSheet.create({cont:{ flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  justifyContent: "center",
},
mapStyle:{width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  backBtn: {
    width: 40, height: 40, borderWidth: 1, borderColor: "black", borderRadius: 20, alignItems: 'center',
    backgroundColor:"#fff",
  justifyContent:"center",position:"absolute", top: 20, left:20}
})

export default MapScreen;