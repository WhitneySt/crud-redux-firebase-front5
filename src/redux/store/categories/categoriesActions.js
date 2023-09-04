import { getCategoriesFromCollection } from "../../../service/categoriesServices";
import { setCategories, setError } from "./categoriesSlice";

export const fillCategoriesAction = () => async (dispatch) => {
    try {
        const categories = await getCategoriesFromCollection();
        dispatch(setCategories(categories));
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