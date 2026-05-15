import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLook, removeLook } from '../store/wardrobeSlice';
import { Link } from 'react-router-dom';
import styles from './LooksPage.module.css';

function LooksPage() {
  var dispatch = useDispatch();
  var looks = useSelector(function (state) {
    return state.wardrobe.looks;
  });
  var wardrobeItems = useSelector(function (state) {
    return state.wardrobe.wardrobeItems;
  });

  var [showForm, setShowForm] = useState(false);
  var [formData, setFormData] = useState({
    name: '',
    description: '',
    items: [],
  });

  var handleToggleItem = function (item) {
    var exists = formData.items.find(function (i) {
      return i.id === item.id;
    });
    if (exists) {
      setFormData(function (prev) {
        return {
          ...prev,
          items: prev.items.filter(function (i) {
            return i.id !== item.id;
          }),
        };
      });
    } else {
      setFormData(function (prev) {
        return {
          ...prev,
          items: [...prev.items, item],
        };
      });
    }
  };

  var handleSubmit = function (e) {
    e.preventDefault();
    if (formData.name.trim() && formData.items.length > 0) {
      dispatch(addLook(formData));
      setFormData({ name: '', description: '', items: [] });
      setShowForm(false);
    }
  };

  var handleCancel = function () {
    setFormData({ name: '', description: '', items: [] });
    setShowForm(false);
  };

  return (
    <div className={styles.looksPage}>
      <div className={styles.header}>
        <h1>My Looks</h1>
        <p className={styles.subtitle}>
          Create outfit combinations from your wardrobe items
        </p>
        {!showForm && (
          <button
            className={styles.createBtn}
            onClick={function () {
              setShowForm(true);
            }}
          >
            + Create New Look
          </button>
        )}
      </div>

      {showForm && (
        <div className={styles.formCard}>
          <h2>Create a New Look</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Look Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={function (e) {
                  setFormData(function (prev) {
                    return { ...prev, name: e.target.value };
                  });
                }}
                placeholder="e.g., Summer Casual, Office Chic"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={function (e) {
                  setFormData(function (prev) {
                    return { ...prev, description: e.target.value };
                  });
                }}
                placeholder="Describe your look..."
                rows="3"
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                Select Items from Your Wardrobe{' '}
                {formData.items.length > 0 && (
                  <span className={styles.selectedCount}>
                    ({formData.items.length} selected)
                  </span>
                )}
              </label>

              {wardrobeItems.length > 0 ? (
                <div className={styles.itemPicker}>
                  {wardrobeItems.map(function (item) {
                    var isSelected = formData.items.some(function (i) {
                      return i.id === item.id;
                    });
                    return (
                      <div
                        key={item.id}
                        className={
                          isSelected
                            ? styles.pickerItemSelected
                            : styles.pickerItem
                        }
                        onClick={function () {
                          handleToggleItem(item);
                        }}
                      >
                        <img src={item.image} alt={item.title} />
                        <div className={styles.pickerInfo}>
                          <span className={styles.pickerTitle}>{item.title}</span>
                          <span className={styles.pickerPrice}>${item.price}</span>
                        </div>
                        {isSelected && (
                          <span className={styles.checkmark}>
                            Selected
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={styles.noItems}>
                  <p>Your wardrobe is empty. Add items from the catalog first.</p>
                  <Link to="/catalog" className={styles.catalogLink}>
                    Browse Catalog
                  </Link>
                </div>
              )}
            </div>

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={!formData.name.trim() || formData.items.length === 0}
              >
                Save Look
              </button>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {looks.length > 0 ? (
        <div className={styles.looksGrid}>
          {looks.map(function (look) {
            return (
              <div key={look.id} className={styles.lookCard}>
                <div className={styles.lookHeader}>
                  <h2>{look.name}</h2>
                  <button
                    className={styles.deleteBtn}
                    onClick={function () {
                      dispatch(removeLook(look.id));
                    }}
                    title="Delete look"
                  >
                    Delete
                  </button>
                </div>
                {look.description && (
                  <p className={styles.lookDesc}>{look.description}</p>
                )}
                <div className={styles.itemsPreview}>
                  {look.items.map(function (item) {
                    return (
                      <div key={item.id} className={styles.previewItem}>
                        <img src={item.image} alt={item.title} />
                        <span className={styles.previewTitle}>{item.title}</span>
                      </div>
                    );
                  })}
                </div>
                <p className={styles.itemCount}>{look.items.length} items in this look</p>
              </div>
            );
          })}
        </div>
      ) : (
        !showForm && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>L</div>
            <h2>No looks yet</h2>
            <p>
              Create your first outfit combination by selecting items from your wardrobe.
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default LooksPage;
