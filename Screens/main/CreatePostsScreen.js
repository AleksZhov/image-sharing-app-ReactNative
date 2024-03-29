import {
  Text,
  Button,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  MaterialIcons,
  Feather,
  AntDesign,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";

import { uploadPhoto } from "../../firebase/storageUse";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../firebase/config";

const CreatePostsScreen =   ({ navigation }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
   
  const [errorMsg, setErrorMsg] = useState(null);
  const [locatPos, setLocatPos] = useState({});
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [postDescr, setPostDescr] = useState("");
  const isReadyToPubl = postDescr && photo;
  const [isShowCamera, setIsShowCamera] = useState(true);
  const { userId, name } = useSelector((state) => state.auth)

  if(!permission?.granted){requestPermission()}

  
  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

    })();
  }, []);
 
 

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    let { coords } = await Location.getCurrentPositionAsync();
    let place = await Location.reverseGeocodeAsync({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
   
    let positionData = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      region: place[0].region,
      country: place[0].country,
    };
    setLocatPos(positionData);
    setIsShowCamera(true)
  };

  const onPublishHandle = async() => {
    const downloadURl = await uploadPhoto(photo, userId);
    const docRef = await addDoc(collection(db, "posts"), {
      downloadURl, postDescription: postDescr,
      location: locatPos, userId, name, likes:[]
    })

    
    if (isReadyToPubl) {
      navigation.navigate("Posts", {
        screen: "DefaultPosts",
       
      });
    }
    setPhoto(null);
    setLocatPos({});
    setPostDescr(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={st.cont}>
        {isShowCamera ? (
          <View style={st.camera}>
            {photo && (
              <Image style={st.photoImg} source={{ uri: photo }}></Image>
            )}
            <TouchableOpacity
              onPress={() => setIsShowCamera(false)}
              style={st.btnCont}
            >
              <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        ) : (
          <Camera style={st.camera} ref={setCamera}>
            <TouchableOpacity
              onPress={() => {
                takePhoto();
              
              }}
              style={st.btnCont}
            >
              <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>
        )}
        {/* <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        > */}
        <Text style={st.cameraText}>Загрузите фото</Text>

        <TextInput
          style={st.postDescr}
          value={postDescr}
          onChangeText={setPostDescr}
          placeholder="Название"
        />

        <View style={st.locatCont}>
          <Octicons name="location" size={24} color="rgba(189, 189, 189, 1)" />
          <Text
            style={{
              ...st.locatText,
              color: locatPos.region ? "#212121" : "#BDBDBD",
            }}
          >
            {locatPos.region && locatPos.country
              ? `${locatPos.region}, ${locatPos.country}`
              : "Местность..."}
          </Text>
        </View>
        {/* </KeyboardAvoidingView> */}
        <TouchableOpacity
          style={{
            ...st.publBtn,
            backgroundColor: isReadyToPubl ? "#FF6C00" : "#F6F6F6",
          }}
        >
          <Text
            onPress={() => onPublishHandle()}
            style={{
              ...st.publBtnText,
              color: isReadyToPubl ? "#fff" : "#BDBDBD",
            }}
          >
            Опубликовать
          </Text>
        </TouchableOpacity>
        <View style={st.clearBtnCont}>
          <TouchableOpacity
            onPress={() => {
              setPhoto(null), setPostDescr(""), setLocatPos({});
            }}
            style={st.clearBtn}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default CreatePostsScreen;

const st = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  camera: {
    backgroundColor: "#f6f6f6",
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
  photoImg: {
    flex: 1,

    width: "100%",
  },
  btnCont: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraText: {
    marginTop: 8,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  postDescr: {
    flex: 1,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    color: "black",
    marginTop: 45,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  publBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: 51,
    marginTop: 32,
    borderRadius: 100,
  },
  publBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  clearBtn: {
    backgroundColor: "#f6f6f6",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 70,
    borderRadius: 20,
  },
  clearBtnCont: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 32,
    marginTop: 32,
  },
  locatCont: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingBottom: 15,
  },
  locatText: {
    marginLeft: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});
