import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist, addToWardrobe } from '../store/wardrobeSlice';
import { Link } from 'react-router-dom';
import styles from './WishlistPage.module.css';

function WishlistPage() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wardrobe.wishlist);
  const wardrobeItems = useSelector((state) => state.wardrobe.wardrobeItems);

  const wardrobeIds = wardrobeItems.map((item) => item.id);

  const totalPrice = wishlist.reduce((sum, item) => sum + item.price, 0);

  const handleMoveToWardrobe = (item) => {
    dispatch(addToWardrobe(item));
    dispatch(removeFromWishlist(item.id));
  };

  return (
    <div className={styles.wishlistPage}>
      <div className={styles.header}>
        <h1>My Wishlist</h1>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Items:</span>
            <span className={styles.statValue}>{wishlist.length}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Total Value:</span>
            <span className={styles.statValue}>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {wishlist.length > 0 ? (
        <>
          <div className={styles.grid}>
            {wishlist.map((item) => {
              const inWardrobe = wardrobeIds.includes(item.id);
              return (
                <div key={item.id} className={styles.wishlistCard}>
                  <div className={styles.imageContainer}>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className={styles.content}>
                    <h3>{item.title}</h3>
                    {item.brand && <p className={styles.brand}>{item.brand}</p>}
                    <p className={styles.price}>${item.price}</p>
                    <div className={styles.cardActions}>
                      {!inWardrobe && (
                        <button
                          className={styles.moveBtn}
                          onClick={() => handleMoveToWardrobe(item)}
                        >
                          Move to Wardrobe
                        </button>
                      )}
                      <button
                        className={styles.removeBtn}
                        onClick={() => dispatch(removeFromWishlist(item.id))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.summary}>
            <h2>Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal ({wishlist.length} items):</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Estimated Shipping:</span>
              <span>Free</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>W</div>
          <h2>Your wishlist is empty</h2>
          <p>Browse the catalog and add items you want to buy.</p>
          <Link to="/catalog" className={styles.browseLink}>
            Browse Catalog
          </Link>
        </div>
      )}
    </div>
  );
}

export default WishlistPage;