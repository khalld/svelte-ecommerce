import userStore from '../../lib/store/userStore.js';
import {get} from 'svelte/store'
import env from '../../lib/store/env.js';

export async function load(event) {
    // console.log(get(userStore))
    var userInfo = null;

    if (get(userStore).loggedIn === true){
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
    
    
        return {
            user: userInfo
        };
    }

    return {
        redirect: "/products",
        user: {
            address: {}
        }
    }

}