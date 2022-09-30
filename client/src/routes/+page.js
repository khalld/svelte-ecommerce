// import env from '../lib/store/env';

// Deprecated, not necessary now

// var categories = []

// export async function load(event) {
//     await fetch(`${env.host}/categories`)
//     .then(res => {
//         if (res.status == 400){
//             throw new Error('Something wrong happened')
//         }
//         console.log(res)
//         return res.json();
//     })
//     .then(data => {
//         categories = data;
//     })
//     .catch(err => console.log(err))

//     console.log(`categories ${categories}`)
//     console.log(categories)

//     return {
//         categories: categories
//     };

// }