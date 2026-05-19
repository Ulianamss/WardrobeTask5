import { useState, useCallback, useMemo } from 'react';
import { useGetProductsQuery } from '../store/api';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, addToWardrobe, addToWishlist } from '../store/wardrobeSlice';
import {ProductCard} from '../components/ProductCard';
import styles from './CatalogPage.module.css';

export function CatalogPage() {
  console.log('CatalogPage rendered');
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.wardrobe.favorites);
  const wardrobeItems = useSelector((state) => state.wardrobe.wardrobeItems);
  const wishlist = useSelector((state) => state.wardrobe.wishlist);

  const [search, setSearch] = useState('');
  const [skip, setSkip] = useState(0);
  const limit = 12;

  const { data, isLoading, isError } = useGetProductsQuery({
    skip,
    limit,
    search,
  });

  const wardrobeIds = useMemo(
    () => wardrobeItems.map((item) => item.id),
    [wardrobeItems]
  );

  const wishlistIds = useMemo(
    () => wishlist.map((item) => item.id),
    [wishlist]
  );

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
    setSkip(0);
  }, []);

  const handleToggleFavorite = useCallback((id) => {
    dispatch(toggleFavorite(id));
  }, [dispatch]);

  const handleAddToWardrobe = useCallback((product) => {
    dispatch(
      addToWardrobe({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
        brand: product.brand || '',
        category: product.category || '',
        rating: product.rating || 0,
        description: product.description || '',
      })
    );
  }, [dispatch]);

  const handleAddToWishlist = useCallback((product) => {
    dispatch(
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
        brand: product.brand || '',
        category: product.category || '',
      })
    );
  }, [dispatch]);

  return (
    <div className={styles.catalogPage}>
      <div className={styles.header}>
        <h1>Product Catalog</h1>
        <p className={styles.subtitle}>
          Browse products and add them to your wardrobe or wishlist
        </p>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      {isLoading && <div className={styles.loading}>Loading products...</div>}
      {isError && (
        <div className={styles.error}>
          Failed to load products. Check your internet connection.
        </div>
      )}

      {data && data.products && (
        <>
          <div className={styles.resultInfo}>
            Showing {skip + 1}-{Math.min(skip + limit, data.total)} of {data.total} products
          </div>

          <div className={styles.grid}>
            {data.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                isInWardrobe={wardrobeIds.includes(product.id)}
                isInWishlist={wishlistIds.includes(product.id)}
                onToggleFavorite={() => handleToggleFavorite(product.id)}
                onAddToWardrobe={() => handleAddToWardrobe(product)}
                onAddToWishlist={() => handleAddToWishlist(product)}
                linkBase="/catalog"
              />
            ))}
          </div>

          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              disabled={skip === 0}
              onClick={() => setSkip(Math.max(0, skip - limit))}
            >
              Previous
            </button>
            <span className={styles.pageInfo}>
              Page {Math.floor(skip / limit) + 1} of {Math.ceil(data.total / limit)}
            </span>
            <button
              className={styles.pageBtn}
              disabled={skip + limit >= data.total}
              onClick={() => setSkip(skip + limit)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}