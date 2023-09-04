import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './auth/authReducer';
import productsReducer from './products/productsSlice';
import categoriesReducer from './categories/categoriesSlice';


//import productReducer from '../redux/productReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    categories: categoriesReducer,
    //productReducer
    },
  middleware: [thunk]
});
  
export default store;