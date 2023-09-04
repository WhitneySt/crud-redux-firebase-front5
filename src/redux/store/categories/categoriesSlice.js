import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    error: null
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const { setCategories, setError } = categoriesSlice.actions;

export default categoriesSlice.reducer;