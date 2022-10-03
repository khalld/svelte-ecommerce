import userStore from '../../../../lib/store/userStore'
import {get} from 'svelte/store'
import { error, redirect } from '@sveltejs/kit';

export async function load(event) {
    if(get(userStore).loggedIn != true || get(userStore).role != "admin"){
        throw redirect(307, '/')
    }

}