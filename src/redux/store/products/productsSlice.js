import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    search: [],
    error: null
    
};
  
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        addProduct: (state, action) => {
            state.products = [
                ...state.products,
                action.payload
            ]
        },
        searchProducts: (state, action) => {
            state.search = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const { setProducts, addProduct, setError, searchProducts } = productsSlice.actions;
  
export default productsSlice.reducer;