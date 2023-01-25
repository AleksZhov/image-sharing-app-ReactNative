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

const DefaultPostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const { name, email } = useSelector(state => state.auth)

  useEffect(() => {
    if (route.params?.post) {
      setPosts((prevState) => [...prevState, route.params.post]);
    }
    if (route.params?.user) {
      setUser(route.params.user);
    }
  }, [route.params]);

  const renderPosts = ({ item }) => {
    
    return (
      <View style={st.postCont}>
        <Image style={st.postPhoto} source={{ uri: item.photo }} />
        <Text style={st.postDescr}>{item.postDescr}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 11,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather onPress={() => navigation.navigate("Comments", { imgUri:item.photo })}
              name="message-circle"
              size={18}
              color="rgba(189, 189, 189, 1)"
            />
            <Text style={st.commNumber}>0</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Octicons
              onPress={()=>navigation.navigate("Map",{locat:{latitude:item.locatPos.latitude,longitude:item.locatPos.longitude},photoTitle:item.postDescr})} 
              name="location"
              size={18}
              color="rgba(189, 189, 189, 1)"
            />
            <Text
              style={st.locText}
            >{`${item.locatPos.region}, ${item.locatPos.country}`}</Text>
          </View>
        </View>
      </View>
    );
  };


  return (
    <View style={st.cont}>
      <View style={st.userCont}>
        <View style={st.photoCont}>
          {user?.photo && <Image source={{ uri: user.photo }}></Image>}
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
