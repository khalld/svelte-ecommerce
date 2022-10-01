import userStore from '../../lib/store/userStore.js';
import {get} from 'svelte/store'
import env from '../../lib/store/env.js';

export async function load({url, event}) {
    console.log(get(userStore))

    if (get(userStore).loggedIn === true){
        return {
            redirect: "/products"
        }
    }

    return {}

}