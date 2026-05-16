import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import ProfilePage from './pages/ProfilePage';
import CatalogPage from './pages/CatalogPage';
import WardrobePage from './pages/WardrobePage';
import ProductDetailPage from './pages/ProductDetailPage';
import LooksPage from './pages/LooksPage';
import WishlistPage from './pages/WishlistPage';
import styles from './App.module.css';

// добавить error boundary
// добавить lazy loading + suspense (чтобы не грузить все страницы сразу)
// вынести  <Navbar /> и <Notification /> в отдельный компонент Layout (чтобы использовать Outlet)
// переписать роутер на createBrowserRouter (в виде объекта)

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Navbar />
        <Notification />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<ProfilePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<ProductDetailPage />} />
            <Route path="/wardrobe" element={<WardrobePage />} />
            <Route path="/looks" element={<LooksPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
