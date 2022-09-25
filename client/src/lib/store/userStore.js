// Persist stores in localStorage
import { writable} from '../../../node_modules/svelte-persistent-store/dist/local';

const userStore = writable('user', { 
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