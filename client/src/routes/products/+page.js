import env from '../../lib/store/env.js'

export async function load(event) {
    var products = [];

    await fetch(`${env.host}/products/enabled`)
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

    var firstImg = null;
    var blob = null;

    for (let i = 0; i < products.products.length; i++){
        firstImg = null;
        blob = null;
        
        await fetch(`${env.host}/images/list/${products.products[i]._id}`)
        .then(res => {
            if (res.status == 500){
                throw new Error('Something wrong happened')
            }
            return res.json();
        })
        .then(data => {
            firstImg = data.images[0];
        })
        .catch(err => console.log(err))
    
        await fetch(`${env.host}/images/info`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                prodId: products.products[i]._id,
                name: firstImg
            })
        })
        .then(res => res.blob())
        .then(imageBlob => {
            // Then create a local URL for that image and print it 
            // const imageObjectURL = URL.createObjectURL(imageBlob);
            blob = URL.createObjectURL(imageBlob);
        })
        .catch(err => console.log(err))

        products.products[i].mainPic = blob
    }

    return {
        products: products
    };
}