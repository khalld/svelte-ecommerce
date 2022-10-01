import userStore from '../../lib/store/userStore.js';
import {get} from 'svelte/store'
import env from '../../lib/store/env.js';

export async function load(event) {
    var userInfo = {
        _id: null,
        email: null,
        name: null,
        surname: null,
        address: {
            
        }
    };
    // TODO: aggiungi controllo su _id

    if (get(userStore)._id != null) {
        await fetch(`${env.host}/users/${get(userStore)._id}`)
        .then(res => {
            if (res.status == 400){
                throw new Error('User not founded!')
            }
            return res.json();
        })
        .then(data => {
            userInfo = data;
        })
        .catch(err => console.log(err))
    }


    return {
        order: {
            data: Date.now(),
            products: [], // TODO:
            sales: [], // TODO:
            customer: {
                _id: userInfo._id, //FIXME: type object id
                email: userInfo.email,
                name: userInfo.name,
                surname: userInfo.surname
            },
            address: userInfo.address,
            tracking: {
                id: null,
                provider: null,
            },
            amount: 0.0,
            notes: null,
            status: "PENDING"
        }
    };
}