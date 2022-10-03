import {get} from 'svelte/store'
import { error, redirect } from '@sveltejs/kit';
import env from '../../../lib/store/env.js';

export async function load({url}) {

    if(get(userStore).loggedIn){
        throw redirect(307, '/profile/myorders')
    }

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
    .catch(err => console.log(err))

    return {
        order: order
    };
}