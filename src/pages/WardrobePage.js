import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWardrobe, toggleFavorite } from '../store/wardrobeSlice';
import { Link } from 'react-router-dom';
import styles from './WardrobePage.module.css';

function WardrobePage() {
  const dispatch = useDispatch();
  const wardrobeItems = useSelector((state) => state.wardrobe.wardrobeItems);
  const favorites = useSelector((state) => state.wardrobe.favorites);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = wardrobeItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.brand && item.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filter === 'favorites') {
      return matchesSearch && favorites.includes(item.id);
    }
    return matchesSearch;
  });

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
              Favorites (
              {wardrobeItems.filter((item) => favorites.includes(item.id)).length}
              )
            </button>
          </div>
        </div>
      </div>

      {wardrobeItems.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>W</div>
          <h2>Your wardrobe is empty</h2>
          <p>
            Start building your wardrobe by browsing the product catalog and adding items
            you like.
          </p>
          <Link to="/catalog" className={styles.browseLink}>
            Browse Catalog
          </Link>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>No items match your search</h2>
          <p>Try a different search term or filter.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredItems.map((item) => {
            const isFav = favorites.includes(item.id);
            return (
              <div key={item.id} className={styles.itemCard}>
                <div className={styles.imageContainer}>
                  <img src={item.image} alt={item.title} />
                  {isFav && <span className={styles.favBadge}>Fav</span>}
                </div>
                <div className={styles.itemContent}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemBrand}>{item.brand || item.category || ''}</p>
                  <p className={styles.itemPrice}>${item.price}</p>
                  <div className={styles.itemActions}>
                    <button
                      className={isFav ? styles.favActive : styles.favBtn}
                      onClick={() => dispatch(toggleFavorite(item.id))}
                    >
                      {isFav ? 'Unfavorite' : 'Favorite'}
                    </button>
                    <button
                      className={styles.removeBtn}
                      onClick={() => dispatch(removeFromWardrobe(item.id))}
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

export default WardrobePage;