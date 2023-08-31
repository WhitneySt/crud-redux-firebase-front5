import { auth } from "../firebase/firebaseConfig";
import { setError, setIsLogged, setUserLogged } from "./authReducer";
import {
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import loginFromFirestore from "../service/loginFromCollection"; 


//Crear accion que nos va a permitir iniciar sesión con el código de verificación

export const loginWithCode = (code) => {
    return async (dispatch) => {
        const confirmationResult = window.confirmationResult;
        try {
            confirmationResult.confirm(code).then((result) => {
                const user = result.user.auth.currentUser;
                const authUser = {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber,
                    accessToken: user.accessToken
                }
                console.log(user);
                dispatch(setUserLogged(authUser));
                dispatch(setIsLogged(true));
            })
        } catch (error) {
            console.log(error);
            dispatch(setError({
                error: true,
                code: error.code,
                message: error.message
            }))
        }
    }
}

export const login = () => {
    const provider = new GoogleAuthProvider();
    return async (dispatch) => {
        try {
            const userCredential = await signInWithPopup(auth, provider);
            console.log("respuesta de google", userCredential);
            const { user } = userCredential;
            const {user: userLogged, error} = await loginFromFirestore(user);
            // let userLogged = await getUserFromCollection(userCredential.user.uid);
            // if (!userLogged) {
            //     const id = userCredential.user.uid;
            //     const newUser = {
            //         displayName: user.displayName,
            //         photoURL: user.photoURL,
            //         accessToken: user.accessToken
            //     };
            //     await createAnUserInCollection(id, newUser);
            //     userLogged = {
            //         id,
            //         ...newUser
            //     }
            // } 
            if (userLogged) {
                
                dispatch(setUserLogged(userLogged));
                dispatch(setIsLogged(true));
            } else {
                dispatch(setError({
                    error: true,
                    ...error
                }))
            }
        } catch (error) {
            console.log("error", error.error);
            dispatch(setError({
                error: true,
                code: error.code,
                message: error.message
            }))
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        try {
            await signOut(auth)
            dispatch(setUserLogged(null));
            dispatch(setIsLogged(false));
        } catch (error) {
            console.log("error", error.error);
        }
    };
}