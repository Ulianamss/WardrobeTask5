import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const saved = localStorage.getItem('wardrobeState');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.error('Failed to load state from localStorage:', err);
  }
  return null;
};

const defaultState = {
  profile: {
    name: 'My Wardrobe',
    bio: 'Fashion lover',
    avatar: 'https://dummyjson.com/icon/emilys/128',
  },
  wardrobeItems: [],
  favorites: [],
  wishlist: [],
  looks: [],
  notification: null,
};

const savedState = loadState();
const initialState = savedState
  ? { ...defaultState, ...savedState, notification: null }
  : defaultState;

const wardrobeSlice = createSlice({
  name: 'wardrobe',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },

    addToWardrobe: (state, action) => {
      const item = action.payload;
      if (!state.wardrobeItems.find((w) => w.id === item.id)) {
        state.wardrobeItems.push(item);
        state.notification = {
          message: '"' + item.title + '" added to your wardrobe',
          type: 'success',
        };
      } else {
        state.notification = {
          message: '"' + item.title + '" is already in your wardrobe',
          type: 'info',
        };
      }
    },

    removeFromWardrobe: (state, action) => {
      const id = action.payload;
      const item = state.wardrobeItems.find((w) => w.id === id);
      state.wardrobeItems = state.wardrobeItems.filter((w) => w.id !== id);
      state.favorites = state.favorites.filter((fid) => fid !== id);
      if (item) {
        state.notification = {
          message: '"' + item.title + '" removed from wardrobe',
          type: 'info',
        };
      }
    },

    toggleFavorite: (state, action) => {
      const itemId = action.payload;
      if (state.favorites.includes(itemId)) {
        state.favorites = state.favorites.filter((id) => id !== itemId);
        state.notification = { message: 'Removed from favorites', type: 'info' };
      } else {
        state.favorites.push(itemId);
        state.notification = { message: 'Added to favorites', type: 'success' };
      }
    },

    addToWishlist: (state, action) => {
      const item = action.payload;
      if (!state.wishlist.find((w) => w.id === item.id)) {
        state.wishlist.push(item);
        state.notification = {
          message: '"' + item.title + '" added to wishlist',
          type: 'success',
        };
      } else {
        state.notification = {
          message: '"' + item.title + '" is already in your wishlist',
          type: 'info',
        };
      }
    },

    removeFromWishlist: (state, action) => {
      const id = action.payload;
      const item = state.wishlist.find((w) => w.id === id);
      state.wishlist = state.wishlist.filter((w) => w.id !== id);
      if (item) {
        state.notification = {
          message: '"' + item.title + '" removed from wishlist',
          type: 'info',
        };
      }
    },

    addLook: (state, action) => {
      state.looks.push({
        id: Date.now(),
        ...action.payload,
      });
      state.notification = {
        message: 'Look "' + action.payload.name + '" created',
        type: 'success',
      };
    },

    removeLook: (state, action) => {
      state.looks = state.looks.filter((look) => look.id !== action.payload);
      state.notification = { message: 'Look deleted', type: 'info' };
    },

    showNotification: (state, action) => {
      state.notification = action.payload;
    },

    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const {
  setProfile,
  addToWardrobe,
  removeFromWardrobe,
  toggleFavorite,
  addToWishlist,
  removeFromWishlist,
  addLook,
  removeLook,
  showNotification,
  clearNotification,
} = wardrobeSlice.actions;

export default wardrobeSlice.reducer;
