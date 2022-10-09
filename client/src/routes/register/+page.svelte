<script>
    import Hint from "../../lib/component/Hint.svelte";
    import env from '../../lib/store/env.js';
    import utils from '../../lib/store/utils.js';
    import { goto } from '$app/navigation';
    import Input from "../../lib/component/Input.svelte";
    import Select from "../../lib/component/Select.svelte";
    
    let error;
    let info;
    let user = {
        name: "Mimmo",
        surname: "Lucifora",
        email: "user01@email.it",
        password: "password01",
        passwordConf: "password01",
        address: {
            address: "Via alcide de Gaspari",
            address2: "N 23, interno 45",
            country: "Italy",
            region: "Abruzzo",
            city: "New York",
            zip: 9999,
        }
    }

    async function submit() {
        try {
            // Check that all fields are mandatory!
            Object.values(user).forEach((element, index, array) => {
                if (element === null) {
                    throw new Error('All fields are mandatory!');
                } 
            })

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
                if (res.status == 409){
                    throw new Error('Email is already used')
                }
                if (res.status == 400){
                    throw new Error('Something wrong happened')
                }
                if (res.status == 201){
                    info = 'Registered successfully! Now you can login'
                    user = { address: {}}
                }
            })
            .catch(err => error = err.message)
        } catch (e) {
            error = e;
        }
    }
</script>


<div class="container">
    <div class="card p-4">
        <form on:submit|preventDefault={submit}>
            <h1 class="h3 mb-3 fw-normal">Register</h1>
            <p class="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis tincidunt ex. Curabitur efficitur tincidunt enim nec efficitur. Proin in commodo mauris. Quisque ultrices metus eros, commodo tempus dui posuere quis. <a href="/login" class="text-reset">Go to login</a>
            </p>
            <div class="row g-3">
                <div class="col-sm-6">
                    <Input id="name" label="Name" bind:value={user.name} placeholder="Please insert your name"/>
                </div>
                <div class="col-sm-6">
                    <Input id="surname" label="Surname" bind:value={user.surname} placeholder="Please insert your surname"/>
                </div>
                <div class="col-12">
                    <Input id="email" label="Email" bind:value={user.email} placeholder="Please insert your email" type="email"/>
                </div>
                <div class="col-12">
                    <Input id="password" label="Password" bind:value={user.password} placeholder="Please insert your password" type="password"/>
                </div>
                <div class="col-12">
                    <Input id="password-conf" label="Password confirm" bind:value={user.passwordConf} placeholder="Please confirm your password" type="password"/>
                </div>
                <div class="col-12">
                    <Input id="address" label="Address" bind:value={user.address.address} placeholder="Please insert your shipping address"/>
                </div>
                <div class="col-12">
                    <Input id="address2" bind:value={user.address.address2} placeholder="Apartment or suite"/>
                </div>
                <div class="col-6">
                    <Select id="select-country" label="Country" arialabel="select country" bind:value={user.address.country} elements={utils.countries}/>
                </div>
                <div class="col-6">
                    <Select id="select-country" label="State/Region" arialabel="select region" bind:value={user.address.region} elements={utils.regions}/>
                </div>
                <div class="col-8">
                    <Input id="city" label="City" bind:value={user.address.city} placeholder="City" type="text" colClass="mb-4" />
                </div>
                <div class="col-4">
                    <Input id="zip" label="ZIP" bind:value={user.address.zip} placeholder="ZIP code" type="number"  colClass="mb-4"/>
                </div>
            </div>
            <Hint str={error} />
            <Hint str={info} type="success"/>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Register</button>
        </form>

    </div>
</div>
