// Persist stores in localStorage
import { writable } from '../../../node_modules/svelte-persistent-store/dist/local';

const cartStore = writable('cart', { 
    n_elem: 0,
    products: [],
    amount: 0.0
});

export default cartStore;