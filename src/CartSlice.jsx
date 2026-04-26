import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Inițializăm coșul ca un tablou gol
  },
  reducers: {
    // Adaugă un produs în coș sau crește cantitatea dacă există deja
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // Elimină un produs din coș pe baza numelui (payload va fi numele produsului)
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    // Actualizează cantitatea pentru un produs specific
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// Exportăm acțiunile pentru a fi folosite în ProductList.jsx și CartItem.jsx
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Exportăm reducer-ul pentru a fi configurat în store.js
export default CartSlice.reducer;
