import env from '../../../lib/store/env.js';

export async function load(event) {
    var products = [];

    await fetch(`${env.host}/products`)
    .then(res => {
        if (res.status == 400){
            throw new Error('Something wrong happened')
        }
        return res.json();
    })
    .then(data => {
        products = data;
    })
    .catch(err => console.log(err))


    return {
        products: products
    };
}