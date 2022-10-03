import env from '../../../lib/store/env.js';
import {get} from 'svelte/store'
import userStore from '../../../lib/store/userStore.js';
import { error, redirect } from '@sveltejs/kit';


export async function load(event) {
    
    if(get(userStore).loggedIn != true || get(userStore).role != "admin"){
        throw redirect(307, '/')
    }

    var orders = [];

    await fetch(`${env.host}/orders`)
    .then(res => {
        if (res.status == 404){
            throw new Error('Something wrong happened')
        }
        return res.json();
    })
    .then(data => {
        orders = data;
    })
    .catch(err => console.log(err))


    return {
        orders: orders
    };
}