import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { Entypo, AntDesign, } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const { name, avatURL } = useSelector((state) => state.auth);

 
  return <View style ={st.cont}><ImageBackground
        source={require("../../assets/images/photoBg.jpg")}
        style={st.image}
  >
    <View style={st.profileCont}>
      <View style={st.avatCont}>
       {avatURL&& <Image source={{ uri: avatURL }} style={{width:"100%", height:"100%",borderRadius:16}}></Image>}
        <TouchableOpacity style={st.remAvatBtn}><AntDesign name="close" size={15} color="#bdbdbd" /></TouchableOpacity>
      </View>
      <TouchableOpacity style={st.exitBtnCont}><Entypo
             
              name="log-out"
              size={24}
              color="#BDBDBD"
            /></TouchableOpacity>
       
      <Text style={st.profileName}>{name}</Text>
    </View>
  </ImageBackground></View>;
};
export default ProfileScreen;

const st = StyleSheet.create({cont:{flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
  justifyContent: "center",
},
image: {
    flex: 1,
    // justifyContent: "flex-end",
  
    resizeMode: "cover",
    height: "100%",
  width: "100%",
    // paddingTop:118,
  },
  profileCont: {
    alignItems:"center",
    flex: 1,
  marginTop:120,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  }
  , avatCont: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginTop: -92,
  }, profileName: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    marginTop: 32,
  },
  exitBtnCont: {
    position: "absolute",
    top: 24, right:19,
  },
  remAvatBtn: {
    width: 25, height: 25, borderWidth: 1, borderColor: `"#e8e8e8"`, backgroundColor: "#fff", borderRadius: 13, alignItems: "center", justifyContent: "center",
 position:"absolute",bottom:15,right:-12.5 }
})