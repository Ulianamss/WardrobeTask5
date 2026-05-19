import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery } from '../store/api';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, addToWardrobe, addToWishlist } from '../store/wardrobeSlice';
import { useCallback } from 'react';
import styles from './ProductDetailPage.module.css';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  const favorites = useSelector((state) => state.wardrobe.favorites);
  const wardrobeItems = useSelector((state) => state.wardrobe.wardrobeItems);
  const wishlist = useSelector((state) => state.wardrobe.wishlist);

  const handleToggleFavorite = useCallback(() => {
    dispatch(toggleFavorite(product?.id));
  }, [dispatch, product?.id]);

  const handleAddToWardrobe = useCallback(() => {
    if (!product) return;
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
  }, [dispatch, product]);

  const handleAddToWishlist = useCallback(() => {
    if (!product) return;
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
  }, [dispatch, product]);

  if (isLoading) {
    return <div className={styles.container}><div className={styles.loading}>Loading product details...</div></div>;
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

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate('/catalog')}>
        ← Back to Catalog
      </button>

      <div className={styles.detailCard}>
        <div className={styles.imageSection}>
          <img className={styles.mainImage} src={product.thumbnail} alt={product.title} />
          {product.images?.length > 1 && (
            <div className={styles.gallery}>
              {product.images.map((img, idx) => (
                <img key={idx} src={img} alt={`${product.title} view ${idx + 1}`} className={styles.galleryImage} />
              ))}
            </div>
          )}
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.productTitle}>{product.title}</h1>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.actions}>
            <button className={isInWardrobe ? styles.btnActive : styles.btn} onClick={handleAddToWardrobe}>
              {isInWardrobe ? 'Already in Wardrobe' : 'Add to Wardrobe'}
            </button>
            <button className={isInWishlist ? styles.btnWishActive : styles.btnWish} onClick={handleAddToWishlist}>
              {isInWishlist ? 'Already in Wishlist' : 'Add to Wishlist'}
            </button>
            <button className={isFavorite ? styles.btnFavActive : styles.btnFav} onClick={handleToggleFavorite}>
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}