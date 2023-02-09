import { useState, useEffect } from "react";
import {
  MaterialIcons,
  Feather,
  AntDesign,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { Text, View, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

import { db } from "../../../firebase/config";
import { collection, getDocs,setDoc,doc, onSnapshot } from "firebase/firestore";


const DefaultPostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const { name, email, avatURL, userId } = useSelector(state => state.auth)

  const getAllPosts = async () => {
    
    await onSnapshot(collection(db, "posts"), (querySnapshot) => {
      setPosts([]);
      querySnapshot.forEach((doc) => 
        setPosts((prevState) => ([...prevState, { ...doc.data(), docId: doc.id }]))
      )
    }
    )
  }

  useEffect(() => {
    getAllPosts();
  
  }, []);




  const renderPosts = ({ item }) => {

    const addLike = async (postId) => {
      const currArr = item.likes ? item.likes : [];
    const likesArr = [...currArr, userId ]
    setDoc(doc(db,"posts", item.docId), {likes:likesArr},{merge:true})
    }
    
    const removeLike = async (postId) => {
      const likesArr = item.likes.filter(value => value !== userId);
      setDoc(doc(db,"posts", item.docId), {likes:likesArr},{merge:true})
}
    
    
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
          <View 
            style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Comments", { imgUri: item.downloadURl, postId: item.docId })}
              style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather 
              name="message-circle"
              size={18}
              color="rgba(189, 189, 189, 1)"
            />
              <Text style={st.commNumber}>{item.comments?.length || 0}</Text></TouchableOpacity>
            <View style={{ marginLeft: 15 }}>
              {item.likes?.some(value => value === userId) || false ? <Ionicons
                onPress={()=> removeLike(item.docId)}
                name="thumbs-up" size={20} color="#FF6C00" /> : <Ionicons
                onPress={()=> addLike(item.docId)}
                name="thumbs-up-outline" size={18} color="rgba(189, 189, 189, 1)" />}
             </View>
          
          </View>
          <TouchableOpacity
            onPress={()=>navigation.navigate("Map",{locat:{latitude:item.location.latitude,longitude:item.location.longitude},photoTitle:item.postDescription})} 
            style={{ flexDirection: "row" }}>
            <Octicons
              
              name="location"
              size={18}
              color="rgba(189, 189, 189, 1)"
            />
            <Text
              style={st.locText}
            >{`${item.location.region}, ${item.location.country}`}</Text>
          </TouchableOpacity>
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
