
<script>
    import env from '../../lib/store/env.js';
    import VertInput from '../../lib/component/VertInput.svelte';

    let user = {
        email: 'admin@email.it'
    }

    export let error = null;

    async function submit() {
        
        await fetch(`${env.host}/users/recoverpwd`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => {
            console.log("response", res)
            if (res.status == 400){
                throw new Error('User not founded')
            }
            return res.json();
        })
        .then(data => {
            console.log("data from fetch", data)
            error = data.message;
        })
        .catch(err => error = err.message)
    }

</script>

<div class="container text-center w-50">
    <form on:submit|preventDefault={submit}>
        <h1 class="h3 mb-3 fw-normal">Recover password</h1>


        <VertInput id="email" placeholder="Please insert your email address" bind:value={user.email} type="email" />

        {#if error}
            <div class="alert alert-danger" role="alert">
                {error}
            </div>
        {/if}
        <button class="w-100 btn btn-primary mt-2" type="submit">Send</button>

    </form>
</div>
