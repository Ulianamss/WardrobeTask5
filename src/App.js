import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout } from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

const ProfilePage = lazy(() => 
  import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage }))
);

const CatalogPage = lazy(() => 
  import('./pages/CatalogPage').then(m => ({ default: m.CatalogPage }))
);

const ProductDetailPage = lazy(() => 
  import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage }))
);

const WardrobePage = lazy(() => 
  import('./pages/WardrobePage').then(m => ({ default: m.WardrobePage }))
);

const LooksPage = lazy(() => 
  import('./pages/LooksPage').then(m => ({ default: m.LooksPage }))
);

const WishlistPage = lazy(() => 
  import('./pages/WishlistPage').then(m => ({ default: m.WishlistPage }))
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
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

export function App() {
  return <RouterProvider router={router} />;
}