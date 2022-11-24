import userStore from '../../../lib/store/userStore.js';
import {get} from 'svelte/store'
import env from '../../../lib/store/env.js';
import { error, redirect } from '@sveltejs/kit';

export async function load(event) {
    if(get(userStore).loggedIn != true || get(userStore).role != "admin"){
        throw redirect(307, '/')
    }

    var users = [];

    await fetch(`${env.host}/users`)
    .then(res => {
        if (res.status == 400){
            throw new Error('Something wrong happened')
        }
        return res.json();
    })
    .then(data => {
        users = data;
    })
    .catch(err => console.error(err))


    return {
        users: users
    };
}