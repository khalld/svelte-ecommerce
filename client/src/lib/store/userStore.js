// store.js
import { writable } from 'svelte/store';

const userStore = writable({ 
  loggedIn: false,
  user: {
    _id: null,
    email: null,
    role: null,
  },
  cart: {
    products: [],
    amount: 0.0
  } 
});

export default userStore;