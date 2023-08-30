import { auth } from "../firebase/firebaseConfig";
import { setError, setIsLogged, setUserLogged } from "./authReducer";
import {
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';


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
            dispatch(setUserLogged(userCredential));
            dispatch(setIsLogged(true));
        } catch (error) {
            console.log("error", error.error);
            dispatch(setIsLogged(false));
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