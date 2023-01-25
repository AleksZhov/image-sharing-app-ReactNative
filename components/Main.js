import { useSelector, useDispatch} from "react-redux";

import { useState, useEffect, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import * as SplashScreen from "expo-splash-screen";
// SplashScreen.preventAutoHideAsync();

import useRoute from "../router";
import db from "../firebase/config"
import { authStateChangeUser } from "../redux/auth/authOperations";

const Main = () => {
    const [user, setUser] = useState(null);
  

db.auth().onAuthStateChanged((user) => setUser(user))

    
    const {stateChange} = useSelector(state => state.auth)
    
    const routing = useRoute(stateChange);

    const dispatch = useDispatch();
    
    useEffect(() => {
      
    dispatch(authStateChangeUser())
    
    }, [])
    



    return ( 
   
        <NavigationContainer >
      {routing}
    </NavigationContainer>
)}

export default Main;