import userStore from '../../lib/store/userStore.js';
import {get, writable} from 'svelte/store'
import env from '../../lib/store/env.js';

var currentUser = null;

export async function load(event) {
    console.log("---load---")
    console.log(get(userStore))

    var userInfo = null;

    await fetch(`${env.host}/users/${get(userStore).user._id}`)
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