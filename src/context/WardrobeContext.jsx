// Data management
import React, { createContext, useState, useCallback } from 'react';
import { clothingService, looksService, wishlistService, profileService } from '../services/api';

export const WardrobeContext = createContext();

export const WardrobeProvider = ({ children }) => {
  const [clothes, setClothes] = useState([]);
  const [looks, setLooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all data
  const loadData = useCallback(async (userId) => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const [clothesData, looksData, wishlistData, profileData] = await Promise.all([
        clothingService.getAll(userId),
        looksService.getAll(userId),
        wishlistService.getAll(userId),
        profileService.getProfile(userId),
      ]);

      setClothes(clothesData);
      setLooks(looksData);
      setWishlist(wishlistData);
      setProfile(profileData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Clothing operations
  const addClothing = async (userId, data) => {
    try {
      setLoading(true);
      const newItem = await clothingService.create(userId, data);
      setClothes([...clothes, newItem]);
      return newItem;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateClothing = async (userId, id, data) => {
    try {
      setLoading(true);
      const updated = await clothingService.update(id, userId, data);
      setClothes(clothes.map(item => item.id === id ? updated : item));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteClothing = async (userId, id) => {
    try {
      setLoading(true);
      await clothingService.delete(id, userId);
      setClothes(clothes.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Looks operations
  const addLook = async (userId, data) => {
    try {
      setLoading(true);
      const newLook = await looksService.create(userId, data);
      setLooks([...looks, newLook]);
      return newLook;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteLook = async (userId, id) => {
    try {
      setLoading(true);
      await looksService.delete(id, userId);
      setLooks(looks.filter(look => look.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Wishlist operations
  const addToWishlist = async (userId, data) => {
    try {
      setLoading(true);
      const newItem = await wishlistService.create(userId, data);
      setWishlist([...wishlist, newItem]);
      return newItem;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (userId, id) => {
    try {
      setLoading(true);
      await wishlistService.delete(id, userId);
      setWishlist(wishlist.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Profile operations
  const updateProfile = async (userId, data) => {
    try {
      setLoading(true);
      const updated = await profileService.updateProfile(userId, data);
      setProfile(updated);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    clothes, looks, wishlist, profile,
    loading, error,
    loadData,
    addClothing, updateClothing, deleteClothing,
    addLook, deleteLook,
    addToWishlist, removeFromWishlist,
    updateProfile,
  };

  return (
    <WardrobeContext.Provider value={value}>
      {children}
    </WardrobeContext.Provider>
  );
};
