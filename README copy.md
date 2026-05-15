# Wardrobe App - Task 5 Submission

A full-stack Single Page Application (SPA) for wardrobe management built with React, Redux Toolkit, RTK Query, and custom Webpack configuration.

## Features

- **Profile Page**: Manage your profile with avatar, bio, and statistics
- **Wardrobe Page**: Browse products from DummyJSON API with search and pagination
- **Product Details**: View detailed information about each product
- **Looks Page**: Create and manage outfit combinations from your wishlist
- **Wishlist Page**: Track items you want to purchase with total price calculation
- **Favorite System**: Mark favorite items for quick access
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **State Management**: Redux Toolkit for global state, RTK Query for API caching
- **Persistent Data**: All local data saved to Redux store

## Tech Stack

- **Frontend Framework**: React 18.2.0
- **State Management**: Redux Toolkit 1.9.7
- **API Caching**: RTK Query (integrated with Redux Toolkit)
- **Routing**: React Router DOM 6.28.0
- **Build Tool**: Webpack 5
- **Babel**: ES6+ transpilation
- **Styling**: Native CSS Modules
- **API**: DummyJSON (https://dummyjson.com)

## Project Structure

```
wardrobe-task5/
  public/
    index.html          # HTML template
  src/
    components/
      Navbar.js         # Navigation component
      Navbar.module.css
      ProductCard.js    # Product card component
      ProductCard.module.css
    pages/
      ProfilePage.js
      ProfilePage.module.css
      WardrobePage.js
      WardrobePage.module.css
      ProductDetailPage.js
      ProductDetailPage.module.css
      LooksPage.js
      LooksPage.module.css
      WishlistPage.js
      WishlistPage.module.css
    store/
      api.js            # RTK Query API endpoints
      store.js          # Redux store configuration
      wardrobeSlice.js  # Redux Toolkit slice
    styles/
      global.css        # Global styles
    App.js              # Main app component with routing
    App.module.css
    index.js            # Entry point
  webpack.config.js     # Webpack configuration
  package.json
  README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd wardrobe-task5
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```
This will start Webpack dev server at `http://localhost:3000`

4. **Build for production**
```bash
npm run build
```
Output will be in the `dist/` directory

## Dependencies

### Core Dependencies
- `react@^18.2.0` - React library
- `react-dom@^18.2.0` - React DOM rendering
- `react-router-dom@^6.28.0` - Client-side routing
- `@reduxjs/toolkit@^1.9.7` - Redux state management
- `react-redux@^8.1.3` - React bindings for Redux

### Dev Dependencies
- `webpack@^5.89.0` - Module bundler
- `webpack-cli@^5.1.4` - Webpack CLI
- `webpack-dev-server@^4.15.1` - Development server
- `@babel/core@^7.23.6` - JavaScript transpiler
- `babel-loader@^9.1.3` - Babel loader for Webpack
- `html-webpack-plugin@^5.6.0` - HTML template plugin
- `mini-css-extract-plugin@^2.7.6` - CSS extraction
- `css-loader@^6.8.1` - CSS module loader
- `style-loader@^3.3.3` - Style injection loader

## API Integration

This app uses **DummyJSON** API:
- **Base URL**: https://dummyjson.com
- **Products Endpoint**: `/products` - Used for wardrobe items
- **Users Endpoint**: `/users` - Profile data
- **Posts Endpoint**: `/posts` - For looks/outfits

RTK Query automatically caches all API responses for optimal performance.

## CSS & Styling

- **CSS Modules**: Each component has its own scoped CSS module
- **Responsive Design**: Mobile-first approach with media queries
- **Color Scheme**: Purple gradient (#667eea to #764ba2)
- **No UI Libraries**: Pure CSS for styling, no Bootstrap or Material-UI

## Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## Key Features Explained

### 1. Profile Page
- Edit your profile name, bio, and avatar
- View statistics (favorite items, wishlist items, looks created)
- All changes are persisted in Redux store

### 2. Wardrobe Page
- Browse products from DummyJSON API
- Search for products in real-time
- Pagination support (12 items per page)
- Add to favorites or wishlist
- View detailed product information

### 3. Product Detail Page
- Complete product information
- Product gallery/images
- Stock availability
- Add to favorites or wishlist
- Back button to wardrobe

### 4. Looks Page
- Create outfit combinations
- Select multiple items from wishlist
- Name and describe your looks
- View all created looks
- Delete looks you no longer want

### 5. Wishlist Page
- View all wishlist items in a grid
- Calculate total wishlist value
- Remove items from wishlist
- Order summary with pricing

## State Management

### Redux Toolkit
- **wardrobeSlice**: Manages profile, favorites, wishlist, and looks
- **Actions**: 
  - `setProfile` - Update user profile
  - `toggleFavorite` - Add/remove favorites
  - `addToWishlist` - Add items to wishlist
  - `removeFromWishlist` - Remove from wishlist
  - `addLook` - Create new look
  - `removeLook` - Delete look

### RTK Query
- **Query Hooks**:
  - `useGetProductsQuery()` - Fetch products with pagination/search
  - `useGetProductByIdQuery()` - Fetch single product
  - `useGetUsersQuery()` - Fetch users
  - `useGetPostsQuery()` - Fetch posts
- **Automatic Caching**: Reduces API calls, improves performance

## Deployment

### Option 1: Netlify
1. Build the project: `npm run build`
2. Connect your GitHub repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

### Option 2: Vercel
1. Build the project: `npm run build`
2. Deploy to Vercel: `vercel --prod`

### Option 3: GitHub Pages
1. Add `"homepage": "https://yourusername.github.io/wardrobe-task5"` to `package.json`
2. Build: `npm run build`
3. Deploy: `npx gh-pages -d dist`

**Live Demo**: [Add your deployed URL here after deployment]

## Performance

- **Lighthouse Score**: Aim for >90 on all metrics
- **Code Splitting**: Webpack handles bundle splitting
- **CSS Modules**: Prevents style conflicts
- **RTK Query Caching**: Minimizes API requests

## Best Practices Implemented

- Component composition and reusability
- Custom hooks for logic separation
- Redux Toolkit for state management
- RTK Query for server-side caching
- CSS Modules for styling isolation
- Responsive design patterns
- Semantic HTML structure
- Clean code architecture
- Proper error handling
- Loading states for async operations

## Git Workflow

```bash
# Feature branch
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

**Commit Format**:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Styling changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvements

## Troubleshooting

### Port 3000 already in use
```bash
# On macOS/Linux
lsof -i :3000
kill -9 <PID>

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### API not loading
- Check internet connection
- Verify DummyJSON API is accessible: https://dummyjson.com/products
- Check browser console for errors

### Styles not applying
- Clear browser cache: `Ctrl+Shift+Delete` or `Cmd+Shift+Delete`
- Restart dev server: `npm start`
- Check CSS module class names in browser DevTools

## Resources

- [React Documentation](https://react.dev)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [RTK Query Docs](https://redux-toolkit.js.org/rtk-query/overview)
- [React Router Docs](https://reactrouter.com)
- [Webpack Docs](https://webpack.js.org)
- [DummyJSON API](https://dummyjson.com)

## Author

Created for Task 5 - React SPA with Redux & Webpack

## License

ISC License - Feel free to use this project for learning purposes.

---

**Submission Date**: [Current Date]
**Deployment Link**: [Add after deployment]
**GitHub Repository**: [Add your repo URL]
