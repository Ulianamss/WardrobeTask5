import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../store/wardrobeSlice';
import { useEffect } from 'react';
import styles from './Notification.module.css';

function Notification() {
  var dispatch = useDispatch();
  var notification = useSelector(function (state) {
    return state.wardrobe.notification;
  });

  useEffect(
    function () {
      if (notification) {
        var timer = setTimeout(function () {
          dispatch(clearNotification());
        }, 2500);
        return function () {
          clearTimeout(timer);
        };
      }
    },
    [notification, dispatch]
  );

  if (!notification) return null;

  var className = styles.notification;
  if (notification.type === 'success') {
    className += ' ' + styles.success;
  } else if (notification.type === 'error') {
    className += ' ' + styles.error;
  } else {
    className += ' ' + styles.info;
  }

  return (
    <div className={className}>
      <span className={styles.message}>{notification.message}</span>
      <button
        className={styles.closeBtn}
        onClick={function () {
          dispatch(clearNotification());
        }}
      >
        X
      </button>
    </div>
  );
}

export default Notification;
