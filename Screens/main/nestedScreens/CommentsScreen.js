import { Text, Button, View,Image,TextInput,TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import {
  AntDesign,
} from "@expo/vector-icons";
import { modifyDate } from "../../../helpers/modifyDate";
import { doc, getDoc, setDoc,onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";


const CommentsScreen = ({ navigation, route }) => {
  const { userId, avatURL } = useSelector(state => state.auth);

  const [photoUri, setPhotoUri] = useState(null);
  const [commentInpValue, setCommentInpValue] = useState(null);
  const [commInpBordColor, setCommInpBordColor] = useState("#E8E8E8");
  const [commentsArr, setCommentsArr] = useState([]);
  const { postId } = route.params;

  const getPostData = async () => {
    await onSnapshot(doc(db, "posts", postId),(doc)=>setCommentsArr(doc.data().comments || []))
  }

  
  useEffect(() => {
    if (route.params.imgUri !== null) { setPhotoUri(route.params.imgUri) };
    getPostData(); 
  }, [route.params])
  

  const toMakePost = () => {
    if(commentInpValue){const commentDate = new Date;
    const reqDate = modifyDate(commentDate)
    const comment = { text:commentInpValue, date: reqDate, userId, avatURL };
    setDoc(doc(db, "posts", postId), { comments:[...commentsArr, comment]},{merge:true})
  
    setCommentInpValue(null);}
  }

  const renderComments = ({ item }) => {

    return (
      <View
        style={userId === item.userId ? st.commentContCurrUsr : st.commentCont}
       
      >
        <View style={userId === item.userId ? st.commentAvtrCurrUsr : st.commentAvtr}><Image style={{ width: "100%", height: "100%", borderRadius: 14}} resizeMode="cover" source ={{uri: item.avatURL}}></Image></View>
      <View style={userId === item.userId ? st.commentTextContCurrUser:st.commentTextCont}>
            <Text style={st.commentText}>{item.text}</Text>
            <Text style={userId === item.userId ? st.commentTimeCurrUsr : st.commentTime}>{item.date}</Text>
      </View>
    </View>
   
   
  )}

  
  return <View style={st.cont}><Image style={st.postPhoto} source={{ uri: photoUri }} />
    <FlatList
      style={{marginBottom:30}}
      data={commentsArr}
      renderItem={renderComments}
      keyExtractor={(item, idx) => idx.toString()} />
    
     <View style={{ ...st.commInpCont, borderColor:`${commInpBordColor}` }}>
      <TextInput
        style={st.commInput}
          value={commentInpValue}
          onChangeText={setCommentInpValue}
          placeholder="Комментировать..."
        onFocus={() => setCommInpBordColor("#FF6C00")}
                onBlur={() => setCommInpBordColor("#E8E8E8")}/>
        <TouchableOpacity onPress={toMakePost} style={st.commInpBtn}><AntDesign name="arrowup" size={14} color="white" /></TouchableOpacity>
      </View>

  </View>;
  
};
export default CommentsScreen;

const st = StyleSheet.create({
  cont: {
    flex: 1,
    paddingTop:32,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingBottom: 50,
   
  },
  postPhoto: { height: 240, width: "100%", borderRadius: 8, marginBottom: 32 },
  
  commentCont: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  commentContCurrUsr: { flexDirection: "row-reverse", justifyContent: "space-between", marginBottom: 24 },
  
  commentAvtr: {
    height: 28, width: 28, backgroundColor: "grey", marginRight: 16, borderRadius: 14
  },
  commentAvtrCurrUsr:{height: 28, width: 28, backgroundColor: "grey", marginLeft: 16, borderRadius: 14},
  
  commentTextCont: { padding: 16, backgroundColor: "rgba(0,0,0,0.03)", flexGrow: 1, borderTopRightRadius: 8, borderBottomRightRadius: 8 },
  commentTextContCurrUser: { padding: 16, backgroundColor: "rgba(0,0,0,0.03)", flexGrow: 1, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
  
  commentText: { fontFamily: "Roboto-Regular", fontSize: 13, color: "#212121", marginBottom: 8, },

  commentTime: { fontFamily: "Roboto-Regular", fontSize: 10, color: "#bdbdbd", textAlign: "right" },
  commentTimeCurrUsr:{fontFamily: "Roboto-Regular", fontSize: 10, color: "#bdbdbd", textAlign: "left" },
  commInpCont: { backgroundColor: "#f6f6f6", minHeight: 50, borderRadius: 100, borderWidth:1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft:16,paddingRight:8, position: "absolute", bottom:16, marginHorizontal:16,width:"100%" },
  commInpBtn: { backgroundColor: "#FF6C00", width: 34, height: 34, borderRadius: 17, justifyContent: "center", alignItems: "center" },
  commInput:{fontFamily:"Roboto-Medium"}
  
})