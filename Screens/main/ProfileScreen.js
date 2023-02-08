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
  FlatList
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Entypo, AntDesign, Feather, Octicons, Ionicons,MaterialIcons} from "@expo/vector-icons";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { changeAvatarPhotoURL, authSignOut } from "../../redux/auth/authOperations";

const ProfileScreen = ({ navigation }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  if(!permission?.granted){requestPermission()}


  const dispatch = useDispatch();
  const { name, avatURL, userId } = useSelector((state) => state.auth);
 
  const [userPosts, setUserPosts] = useState([]);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isShowCamera, setIsShowCamera] = useState(false);
  
  
  const getUserPosts = async () => {
     
    const q =  query(collection(db, "posts"), where("userId", "==", userId));
    await onSnapshot(q, (querySnapshot) => {
      setUserPosts([]);
      querySnapshot.forEach((doc) => {
        setUserPosts((prevState) => [...prevState, { ...doc.data(), docId: doc.id }])
      });
    })
  }

  useEffect(() => {
    getUserPosts()
  }, []);

  const takeAvatarPhoto = async () => {
    const photoShot = await camera.takePictureAsync();
    setPhoto(photoShot.uri); 
    dispatch(changeAvatarPhotoURL(photoShot.uri));
    setIsShowCamera(false);
  }

  const changeAvatPhotoHandle = (photo) => {
    dispatch(changeAvatarPhotoURL(photo));
  }

  const renderUserPosts = ({ item }) => {
   
    return (<View style={st.postCont}>
      <Image style={st.postPhoto} source={{ uri: item.downloadURl }} />
      <Text style={st.postDescr}>{item.postDescription}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 11,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Feather onPress={() => navigation.navigate("Comments", { imgUri: item.downloadURl, postId: item.docId })}
            name="message-circle"
            size={18}
            color="#FF6C00"
          />
          <Text style={st.commNumber}>{item.comments?.length || 0}</Text>
          <Feather name="thumbs-up" size={18} color="#FF6C00" />
          <Text style={st.commNumber}>{item.likes?.length|| 0}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Octicons
            onPress={() => navigation.navigate("Map", { locat: { latitude: item.location.latitude, longitude: item.location.longitude }, photoTitle: item.postDescription })}
            name="location"
            size={18}
            color="rgba(189, 189, 189, 1)"
          />
          <Text
            style={st.locText}
          >{item.location.country}</Text>
        </View>
      </View>
    </View>)
}
 
  return <View style ={st.cont}><ImageBackground
        source={require("../../assets/images/photoBg.jpg")}
        style={st.image}
  >
    <View style={st.profileCont}>
      <View style={st.avatCont}>
         {isShowCamera&& <Camera style={st.camera} ref={setCamera}>
            <TouchableOpacity
              onPress={() => {
                takeAvatarPhoto();
                setIsShowCamera(false);
              }}
              
            >
              <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>}
        {avatURL && <Image source={{ uri: avatURL }} style={{ width: "100%", height: "100%", borderRadius: 16 }}></Image>}

        {(!isShowCamera && avatURL ===null) && <TouchableOpacity onPress={() => setIsShowCamera(true)} style={{ ...st.remAvatBtn, borderColor: "#FF6C00", }}><Ionicons name="md-add-outline" size={24} color="#FF6C00" /></TouchableOpacity>}
        
        {avatURL && <TouchableOpacity onPress={() => changeAvatPhotoHandle(null)} style={{ ...st.remAvatBtn,borderColor: "#e8e8e8", }}><AntDesign name="close" size={15} color="#bdbdbd" /></TouchableOpacity>}
      </View>
      <TouchableOpacity onPress={()=>dispatch(authSignOut())} style={st.exitBtnCont}><Entypo
             
              name="log-out"
              size={24}
              color="#BDBDBD"
            /></TouchableOpacity>
       
      <Text style={st.profileName}>{name}</Text>
       <FlatList
        data={userPosts}
        renderItem={renderUserPosts}
        keyExtractor={(item, idx) => idx.toString()}
      />
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
  },
  profileName: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    marginTop: 32,
    marginBottom:33,
  },
  exitBtnCont: {
    position: "absolute",
    top: 24, right:19,
  },
  remAvatBtn: {
    width: 25, height: 25, borderWidth: 1,  backgroundColor: "#fff", borderRadius: 13, alignItems: "center", justifyContent: "center",
    position: "absolute", bottom: 15, right: -12.5
  },
  postCont: { marginBottom: 32, width:343, flex:1 },
  postPhoto: { height: 240, width: "100%", borderRadius: 8 },
  postDescr: {
    marginTop: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
    marginBottom:10,
  },
  commNumber: {
    marginLeft: 9,
    color: "#212121",
    fontStyle: "Roboto-Regular",
    fontSize: 16,
    marginRight:8,
  },
  locText: {
    marginLeft: 13,
    textDecorationLine: "underline",
    color: "#212121",
    textDecorationColor: "#212121",
  },
  camera: { width: "100%", height: "100%", justifyContent:"center",alignItems:"center",borderRadius:16}
})