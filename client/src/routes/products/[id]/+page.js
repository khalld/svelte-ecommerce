import env from '../../../lib/store/env.js'
import { error, redirect } from '@sveltejs/kit';

export async function load({ url, event }) { 

    const id = url.pathname.split("/")[url.pathname.split("/").length - 1]
    var product = {};

    await fetch(`${env.host}/products/enabled/${id}`)
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
        product = data;
    })
    .catch(err => console.log(err))

    if (Object.keys(product).length === 0){
        throw redirect(307, '/products')
    }

    return {
        product: product
    };
}