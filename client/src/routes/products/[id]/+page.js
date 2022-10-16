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

    var photosUrl = [];
    var photosBlob = [];

    await fetch(`${env.host}/images/list/${id}`)
    .then(res => {
        if (res.status == 500){
            throw new Error('Something wrong happened')
        }
        return res.json();
    })
    .then(data => {
        photosUrl = data.images;
    })
    .catch(err => console.log(err))

    for (let i = 0; i < photosUrl.length; i++){
        await fetch(`${env.host}/images/info`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                prodId: product._id,
                name: photosUrl[i]
            })
        })
        .then(res => res.blob())
        .then(imageBlob => {
            // Then create a local URL for that image and print it 
            // const imageObjectURL = URL.createObjectURL(imageBlob);
            photosBlob.push(URL.createObjectURL(imageBlob))
        })
        .catch(err => console.log(err))
    }

    product.photos = photosBlob;
    
    return {
        product: product
    };
}