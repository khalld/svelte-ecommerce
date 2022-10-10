import userStore from '../../../../lib/store/userStore'
import {get} from 'svelte/store'
import { error, redirect } from '@sveltejs/kit';

export async function load(event) {
    if(get(userStore).loggedIn == false){
        throw redirect(307, '/')
    }
    
    if(get(userStore).role != "admin"){
        throw redirect(307, '/')
    }

}