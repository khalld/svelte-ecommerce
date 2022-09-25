<script>
    import Hint from "../../lib/component/Hint.svelte";
    import env from '../../lib/store/env.js';
    import { goto } from '$app/navigation';

    let error;

    // FIXME: put all to NULL
    let user = {
        name: "Name",
        surname: "Surname",
        email: "admin@email.it",
        password: "password01",
        passwordConf: "password01",
        address: {
            street: "Street",
            zip: 95032,
            city: "City",
            country: "Italy"
        }
    }


    async function submit() {
        try {
            Object.values(user).forEach((element, index, array) => {
                if (element === null) {
                    throw new Error('All fields are mandatory!');
                } 
            })

            // TODO: Aggiungi una regex per migliorare
            if(user.password.length < 8){
                throw new Error('Password must be at least of 8 character!')
            }

            if(user.password != user.passwordConf){
                throw new Error('Two passwords are not the same!')
            }

            await fetch(`${env.host}/users/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(res => {
                if (res.status == 400){
                    throw new Error('Email already used!')
                }
                if (res.status == 200){
                    goto("/login")
                    .then(() => alert("Register successfull! Now you can login!"))
                }
            })
            .catch(err => error = err.message)

        } catch (e) {
            error = e;
        }
    }



</script>


<div class="container">

    <form on:submit|preventDefault={submit}>
        <h1 class="h3 mb-3 fw-normal">Register</h1>
    
        <div class="form-floating">
            <input type="text" class="form-control" id="name" placeholder="Name" bind:value={user.name}>
            <label for="name">Name</label>
        </div>

        <div class="form-floating mt-2">
            <input type="text" class="form-control" id="surname" placeholder="Surname" bind:value={user.surname}>
            <label for="surname">Surname</label>
        </div>

        <div class="form-floating mt-2">
            <input type="email" class="form-control" id="email" placeholder="Email" bind:value={user.email}>
            <label for="email">Email address</label>
        </div>

        <div class="form-floating mt-2">
            <input type="password" class="form-control" id="password" placeholder="Password" bind:value={user.password}>
            <label for="password">Password</label>
        </div>

        <div class="form-floating mt-2">
            <input type="password" class="form-control" id="password-conf" placeholder="Password" bind:value={user.passwordConf}>
            <label for="password-conf">Confirm password</label>
        </div>

        <div class="form-floating mt-2">
            <input type="text" class="form-control" id="street" placeholder="street" bind:value={user.address.street}>
            <label for="street">Street Address</label>
        </div>
    
        <div class="form-floating mt-2">
            <input type="number" class="form-control" id="zip" placeholder="ZIP" bind:value={user.address.zip}>
            <label for="zip">ZIP or postal code</label>
        </div>

        <div class="form-floating mt-2">
            <input type="text" class="form-control" id="city" placeholder="City" bind:value={user.address.city}>
            <label for="city">City</label>
        </div>

        <!-- TODO: Sostituisci con select -->
        <div class="form-floating mt-2 mb-2">
            <input type="text" class="form-control" id="country" placeholder="Country" bind:value={user.address.country}>
            <label for="country">Country</label>
        </div>

        <Hint str={error} />

        <button class="w-100 btn btn-lg btn-primary" type="submit">Register</button>
    </form>
</div>
