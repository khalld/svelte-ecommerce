import userStore from '../../lib/store/userStore.js';
import {get} from 'svelte/store'
import env from '../../lib/store/env.js';
import { error, redirect } from '@sveltejs/kit';

export async function load(event) {
    if(get(userStore).loggedIn == false){
        throw redirect(307, '/')
    }

    var userInfo = null;

    await fetch(`${env.host}/users/${get(userStore)._id}`)
    .then(res => {
        if (res.status == 400){
            throw new Error('User not founded!')
        }
        return res.json();
    })
    .then(data => {
        userInfo = data;
    })
    .catch(err => console.log(err))
    
    var orders = null;

    await fetch(`${env.host}/orders/user/${get(userStore)._id}`)
    .then(res => {
        if (res.status == 404 || res.status == 400){
            throw new Error('Something wrong happened')
        }
        return res.json();
    })
    .then(data => {
        orders = data;
    })
    .catch(err => console.log(err))


    return {
        user: userInfo,
        orders: orders
    };


}