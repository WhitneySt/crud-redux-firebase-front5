import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './auth/authReducer';


//import productReducer from '../redux/productReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    //productReducer
    },
  middleware: [thunk]
});
  
export default store;