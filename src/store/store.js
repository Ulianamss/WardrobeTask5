import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { wardrobeApi } from './api';
import wardrobeReducer from './wardrobeSlice';

const persistConfig = {
  key: 'wardrobe',
  storage,
  blacklist: ['notification'],
};

const persistedReducer = persistReducer(persistConfig, wardrobeReducer);

export const store = configureStore({
  reducer: {
    wardrobe: persistedReducer,
    [wardrobeApi.reducerPath]: wardrobeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(wardrobeApi.middleware),
});

export const persistor = persistStore(store);