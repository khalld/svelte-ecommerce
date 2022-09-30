import env from '../../../../../lib/store/env.js'

export async function load({ url, event }) {
    const id = url.pathname.split("/")[url.pathname.split("/").length - 1]

    var user = {};

    await fetch(`${env.host}/users/${id}`)
    .then(res => {
        if (res.status == 400){
            throw new Error('Something wrong happened')
        }
        return res.json();
    })
    .then(data => {
        user = data;
    })
    .catch(err => console.log(err))

    return {
        user: user
    };
}