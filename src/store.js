import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// Configurarea magazinului (store) Redux
const store = configureStore({
    reducer: {
        // 'cart' este numele slice-ului și este gestionat de cartReducer din CartSlice.jsx
        cart: cartReducer,
    },
});

export default store;
