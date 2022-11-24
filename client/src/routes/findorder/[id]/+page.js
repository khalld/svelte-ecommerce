import {get} from 'svelte/store'
import { error, redirect } from '@sveltejs/kit';
import env from '../../../lib/store/env.js';
import userStore from '../../../lib/store/userStore.js';

export async function load({url}) {
    const code = url.pathname.split("/")[url.pathname.split("/").length - 1]

    var order = null

    await fetch(`${env.host}/orders/code/${code}`)
    .then(res => {
        if (res.status == 400){
            throw new Error('Something wrong happened')
        }
        return res.json();
    })
    .then(data => {
        order = data;
    })
    .catch(err => console.error(err))

    if(get(userStore).loggedIn && get(userStore)._id != order.customer._id){
        throw redirect(307, '/profile')
    }

    return {
        order: order
    };
}