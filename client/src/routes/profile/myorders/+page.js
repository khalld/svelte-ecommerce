import userStore from '../../../lib/store/userStore.js';
import {get} from 'svelte/store'
import env from '../../../lib/store/env.js';
import { error, redirect } from '@sveltejs/kit';

export async function load(event) {

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
        orders: orders
    };

}