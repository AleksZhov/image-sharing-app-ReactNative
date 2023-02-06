import { useState, useEffect } from "react";
import {
  MaterialIcons,
  Feather,
  AntDesign,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { Text, View, FlatList, Image, StyleSheet } from "react-native";

import { db } from "../../../firebase/config";
import { collection, getDocs } from "firebase/firestore";


const DefaultPostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const { name, email, avatURL } = useSelector(state => state.auth)

  const getAllPosts = async () => {
    
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
 setPosts((prevState)=>([...prevState,{...doc.data(),docId:doc.id}]))  
});
  }

  useEffect(() => {
    getAllPosts();
  
  }, []);

  const renderPosts = ({ item }) => {
    const commentsArrLength = item.comments ? item.comments.length : 0;
    
    return (
      <View style={st.postCont}>
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
            <Feather onPress={() => navigation.navigate("Comments", { imgUri:item.downloadURl, postId:item.docId })}
              name="message-circle"
              size={18}
              color="rgba(189, 189, 189, 1)"
            />
            <Text style={st.commNumber}>{commentsArrLength}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Octicons
              onPress={()=>navigation.navigate("Map",{locat:{latitude:item.location.latitude,longitude:item.location.longitude},photoTitle:item.postDescription})} 
              name="location"
              size={18}
              color="rgba(189, 189, 189, 1)"
            />
            <Text
              style={st.locText}
            >{`${item.location.region}, ${item.location.country}`}</Text>
          </View>
        </View>
      </View>
    );
  };


  return (
    <View style={st.cont}>
      <View style={st.userCont}>
        <View style={st.photoCont}>
          {avatURL && <Image style = {{width:"100%", height:"100%",borderRadius:8}} source={{ uri: avatURL }}></Image>}
        </View>

        <View>
          <Text>{name}</Text>
          <Text>{email}</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPosts}
        keyExtractor={(item, idx) => idx.toString()}
      />
    </View>
  );
};
export default DefaultPostsScreen;

const st = StyleSheet.create({
  cont: {flex:1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingBottom: 32,
   
  },
  photoCont: {
    backgroundColor: "grey",
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 16,
  },
  userCont: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 32,
  },
  postCont: { marginBottom: 32 },
  postPhoto: { height: 240, width: "100%", borderRadius: 8 },
  postDescr: {
    marginTop: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
  },

  commNumber: {
    marginLeft: 9,
    color: "rgba(189, 189, 189, 1)",
    fontStyle: "Roboto-Regular",
    fontSize: 16,
  },
  locText: {
    marginLeft: 13,
    textDecorationLine: "underline",
    color: "#212121",
    textDecorationColor: "#212121",
  },
});
