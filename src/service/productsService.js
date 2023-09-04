import { addDoc, collection } from "firebase/firestore";
import { fireStore } from "../firebase/firebaseConfig";

const collectionName = "products";
const collectionRef = collection(fireStore, collectionName)

export const createAProductInCollection = async (newProduct) => {
    try {
        const product = await addDoc(collectionRef, newProduct);
        return {
            id: product.id,
            ...newProduct
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}