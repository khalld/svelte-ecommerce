import {get} from 'svelte/store'
import userStore from '../../../lib/store/userStore.js';
import { error, redirect } from '@sveltejs/kit';

export async function load({url, event}) {

    if(get(userStore).loggedIn){
        throw redirect(307, '/')
    }
    
    const token = url.pathname.split("/")[url.pathname.split("/").length - 1]

    return {
        token: token
    }
}