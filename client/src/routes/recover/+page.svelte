
<script>
    import env from '../../lib/store/env.js';
    import Input from '../../lib/component/Input.svelte';
    import Hint from '../../lib/component/Hint.svelte';

    let user = {
        email: 'admin@email.it'
    }

    let error = null;
    let info = null;
    
    async function submit() {
        error = null;
        info = null;
            
        try {
            Object.values(user).forEach((element, index, array) => {
                if (element === null || element.length === 0) {
                    throw new Error('All fields are mandatory!');
                } 
            })
            
            await fetch(`${env.host}/users/recoverpwd`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then(res => {
                if (res.status == 409){
                    throw new Error('User disabled. Contact us for more information')
                } 
                if (res.status == 404){
                    throw new Error('User not founded')
                } 
                if (res.status == 400){
                    throw new Error('Something wrong happened')
                }
                if (res.status == 202){
                    info = "Check your email to complete the process";
                }
            })
            .catch(err => error = err.message)
            
        } catch (e) {
            error = e.message
        }

    }

</script>

<div class="container text-center w-50">
    <form on:submit|preventDefault={submit}>
        <h1 class="h3 mb-3 fw-normal">Recover password</h1>

        <Input id="email" placeholder="Please insert your email address" bind:value={user.email} type="email" />
        
        <Hint str={error} />
        <Hint str={info} type="success" />

        <button class="w-100 btn btn-primary mt-2" type="submit">Send</button>

    </form>
</div>
