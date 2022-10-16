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
    .then(async data => {
        products = data;
    })
    .catch(err => console.log(err))

    var photosUrl = [];
    var blob = null;

    // products.forEach(async (curr, idx, arr) => {
    for (let i = 0; i < products.length; i++){

        let currId = products[i]._id;

        console.log(currId)

        photosUrl = [];
        blob = null;
        
        await fetch(`${env.host}/images/list/${currId}`)
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
    
        // Carico solo la prima immagine
        await fetch(`${env.host}/images/info`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                prodId: currId,
                name: photosUrl[0]
            })
        })
        .then(res => res.blob())
        .then(imageBlob => {
            blob = URL.createObjectURL(imageBlob)
        })
        .catch(err => console.log(err))

        products[i].mainPic = blob;
    }

    return {
        products: products
    };
}