import env from '../lib/store/env'

export async function load({url}) {

    var products = []

    await fetch(`${env.host}/products/rand`)
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