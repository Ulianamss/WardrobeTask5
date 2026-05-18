import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../store/wardrobeSlice';
import { useEffect } from 'react';
import styles from './Notification.module.css';

function Notification() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.wardrobe.notification);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => dispatch(clearNotification()), 2500);
    return () => clearTimeout(timer);
  }, [notification, dispatch]);

  if (!notification) return null;

  const typeClass =
    notification.type === 'success'
      ? styles.success
      : notification.type === 'error'
      ? styles.error
      : styles.info;

  return (
    <div className={`${styles.notification} ${typeClass}`}>
      <span className={styles.message}>{notification.message}</span>
      <button className={styles.closeBtn} onClick={() => dispatch(clearNotification())}>
        X
      </button>
    </div>
  );
}

export default Notification;