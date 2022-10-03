import userStore from '../../lib/store/userStore.js';
import {get} from 'svelte/store';
import { error, redirect } from '@sveltejs/kit';

export async function load(event) {
    if(get(userStore).loggedIn){
        throw redirect(307, '/products')
    }

}