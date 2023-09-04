import { collection, doc, getDoc, getDocs, orderBy, query, setDoc,  where } from "firebase/firestore";
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

export const createAnUserInCollection = async (uid, newUser) => {
    try {
        const newUserRef = doc(fireStore, collectionName, uid);
        await setDoc(newUserRef, newUser);
        return {
            ok: true,
            user: {
                id: uid,
                ...newUser
            }
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

//------Prueba

export const searchDoc = async ({ collectionName, fieldName, searchTerm }) => {   

    const collectionRef = collection(fireStore, collectionName);
    const q = query(collectionRef, where(fieldName, ">=", searchTerm), where(fieldName, "<=", searchTerm + '\uf8ff'), orderBy(fieldName));    
    const result = []
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            result.push({
                id: doc.id,
                ...doc.data()
            })
        });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}