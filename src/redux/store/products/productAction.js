
import { createAProductInCollection, getProductsFromCollection, searchProductsByNameFromCollection } from "../../../service/productsService";
import { addProduct, searchProducts, setError, setProducts } from "./productsSlice";


// export const createAProductAction = () => {
//     return async (dispatch) => {



//     }
// }

export const createAProductAction = (newProduct) => async (dispatch) => {
    try {
        const product = await createAProductInCollection(newProduct);
        dispatch(addProduct(product));
        dispatch(setError(false));
    } catch (error) {
        console.log(error);
        dispatch(setError({
            error: true,
            code: error.code,
            mesage: error.message
        }))
    }
}

export const fillProductsFromCollection = () => async (dispatch) => {
    try {
        const products = await getProductsFromCollection();
        dispatch(setProducts(products));
        dispatch(setError(false));
    } catch (error) {
        console.log(error);
        dispatch(setError({
            error: true,
            code: error.code,
            message: error.message
        }))
    }
}

export const searcProductsAction = (searchParam) => async (dispatch) => {
    try {
        const products = await searchProductsByNameFromCollection(searchParam.toLowerCase());
        dispatch(searchProducts(products));
        dispatch(setError(false));
    } catch (error) {
        console.log(error);
        dispatch(setError({
            error: true,
            code: error.code,
            message: error.message
        }))
    }
}