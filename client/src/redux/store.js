// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Path to your authSlice
import serviceReducer from './slices/serviceSlice'; // Path to your authSlice
import blogReducer from './slices/blogSlice'; // Path to your authSlice
import masterReducer from './slices/masterSlice'; // Path to your authSlice

const store = configureStore({
  reducer: {
    auth: authReducer,
   
    blogs: blogReducer,
    service: serviceReducer,
    master: masterReducer,
    
  },
});

// Export the store as default
export default store;
