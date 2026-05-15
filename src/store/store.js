import { configureStore } from '@reduxjs/toolkit';
import { wardrobeApi } from './api';
import wardrobeReducer from './wardrobeSlice';

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState().wardrobe;
  try {
    const toSave = {
      profile: state.profile,
      wardrobeItems: state.wardrobeItems,
      favorites: state.favorites,
      wishlist: state.wishlist,
      looks: state.looks,
    };
    localStorage.setItem('wardrobeState', JSON.stringify(toSave));
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
  }
  return result;
};

export const store = configureStore({
  reducer: {
    wardrobe: wardrobeReducer,
    [wardrobeApi.reducerPath]: wardrobeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wardrobeApi.middleware, localStorageMiddleware),
});
