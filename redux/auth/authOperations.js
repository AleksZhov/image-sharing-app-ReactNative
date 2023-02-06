import { auth} from "../../firebase/config";
import { authSlice } from "./authReducer";
// import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged } from "firebase/auth";
import { uploadPhoto } from "../../firebase/storageUse";

const {updateUserProfile, authLogOut,authSetChange} = authSlice.actions


export const authSignUp = ({ email, password, name, photo }) => async (dispatch, getState) => { 
    
     try {
         const { user } = await createUserWithEmailAndPassword(auth, email, password);
         const avatarURL = await uploadPhoto(photo,user.uid)
        
         await updateProfile(user,{ displayName: name, photoURL:avatarURL });
         const {uid, displayName, photoURL} = await auth.currentUser;
         
         dispatch(updateUserProfile({userId:uid, name:displayName, userEmail:email, avatURL:photoURL}))
        
        
    } catch (error) {
        console.log("Sign up error", error),
            console.log("sign up error.message", error.message)
        
    }
} 


 export const authSignIn = ({ email, password }) => async (dispatch, getState) => {   try {
     const { user } = await signInWithEmailAndPassword(auth, email, password);

     
     const { uid, displayName, photoURL } = user;
     
     
      dispatch(updateUserProfile({userId:uid, name:displayName, userEmail:email, avatURL:photoURL}))
        
        
    } catch (error) {
        console.log("Sign up error", error),
            console.log("sign up error.message", error.message)
        
    }}



export const authSignOut = () => async (dispatch, getState) => { 
    await signOut(auth);
    dispatch(authLogOut())
}

export const authStateChangeUser = () => async (dispatch, getState) => {
    await onAuthStateChanged(auth,(user) => {
        if (user) {
            
            const userUpdateProfile = { name: user.displayName, userId: user.uid, userEmail:user.email, avatURL: user.photoURL};
            dispatch(updateUserProfile(userUpdateProfile));
            dispatch(authSetChange({ stateChange: true }));
}
    })
}


