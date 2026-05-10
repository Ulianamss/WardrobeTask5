//swap when the BE is about to be implemented

// export const authService = {
//   async register(email, password, name) {
//     const response = await fetch('http://your-api.com/api/auth/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password, name }),
//     });
//     return response.json();
//   },

//   async login(email, password) {
//     const response = await fetch('http://your-api.com/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });
//     return response.json();
//   },



// };



import { MOCK_USERS, MOCK_CLOTHES, MOCK_LOOKS, MOCK_WISHLIST } from '../constants/mockData';

// Simulate backend delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// ============ AUTH SERVICE ============
export const authService = {
  // Register a new user
  async register(email, password, name) {
    await delay();
    
    // Mock: Check if user exists
    const userExists = MOCK_USERS.some(u => u.email === email);
    if (userExists) {
      throw new Error('User already exists');
    }

    // Mock: Create user
    const newUser = {
      id: Date.now(),
      email,
      password, // ⚠️ Never do this in real app!
      name,
      bio: '',
      favoriteStyle: '',
    };
    MOCK_USERS.push(newUser);
    
    // Mock: Return token
    const token = btoa(JSON.stringify({ userId: newUser.id, email }));
    localStorage.setItem('authToken', token);
    
    return { user: newUser, token };
  },

  // Login user
  async login(email, password) {
    await delay();
    
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const token = btoa(JSON.stringify({ userId: user.id, email }));
    localStorage.setItem('authToken', token);
    
    return { user, token };
  },

  // Logout
  async logout() {
    await delay();
    localStorage.removeItem('authToken');
    return { success: true };
  },

  // Get current user from token
  async getCurrentUser() {
    await delay();
    
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    try {
      const decoded = JSON.parse(atob(token));
      const user = MOCK_USERS.find(u => u.id === decoded.userId);
      return user;
    } catch {
      localStorage.removeItem('authToken');
      return null;
    }
  },
};


// ============ CLOTHING SERVICE ============
export const clothingService = {
  // Get all clothes for current user
  async getAll(userId) {
    await delay();
    return MOCK_CLOTHES.filter(item => item.userId === userId);
  },

  // Get single item
  async getById(id, userId) {
    await delay();
    const item = MOCK_CLOTHES.find(item => item.id === id && item.userId === userId);
    if (!item) throw new Error('Item not found');
    return item;
  },

  // Create new clothing item
  async create(userId, data) {
    await delay();
    
    const newItem = {
      id: Date.now(),
      userId,
      ...data,
      createdAt: new Date(),
    };
    MOCK_CLOTHES.push(newItem);
    return newItem;
  },

  // Update item
  async update(id, userId, data) {
    await delay();
    
    const index = MOCK_CLOTHES.findIndex(item => item.id === id && item.userId === userId);
    if (index === -1) throw new Error('Item not found');
    
    MOCK_CLOTHES[index] = { ...MOCK_CLOTHES[index], ...data };
    return MOCK_CLOTHES[index];
  },

  // Delete item
  async delete(id, userId) {
    await delay();
    
    const index = MOCK_CLOTHES.findIndex(item => item.id === id && item.userId === userId);
    if (index === -1) throw new Error('Item not found');
    
    MOCK_CLOTHES.splice(index, 1);
    return { success: true };
  },
};


// ============ LOOKS SERVICE ============
export const looksService = {
  async getAll(userId) {
    await delay();
    return MOCK_LOOKS.filter(look => look.userId === userId);
  },

  async create(userId, data) {
    await delay();
    
    const newLook = {
      id: Date.now(),
      userId,
      ...data,
      createdAt: new Date(),
    };
    MOCK_LOOKS.push(newLook);
    return newLook;
  },

  async update(id, userId, data) {
    await delay();
    
    const index = MOCK_LOOKS.findIndex(look => look.id === id && look.userId === userId);
    if (index === -1) throw new Error('Look not found');
    
    MOCK_LOOKS[index] = { ...MOCK_LOOKS[index], ...data };
    return MOCK_LOOKS[index];
  },

  async delete(id, userId) {
    await delay();
    
    const index = MOCK_LOOKS.findIndex(look => look.id === id && look.userId === userId);
    if (index === -1) throw new Error('Look not found');
    
    MOCK_LOOKS.splice(index, 1);
    return { success: true };
  },
};


// ============ WISHLIST SERVICE ============
export const wishlistService = {
  async getAll(userId) {
    await delay();
    return MOCK_WISHLIST.filter(item => item.userId === userId);
  },

  async create(userId, data) {
    await delay();
    
    const newItem = {
      id: Date.now(),
      userId,
      ...data,
      createdAt: new Date(),
    };
    MOCK_WISHLIST.push(newItem);
    return newItem;
  },

  async delete(id, userId) {
    await delay();
    
    const index = MOCK_WISHLIST.findIndex(item => item.id === id && item.userId === userId);
    if (index === -1) throw new Error('Item not found');
    
    MOCK_WISHLIST.splice(index, 1);
    return { success: true };
  },
};


// ============ PROFILE SERVICE ============
export const profileService = {
  async getProfile(userId) {
    await delay();
    
    const user = MOCK_USERS.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    return user;
  },

  async updateProfile(userId, data) {
    await delay();
    
    const user = MOCK_USERS.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    
    Object.assign(user, data);
    return user;
  },
};