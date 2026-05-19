import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Navbar.module.css';

export function Navbar() {
  const wardrobeItems = useSelector((state) => state.wardrobe.wardrobeItems);
  const wishlist = useSelector((state) => state.wardrobe.wishlist);

  const getClassName = (isActive) => (isActive ? styles.linkActive : styles.link);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.brand}>
          WardrobeApp
        </NavLink>

        <div className={styles.links}>
          <NavLink to="/" end className={({ isActive }) => getClassName(isActive)}>
            Profile
          </NavLink>
          <NavLink to="/catalog" className={({ isActive }) => getClassName(isActive)}>
            Catalog
          </NavLink>
          <NavLink to="/wardrobe" className={({ isActive }) => getClassName(isActive)}>
            Wardrobe
            {wardrobeItems.length > 0 && (
              <span className={styles.badge}>{wardrobeItems.length}</span>
            )}
          </NavLink>
          <NavLink to="/looks" className={({ isActive }) => getClassName(isActive)}>
            Looks
          </NavLink>
          <NavLink to="/wishlist" className={({ isActive }) => getClassName(isActive)}>
            Wishlist
            {wishlist.length > 0 && (
              <span className={styles.badgeWish}>{wishlist.length}</span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}