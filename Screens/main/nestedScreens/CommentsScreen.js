import { Text, Button, View,Image,TextInput,TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import {
  AntDesign,
} from "@expo/vector-icons";

const CommentsScreen = ({ navigation , route}) => {
  const [photoUri, setPhotoUri] = useState(null);
  const [commentInpValue, setCommentInpValue] = useState(null);
  const [commInpBordColor, setCommInpBordColor] = useState("#E8E8E8")
  
  useEffect(() => {
   
    if (route.params.imgUri!==null) { setPhotoUri(route.params.imgUri) }
  }, [route.params])
  
  
  return <View style={st.cont}><Image style={st.postPhoto} source={{ uri: photoUri }} />
    <View style={st.commentCont}>
      <View style={st.commentAvtr}></View>
      <View style={st.commentTextCont}>
        <Text style = {st.commentText}>Thank You! That was very helpfull</Text>
        <Text style = {st.commentTime}>09 июня, 2020 | 08:40</Text>
      </View>
    </View>
    <View style={{ ...st.commInpCont, borderColor:`${commInpBordColor}` }}>
      <TextInput
        style={st.commInput}
          value={commentInpValue}
          onChangeText={setCommentInpValue}
          placeholder="Комментировать..."
        onFocus={() => setCommInpBordColor("#FF6C00")}
                onBlur={() => setCommInpBordColor("#E8E8E8")}/>
        <TouchableOpacity style={st.commInpBtn}><AntDesign name="arrowup" size={14} color="white" /></TouchableOpacity>
      </View>

    <Text>CommentsScreen</Text></View>;
};
export default CommentsScreen;

const st = StyleSheet.create({
  cont: {
    flex: 1,
    paddingTop:32,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingBottom: 32,
   
  },
  postPhoto: { height: 240, width: "100%", borderRadius: 8 , marginBottom:32},
  commentCont: { flexDirection: "row", justifyContent: "space-between" },
  commentAvtr: {
    height: 28, width: 28, backgroundColor: "grey", marginRight: 16, borderRadius:14},
  commentTextCont: { padding: 16, backgroundColor: "rgba(0,0,0,0.03)", flexGrow: 1, borderTopRightRadius: 8, borderBottomRightRadius: 8 },
  commentText: { fontFamily: "Roboto-Regular", fontSize: 13, color: "#212121", marginBottom: 8, },
  commentTime: { fontFamily: "Roboto-Regular", fontSize: 10, color: "#bdbdbd", textAlign: "right" },
  commInpCont: { backgroundColor: "#f6f6f6", minHeight: 50, borderRadius: 100, borderWidth:1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft:16,paddingRight:8 },
  commInpBtn: { backgroundColor: "#FF6C00", width: 34, height: 34, borderRadius: 17, justifyContent: "center", alignItems: "center" },
  commInput:{fontFamily:"Roboto-Medium"}
  
})