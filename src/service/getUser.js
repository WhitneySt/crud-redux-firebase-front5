import { doc, getDoc, setDoc } from "firebase/firestore";
import { fireStore } from "../firebase/firebaseConfig";

const collectionName = "users";


//Obtenemos un usuario en la colección users
export const getUserFromCollection = async (uid) => {
    try {
        const userRef = doc(fireStore, collectionName, uid);
        const user = await getDoc(userRef);
        if (user.exists()) {
            console.log("Document data:", user.data());
            return {
                id: user.id,
                ...user.data()
            }
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
    
}

//Crear un usuario en la collection users

export const createAnUserInCollection = async(uid, newUser) => {
    try {
        const newUserRef = doc(fireStore, collectionName, uid);
        await setDoc(newUserRef, newUser);
        
    } catch (error) {
        console.log(error);
        return false;
    }
}