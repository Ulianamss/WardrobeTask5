import { useState } from 'react';
import { useGetProductsQuery } from '../store/api';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, addToWardrobe, addToWishlist } from '../store/wardrobeSlice';
import ProductCard from '../components/ProductCard';
import styles from './CatalogPage.module.css';

function CatalogPage() {
  var dispatch = useDispatch();
  var favorites = useSelector(function (state) {
    return state.wardrobe.favorites;
  });
  var wardrobeItems = useSelector(function (state) {
    return state.wardrobe.wardrobeItems;
  });
  var wishlist = useSelector(function (state) {
    return state.wardrobe.wishlist;
  });

  var wardrobeIds = wardrobeItems.map(function (item) {
    return item.id;
  });
  var wishlistIds = wishlist.map(function (item) {
    return item.id;
  });

  var [search, setSearch] = useState('');
  var [skip, setSkip] = useState(0);
  var limit = 12;

  var { data, isLoading, isError } = useGetProductsQuery({
    skip: skip,
    limit: limit,
    search: search,
  });

  var handleSearch = function (e) {
    setSearch(e.target.value);
    setSkip(0);
  };

  var handleAddToWardrobe = function (product) {
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
  };

  var handleAddToWishlist = function (product) {
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
  };

  var handleToggleFavorite = function (id) {
    dispatch(toggleFavorite(id));
  };

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
            Showing {skip + 1}-{Math.min(skip + limit, data.total)} of {data.total}{' '}
            products
          </div>

          <div className={styles.grid}>
            {data.products.map(function (product) {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  isInWardrobe={wardrobeIds.includes(product.id)}
                  isInWishlist={wishlistIds.includes(product.id)}
                  onToggleFavorite={function () {
                    handleToggleFavorite(product.id);
                  }}
                  onAddToWardrobe={function () {
                    handleAddToWardrobe(product);
                  }}
                  onAddToWishlist={function () {
                    handleAddToWishlist(product);
                  }}
                  linkBase="/catalog"
                />
              );
            })}
          </div>

          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              disabled={skip === 0}
              onClick={function () {
                setSkip(Math.max(0, skip - limit));
              }}
            >
              Previous
            </button>
            <span className={styles.pageInfo}>
              Page {Math.floor(skip / limit) + 1} of {Math.ceil(data.total / limit)}
            </span>
            <button
              className={styles.pageBtn}
              disabled={skip + limit >= data.total}
              onClick={function () {
                setSkip(skip + limit);
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CatalogPage;
