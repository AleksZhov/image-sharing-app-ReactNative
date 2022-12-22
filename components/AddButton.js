import { Text, View, StyleSheet } from "react-native";
const AddBtn = () => {
  return (
    <View style={st.btnCont}>
      <Text style={st.addBtnText}>+</Text>
    </View>
  );
};

const st = StyleSheet.create({
  btnCont: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF6C00",
  },
  addBtnText: {
    fontSize: 25,
    color: "#ffffff",
    fontWeight: "100",
  },
});

export default AddBtn;
