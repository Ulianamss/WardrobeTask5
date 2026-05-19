import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';

export const ProductCard = memo(({
  product,
  isFavorite = false,
  isInWardrobe = false,
  isInWishlist = false,
  onToggleFavorite,
  onAddToWardrobe,
  onAddToWishlist,
  linkBase = '/catalog',
}) => {
  
  const navigate = useNavigate();

  console.log('ProductCard rendered:', product.id);


  const handleCardClick = () => {
    navigate(`${linkBase}/${product.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite?.(product.id);
  };

  const handleWardrobeClick = (e) => {
    e.stopPropagation();
    onAddToWardrobe?.(product);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    onAddToWishlist?.(product);
  };

  return (
    <div className={styles.card} onClick={handleCardClick} role="button" tabIndex={0}>
      <div className={styles.imageContainer}>
        <img
          src={product.thumbnail || product.image || 'https://via.placeholder.com/250'}
          alt={product.title}
        />
        {product.discountPercentage > 0 && (
          <div className={styles.badge}>
            <span className={styles.discount}>
              -{Math.round(product.discountPercentage)}%
            </span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.brand}>{product.brand || product.category}</p>

        <div className={styles.priceRow}>
          <span className={styles.price}>${product.price}</span>
          {product.rating && (
            <span className={styles.rating}>{product.rating.toFixed(1)} ★</span>
          )}
        </div>

        <div className={styles.actions}>
          {onToggleFavorite && (
            <button
              className={isFavorite ? styles.favBtnActive : styles.favBtn}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? '❤️' : '♡'}
            </button>
          )}
          {onAddToWardrobe && (
            <button
              className={isInWardrobe ? styles.wardrobeBtnActive : styles.wardrobeBtn}
              onClick={handleWardrobeClick}
            >
              {isInWardrobe ? 'В гардеробе' : '+ Гардероб'}
            </button>
          )}
          {onAddToWishlist && (
            <button
              className={isInWishlist ? styles.wishBtnActive : styles.wishBtn}
              onClick={handleWishlistClick}
            >
              {isInWishlist ? 'В вишлисте' : '+ Wishlist'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
});