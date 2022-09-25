import env from '../../../lib/store/env.js';

export async function load(event) {
    var orders = [];

    await fetch(`${env.host}/orders`)
    .then(res => {
        if (res.status == 400){
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