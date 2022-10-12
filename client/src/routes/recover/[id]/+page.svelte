
<script>
    import Hint from '../../../lib/component/Hint.svelte';
    import Input from '../../../lib/component/Input.svelte';
    import env from '../../../lib/store/env.js';

    let user = { }

    let error = null;
    let info = null;

    export let data;

    async function submit() {

        try {

            Object.values(user).forEach((element, index, array) => {
                if (element === null || element.length === 0) {
                    throw new Error('All fields are mandatory!');
                } 
            })
            

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
            .then(res => {
                
                if (res.status == 404 || res.status == 401 || res.status == 400){
                    error = "Something wrong happened"
                }

                if (res.status == 202){
                    user = {}
                    info = "Password recovered successfully"
                }
            })
            .catch(err => error = err.message)
        } catch (e){
            error = e.message;
        }
    }

</script>

<div class="container text-center w-50">
    <form on:submit|preventDefault={submit}>
        <h1 class="h3 mb-3 fw-normal">Recover password</h1>


        <Input id="password" placeholder="Please insert your new password" bind:value={user.password} type="password" />
        <Input id="passwordConf" placeholder="Please confirm your new password" bind:value={user.passwordConf} type="password" />

        <Hint str={error} />
        <Hint str={info} type="success"/>

        <button class="w-100 btn btn-primary mt-2" type="submit">Send</button>

    </form>
</div>
