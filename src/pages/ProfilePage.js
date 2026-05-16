import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile } from '../store/wardrobeSlice';
import { Link } from 'react-router-dom';
import styles from './ProfilePage.module.css';

function ProfilePage() {
  var dispatch = useDispatch();
  var profile = useSelector(function (state) {
    return state.wardrobe.profile;
  });
  var wardrobeItems = useSelector(function (state) {
    return state.wardrobe.wardrobeItems;
  });
  var favorites = useSelector(function (state) {
    return state.wardrobe.favorites;
  });
  var wishlist = useSelector(function (state) {
    return state.wardrobe.wishlist;
  });
  var looks = useSelector(function (state) {
    return state.wardrobe.looks;
  });

  var [isEditing, setIsEditing] = useState(false);
  var [formData, setFormData] = useState(profile);

  var handleChange = function (e) {
    var name = e.target.name;
    var value = e.target.value;
    setFormData(function (prev) {
      return { ...prev, [name]: value };
    });
  };

  var handleSave = function () {
    dispatch(setProfile(formData));
    setIsEditing(false);
  };

  var handleCancel = function () {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileCard}>
        <div className={styles.header}>
          <img
            src={profile.avatar}
            alt="Profile avatar"
            className={styles.avatar}
            onError={function (e) {
              // https://dummyjson.com - перенести в env
              e.target.src = 'https://dummyjson.com/icon/emilys/128';
            }}
          />
          <div className={styles.headerInfo}>
            {isEditing ? (
              <div className={styles.editForm}>
                <div className={styles.formGroup}>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="2"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Avatar URL</label>
                  <input
                    type="url"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formActions}>
                  <button className={styles.saveBtn} onClick={handleSave}>
                    Save
                  </button>
                  <button className={styles.cancelBtn} onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1>{profile.name}</h1>
                <p className={styles.bio}>{profile.bio}</p>
                <button
                  className={styles.editBtn}
                  onClick={function () {
                    setIsEditing(true);
                  }}
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <Link to="/wardrobe" className={styles.statCard}>
          <div className={styles.statNumber}>{wardrobeItems.length}</div>
          <div className={styles.statLabel}>Wardrobe Items</div>
        </Link>
        <Link to="/wardrobe" className={styles.statCard}>
          <div className={styles.statNumber}>{favorites.length}</div>
          <div className={styles.statLabel}>Favorites</div>
        </Link>
        <Link to="/wishlist" className={styles.statCard}>
          <div className={styles.statNumber}>{wishlist.length}</div>
          <div className={styles.statLabel}>Wishlist Items</div>
        </Link>
        <Link to="/looks" className={styles.statCard}>
          <div className={styles.statNumber}>{looks.length}</div>
          <div className={styles.statLabel}>Looks Created</div>
        </Link>
      </div>

      {wardrobeItems.length === 0 && (
        <div className={styles.getStarted}>
          <h2>Get Started</h2>
          <p>
            Your wardrobe is empty. Browse the product catalog and start adding items
            to build your personal collection.
          </p>
          <Link to="/catalog" className={styles.browseLink}>
            Browse Catalog
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
