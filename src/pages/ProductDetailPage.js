import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery } from '../store/api';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, addToWardrobe, addToWishlist } from '../store/wardrobeSlice';
import styles from './ProductDetailPage.module.css';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  const favorites = useSelector((state) => state.wardrobe.favorites);
  const wardrobeItems = useSelector((state) => state.wardrobe.wardrobeItems);
  const wishlist = useSelector((state) => state.wardrobe.wishlist);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading product details...</div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>Product not found</p>
          <button className={styles.backBtn} onClick={() => navigate('/catalog')}>
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.includes(product.id);
  const isInWardrobe = wardrobeItems.some((item) => item.id === product.id);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleAddToWardrobe = () => {
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

  const handleAddToWishlist = () => {
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

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product.id));
  };

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate('/catalog')}>
        &larr; Back to Catalog
      </button>

      <div className={styles.detailCard}>
        <div className={styles.imageSection}>
          <img
            className={styles.mainImage}
            src={product.thumbnail}
            alt={product.title}
          />
          {product.images && product.images.length > 1 && (
            <div className={styles.gallery}>
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.title} view ${idx + 1}`}
                  className={styles.galleryImage}
                />
              ))}
            </div>
          )}
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.productTitle}>{product.title}</h1>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.specs}>
            <div className={styles.spec}>
              <span className={styles.label}>Price:</span>
              <span className={styles.priceValue}>${product.price}</span>
            </div>
            {product.brand && (
              <div className={styles.spec}>
                <span className={styles.label}>Brand:</span>
                <span className={styles.value}>{product.brand}</span>
              </div>
            )}
            <div className={styles.spec}>
              <span className={styles.label}>Category:</span>
              <span className={styles.value}>{product.category}</span>
            </div>
            {product.rating && (
              <div className={styles.spec}>
                <span className={styles.label}>Rating:</span>
                <span className={styles.value}>{product.rating.toFixed(1)} / 5</span>
              </div>
            )}
            <div className={styles.spec}>
              <span className={styles.label}>Stock:</span>
              <span className={product.stock > 0 ? styles.inStock : styles.outOfStock}>
                {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
              </span>
            </div>
            {product.discountPercentage > 0 && (
              <div className={styles.spec}>
                <span className={styles.label}>Discount:</span>
                <span className={styles.discount}>
                  -{Math.round(product.discountPercentage)}%
                </span>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <button
              className={isInWardrobe ? styles.btnActive : styles.btn}
              onClick={handleAddToWardrobe}
            >
              {isInWardrobe ? 'Already in Wardrobe' : 'Add to Wardrobe'}
            </button>
            <button
              className={isInWishlist ? styles.btnWishActive : styles.btnWish}
              onClick={handleAddToWishlist}
            >
              {isInWishlist ? 'Already in Wishlist' : 'Add to Wishlist'}
            </button>
            <button
              className={isFavorite ? styles.btnFavActive : styles.btnFav}
              onClick={handleToggleFavorite}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;