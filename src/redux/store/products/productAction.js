
import { createAProductInCollection } from "../../../service/productsService";
import { addProduct, setError } from "./productsSlice";


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