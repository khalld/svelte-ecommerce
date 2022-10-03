import env from '../../../../../lib/store/env.js'
import {get} from 'svelte/store'
import userStore from '../../../../../lib/store/userStore.js';
import { error, redirect } from '@sveltejs/kit';

export async function load({ url, event }) {    
    if(get(userStore).loggedIn != true || get(userStore).role != "admin"){
        throw redirect(307, '/')
    }

    const id = url.pathname.split("/")[url.pathname.split("/").length - 1]
    var user = {};

    await fetch(`${env.host}/users/${id}`)
    .then(res => {
        if (res.status == 400){
            throw new Error('Something wrong happened')
        }
        return res.json();
    })
    .then(data => {
        user = data;
    })
    .catch(err => console.log(err))

    return {
        user: user
    };
}