
<script>
    import { json } from '@sveltejs/kit';
    import VertInput from '../../../lib/component/VertInput.svelte';
    import env from '../../../lib/store/env.js';
    import { goto } from '$app/navigation';

    let user = {
        password: "password01",
        passwordConf: "password01"
    }

    export let error = null;
    export let data;

    async function submit() {

        try {
            if(user.password.length < 8){
                throw new Error('Password must be at least of 8 character!')
            }
    
            if(user.password != user.passwordConf){
                throw new Error('Two passwords are not the same!')
            }

            await fetch(`${env.host}/users/recoverpwd/${data.token}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(data => {
                if (data.status == 200){
                    goto("/login");
                }            
            })
            .catch(err => error = err.message)
        } catch (e){
            error = e;
        }
    }

</script>

<div class="container text-center w-50">
    <form on:submit|preventDefault={submit}>
        <h1 class="h3 mb-3 fw-normal">Recover password</h1>


        <VertInput id="password" placeholder="Please insert your new password" bind:value={user.password} type="password" />
        <VertInput id="passwordConf" placeholder="Please confirm your new password" bind:value={user.passwordConf} type="password" />

        {#if error}
            <div class="alert alert-danger" role="alert">
                {error}
            </div>
        {/if}
        <button class="w-100 btn btn-primary mt-2" type="submit">Send</button>

    </form>
</div>
