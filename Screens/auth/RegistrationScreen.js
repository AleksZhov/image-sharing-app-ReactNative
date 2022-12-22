import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";

const RegistrationScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [isReady, setIsReady] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pswdVisible, setPswdVisible] = useState(true);
  const [bordColorNm, setBordColorNm] = useState("#E8E8E8");
  const [bordColorEm, setBordColorEm] = useState("#E8E8E8");
  const [bordColorPsw, setBordColorPsw] = useState("#E8E8E8");

  const credentials = { name, email, password };

  const onLoginHandle = () => {
    console.log(credentials);
    setName(""), setPassword("");
    setEmail("");
  };
  const pswdVisToggle = () => {
    setPswdVisible(!pswdVisible);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/photoBg.jpg")}
        style={styles.image}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginFormWrp}>
            <View
              style={{
                ...styles.imageCont,
                marginHorizontal: (width - 152) / 2,
              }}
            ></View>
            <Text style={styles.loginHeader}>Регистрация</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: `${bordColorNm}`,
                  marginBottom: 16,
                  paddingHorizontal: 16,
                  backgroundColor: "#F6F6F6",
                }}
              >
                <TextInput
                  style={styles.input}
                  onChangeText={setName}
                  value={name}
                  placeholder="Логин"
                  onFocus={() => setBordColorNm("#FF6C00")}
                  onBlur={() => setBordColorNm("#E8E8E8")}
                />
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: `${bordColorEm}`,
                  marginBottom: 16,
                  paddingHorizontal: 16,
                  backgroundColor: "#F6F6F6",
                }}
              >
                <TextInput
                  style={styles.input}
                  onChangeText={setEmail}
                  value={email}
                  placeholder="Адрес электронной почты"
                  onFocus={() => setBordColorEm("#FF6C00")}
                  onBlur={() => setBordColorEm("#E8E8E8")}
                />
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: `${bordColorPsw}`,

                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#F6F6F6",

                  paddingHorizontal: 16,
                }}
              >
                <TextInput
                  style={styles.input}
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Пароль"
                  secureTextEntry={pswdVisible}
                  onFocus={() => setBordColorPsw("#FF6C00")}
                  onBlur={() => setBordColorPsw("#E8E8E8")}
                />
                {password && (
                  <TouchableOpacity onPress={pswdVisToggle}>
                    <Text style={styles.pswdVisBtn}>
                      {pswdVisible ? "Показать" : "Скрыть"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity style={styles.loginBtn} onPress={onLoginHandle}>
              <Text style={styles.btnText}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.registerText}>Уже есть аккаунт? Войти</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
    height: "100%",
    width: "100%",
  },
  loginFormWrp: {
    flexShrink: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  imageCont: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginTop: -92,
  },
  loginHeader: {
    paddingTop: 32,
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    textAlign: "center",
    lineHeight: 35,
    marginBottom: 33,
  },
  input: {
    fontFamily: "Roboto-Bold",
    height: 50,
    fontSize: 16,
    lineHeight: 19,
  },
  loginBtn: {
    backgroundColor: "#FF6C00",
    paddingVertical: 16,
    borderRadius: 100,
    marginTop: 43,
    marginBottom: 16,
  },
  btnText: {
    fontFamily: "Roboto-Bold",
    textAlign: "center",
    color: "#fff",
  },
  registerText: {
    fontFamily: "Roboto-Bold",
    color: "#1B4371",
    textAlign: "center",
    paddingBottom: 16,
  },
  pswdVisBtn: { color: "#1B4371" },
});
