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
} from "react-native";
import { useState } from "react";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pswdVisible, setPswdVisible] = useState(true);
  const [bordColorEm, setBordColorEm] = useState("#E8E8E8");
  const [bordColorPsw, setBordColorPsw] = useState("#E8E8E8");

  const credentials = { email, password };

  const onLoginHandle = () => {
    console.log(credentials);
    setPassword("");
    setEmail("");
    navigation.navigate("Home");
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
            <Text style={styles.loginHeader}>Войти</Text>

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

            <TouchableOpacity style={styles.loginBtn} onPress={onLoginHandle}>
              <Text style={styles.btnText}>Войти</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={styles.registerText}>
                Нет аккаунта? Зарегистрироваться
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

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
    flex: 0.6,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: "#fff",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  loginHeader: {
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
