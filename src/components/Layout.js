import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store';
import { Navbar } from './Navbar';
import {Notification} from './Notification';
import { Suspense } from 'react';
import styles from '../App.module.css';

function LoadingSpinner() {
  return <div className={styles.loading}>Загрузка...</div>;
}

export function Layout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={styles.app}>
          <Navbar />
          <Notification />

          <main className={styles.main}>
            <Suspense fallback={<LoadingSpinner />}>
              <Outlet />
            </Suspense>
          </main>
        </div>
      </PersistGate>
    </Provider>
  );
}