import { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWardrobe, toggleFavorite } from '../store/wardrobeSlice';
import { Link } from 'react-router-dom';
import styles from './WardrobePage.module.css';

export function WardrobePage() {
  const dispatch = useDispatch();
  const wardrobeItems = useSelector((state) => state.wardrobe.wardrobeItems || []);
  const favorites = useSelector((state) => state.wardrobe.favorites || []);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggleFavorite = useCallback((id) => {
    dispatch(toggleFavorite(id));
  }, [dispatch]);

  const handleRemoveFromWardrobe = useCallback((id) => {
    dispatch(removeFromWardrobe(id));
  }, [dispatch]);

  const filteredItems = useMemo(() => {
    return wardrobeItems.filter((item) => {
      if (!item) return false;

      const title = item.title || '';
      const brand = item.brand || '';
      const category = item.category || '';

      const matchesSearch =
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.toLowerCase().includes(searchTerm.toLowerCase());

      if (filter === 'favorites') {
        return matchesSearch && favorites.includes(item.id);
      }

      return matchesSearch;
    });
  }, [wardrobeItems, searchTerm, filter, favorites]);

  return (
    <div className={styles.wardrobePage}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1>My Wardrobe</h1>
          <span className={styles.count}>{wardrobeItems.length} items</span>
        </div>
        <p className={styles.subtitle}>Your personal collection of items</p>

        <div className={styles.controls}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search your wardrobe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className={styles.filterBtns}>
            <button
              className={filter === 'all' ? styles.filterBtnActive : styles.filterBtn}
              onClick={() => setFilter('all')}
            >
              All ({wardrobeItems.length})
            </button>
            <button
              className={filter === 'favorites' ? styles.filterBtnActive : styles.filterBtn}
              onClick={() => setFilter('favorites')}
            >
              Favorites
            </button>
          </div>
        </div>
      </div>

      {wardrobeItems.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>Your wardrobe is empty</h2>
          <p>Start adding items from the catalog.</p>
          <Link to="/catalog" className={styles.browseLink}>
            Browse Catalog
          </Link>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>No matching items</h2>
          <p>Try changing search term or filter.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredItems.map((item) => {
            const isFav = favorites.includes(item.id);
            return (
              <div key={item.id} className={styles.itemCard}>
                <div className={styles.imageContainer}>
                  <img src={item.image || item.thumbnail} alt={item.title} />
                  {isFav && <span className={styles.favBadge}>❤️</span>}
                </div>
                <div className={styles.itemContent}>
                  <h3>{item.title}</h3>
                  <p>{item.brand || item.category}</p>
                  <p>${item.price}</p>
                  <div className={styles.itemActions}>
                    <button onClick={() => handleToggleFavorite(item.id)}>
                      {isFav ? 'Unfavorite' : 'Favorite'}
                    </button>
                    <button 
                      className={styles.removeBtn}
                      onClick={() => handleRemoveFromWardrobe(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}