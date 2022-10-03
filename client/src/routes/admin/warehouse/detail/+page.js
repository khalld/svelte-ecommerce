import userStore from '../../../../lib/store/userStore'
import {get} from 'svelte/store'
import { error, redirect } from '@sveltejs/kit';

export async function load(event) {

    // TODO: Al momento disabilitato per il deploy
    // if(get(userStore).loggedIn == false){
    //     throw redirect(307, '/')
    // }
    // console.log(get(userStore))
    // if(get(userStore).role != "admin"){
    //     throw redirect(307, '/')
    // }
    

}