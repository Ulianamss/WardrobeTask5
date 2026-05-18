import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile } from '../store/wardrobeSlice';
import { Link } from 'react-router-dom';
import styles from './ProfilePage.module.css';

function ProfilePage() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.wardrobe.profile);
  const wardrobeItems = useSelector((state) => state.wardrobe.wardrobeItems);
  const favorites = useSelector((state) => state.wardrobe.favorites);
  const wishlist = useSelector((state) => state.wardrobe.wishlist);
  const looks = useSelector((state) => state.wardrobe.looks);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    dispatch(setProfile(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
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
            onError={(e) => {
              e.target.src = `${process.env.REACT_APP_API_URL}/icon/emilys/128`;
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
                <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
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