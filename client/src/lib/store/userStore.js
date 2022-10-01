// Persist stores in localStorage
import { writable} from '../../../node_modules/svelte-persistent-store/dist/local';

const userStore = writable('user', { 
  loggedIn: false,
  _id: null,
  role: null
});

export default userStore;