import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';

const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const WardrobePage = lazy(() => import('./pages/WardrobePage'));
const LooksPage = lazy(() => import('./pages/LooksPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <ProfilePage /> },
      { path: 'catalog', element: <CatalogPage /> },
      { path: 'catalog/:id', element: <ProductDetailPage /> },
      { path: 'wardrobe', element: <WardrobePage /> },
      { path: 'looks', element: <LooksPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
    ],
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;