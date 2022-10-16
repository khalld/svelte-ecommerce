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
    var photosBlob = [];

    products.forEach(async (curr, idx, arr) => {
        photosUrl = [];
        photosBlob = [];
        
        await fetch(`${env.host}/images/list/${curr._id}`)
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
                    prodId: curr._id,
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
        curr.photos = photosBlob;
    })

    return {
        products: products
    };
}