import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Navbar.module.css';

function Navbar() {
  var wardrobeItems = useSelector(function (state) {
    return state.wardrobe.wardrobeItems;
  });
  var wishlist = useSelector(function (state) {
    return state.wardrobe.wishlist;
  });

  var getClassName = function (isActive) {
    return isActive ? styles.linkActive : styles.link;
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.brand}>
          WardrobeApp
        </NavLink>

        <div className={styles.links}>
          <NavLink
            to="/"
            end
            className={function (props) {
              return getClassName(props.isActive);
            }}
          >
            Profile
          </NavLink>
          <NavLink
            to="/catalog"
            className={function (props) {
              return getClassName(props.isActive);
            }}
          >
            Catalog
          </NavLink>
          <NavLink
            to="/wardrobe"
            className={function (props) {
              return getClassName(props.isActive);
            }}
          >
            Wardrobe
            {wardrobeItems.length > 0 && (
              <span className={styles.badge}>{wardrobeItems.length}</span>
            )}
          </NavLink>
          <NavLink
            to="/looks"
            className={function (props) {
              return getClassName(props.isActive);
            }}
          >
            Looks
          </NavLink>
          <NavLink
            to="/wishlist"
            className={function (props) {
              return getClassName(props.isActive);
            }}
          >
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

export default Navbar;
