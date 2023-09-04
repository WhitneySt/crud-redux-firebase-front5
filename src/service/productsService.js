import { addDoc, collection, getDocs } from "firebase/firestore";
import { fireStore } from "../firebase/firebaseConfig";
import { searchDoc } from "./getUser";

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

export const getProductsFromCollection = async () => {
    const products = [];
    try {
        const querySnapshot = await getDocs(collectionRef);
        querySnapshot.forEach((doc) => {
            products.push({
                id: doc.id,
                ...doc.data()
            })
        });
        return products;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const searchProductsByNameFromCollection = async (searchTerm) => {
    try {
        const consult = {
            collectionName, fieldName: 'nameToLowerCase', searchTerm
        }
        const foundProducts = await searchDoc(consult);
        console.log(foundProducts);
        return foundProducts;
    } catch (error) {
        console.log(error);
        return [];
    }
    
}