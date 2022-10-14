<script>
    import Hint from "../../lib/component/Hint.svelte";
    import env from '../../lib/store/env.js';
    import utils from '../../lib/store/utils.js';
    import Input from "../../lib/component/Input.svelte";
    import Select from "../../lib/component/Select.svelte";
    import { goto } from '$app/navigation';

    let error;
    let info;
    let user = {
        address: {
            country: "Italy",
        }
    }

    async function submit() {
        error = null;
        info = null;

        const regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

        try {

            if (user.name == undefined || user.surname == undefined || user.email == undefined || user.phone == undefined || user.address.address == undefined || user.address.city == undefined || user.address.zip == undefined){
                throw new Error('Fill all required fields!')
            }

            if (user.name.length == 0 || user.surname.length == 0 || user.address.address.length == 0 || user.address.city.length == 0){
                throw new Error('Fill all required fields!')
            }

            if (regexEmail.test(user.email) == false){
                throw new Error('Email field is not valid!')
            }

            if (user.phone.toString().length < 8){
                throw new Error('Please insert a valid phone number')
            }

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
                    addNotification({ text: 'Registered successfully!', type: 'danger', position: 'bottom-right' })
                    user = { address: {}}
                    goto('/login')
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
                <div class="col-6">
                    <Input id="email" label="Email" bind:value={user.email} placeholder="Please insert your email" type="email"/>
                </div>
                <div class="col-6">
                    <Input id="phone" label="Phone" bind:value={user.phone} placeholder="Please insert your phone number" type="number"/>
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
