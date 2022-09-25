
import { goto } from '$app/navigation';

export function detail(id, pathname){
    console.log(id);
    goto(`/admin/${pathname}/${id}`);
}

export function del(id){
    console.log(id);
}