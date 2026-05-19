import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import {Notification} from './Notification';
import styles from '../App.module.css';

export function Layout() {
  return (
    <div className={styles.app}>
      <Navbar />
      <Notification />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}