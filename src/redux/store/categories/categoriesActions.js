import { setError } from "./categoriesSlice";

export const fillCategoriesAction = () => async (dispatch) => {
    try {
        
    } catch (error) {
        console.log(error);
        dispatch(setError({
            error: true,
            code: error.code,
            message: error.message
        }))
    }
    
}