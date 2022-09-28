import env from '../../../lib/store/env.js';


// TODO: AGGiungi LOAD! + prendi l'id del prodotto dal server (credo ??)



// export async function load(event) {
//     var orders = [];

//     await fetch(`${env.host}/products/${_ID_}`)
//     .then(res => {
//         if (res.status == 400){
//             throw new Error('Something wrong happened')
//         }
//         return res.json();
//     })
//     .then(data => {
//         orders = data;
//     })
//     .catch(err => console.log(err))


//     return {
//         product: product
//     };
// }