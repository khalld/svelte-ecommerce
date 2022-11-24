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
        if (res.status == 404){
            throw redirect(307, '/')
        }
        return res.json();
    })
    .then(data => {
        user = data;
    })
    .catch(err => console.error(err))

    var orders = null;

    await fetch(`${env.host}/orders/user/${id}?page=1&limit=10`)
    .then(res => {
        if (res.status == 404 || res.status == 400){
            throw new Error('Something wrong happened')
        }
        return res.json();
    })
    .then(data => {
        orders = data;
    })
    .catch(err => console.error(err))


    return {
        user: user,
        orders: orders
    };
}