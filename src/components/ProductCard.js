import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';

function ProductCard({
  product,
  isFavorite,
  isInWardrobe,
  isInWishlist,
  onToggleFavorite,
  onAddToWardrobe,
  onAddToWishlist,
  linkBase,
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const base = linkBase || '/catalog';
    navigate(base + '/' + product.id);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) onToggleFavorite();
  };

  const handleWardrobeClick = (e) => {
    e.stopPropagation();
    if (onAddToWardrobe) onAddToWardrobe();
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (onAddToWishlist) onAddToWishlist();
  };

  return (
    <div className={styles.card} onClick={handleCardClick} role="button" tabIndex={0}>
      <div className={styles.imageContainer}>
        <img
          src={product.thumbnail || product.image || 'https://via.placeholder.com/250'}
          alt={product.title}
        />
        <div className={styles.badge}>
          {product.discountPercentage > 0 && (
            <span className={styles.discount}>
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.brand}>{product.brand || product.category || ''}</p>
        <div className={styles.priceRow}>
          <span className={styles.price}>${product.price}</span>
          {product.rating && (
            <span className={styles.rating}>{product.rating.toFixed(1)} / 5</span>
          )}
        </div>
        <div className={styles.actions}>
          {onToggleFavorite && (
            <button
              className={isFavorite ? styles.favBtnActive : styles.favBtn}
              onClick={handleFavoriteClick}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? 'Favorited' : 'Favorite'}
            </button>
          )}
          {onAddToWardrobe && (
            <button
              className={isInWardrobe ? styles.wardrobeBtnActive : styles.wardrobeBtn}
              onClick={handleWardrobeClick}
              title={isInWardrobe ? 'Already in wardrobe' : 'Add to wardrobe'}
            >
              {isInWardrobe ? 'In Wardrobe' : '+ Wardrobe'}
            </button>
          )}
          {onAddToWishlist && (
            <button
              className={isInWishlist ? styles.wishBtnActive : styles.wishBtn}
              onClick={handleWishlistClick}
              title={isInWishlist ? 'Already in wishlist' : 'Add to wishlist'}
            >
              {isInWishlist ? 'In Wishlist' : '+ Wishlist'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);