// Persist stores in localStorage
import { writable } from '../../../node_modules/svelte-persistent-store/dist/local';

const cartCounter = writable(0);

export default cartCounter;