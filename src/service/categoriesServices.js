import { collection, getDocs } from "firebase/firestore";
import { fireStore } from "../firebase/firebaseConfig";

const collectionName = "categories";
const collectionRef = collection(fireStore, collectionName);

export const getCategoriesFromCollection = async () => {
    const categories = [];
    try {
        const querySnapshot = await getDocs(collectionRef);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            categories.push({
                id: doc.id,
                ...doc.data()
            })
        });
        return categories;
    } catch (error) {
        console.log(error);
        return null;
    }
}