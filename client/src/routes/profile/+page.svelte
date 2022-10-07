<script>
    import Input from "../../lib/component/Input.svelte";
    import Select from "../../lib/component/Select.svelte";
    import utils from "../../lib/store/utils";
    import InfoPanel from "../../lib/component/InfoPanel.svelte";
    import env from "../../lib/store/env";
    import Hint from "../../lib/component/Hint.svelte";
    import { notifier } from "@beyonk/svelte-notifications";
    import userStore from "../../lib/store/userStore";
    import {get} from 'svelte/store';
    import OrderList from "../../lib/component/OrderList.svelte";
    import OrderElement from "../../lib/component/OrderElement.svelte";
    export let data;
    let error;
    let pwd = {
        // oldPassword: 'password012345',
        // newPassword: 'password02',
        // passwordConf: 'password02'
    }

    async function updateProfile(){
        try {

            await fetch(`${env.host}/users/${get(userStore)._id}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: data.user.name,
                    surname: data.user.surname,
                    email: data.user.email,
                    address: data.user.address
                })
            })
            .then(res => {
                console.log(res)
                if (res.status == 400 || res.status == 404 ){
                    notifier.danger('Something wrong happened!')
                } 

                if (res.status == 200){
                    notifier.success('Information update')
                }

            })
            .catch(err => error = err.message)
        } catch (e){
            error = e;
        }
    }
    
    async function changePwd(){
        try {
            Object.values(pwd).forEach((element, index, array) => {
                if (element === null || element.length === 0) {
                    throw new Error('All fields are mandatory!');
                } 
            })
            
            if (pwd.passwordConf != pwd.newPassword){
                throw new Error("Passwords are not the same")
            }

            if (pwd.passwordConf === pwd.oldPassword){
                throw new Error("New password is the same of the old!")
            }

            if(pwd.newPassword.length < 8){
                throw new Error('Password must be at least of 8 character!')
            }

            await fetch(`${env.host}/users/changepwd/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.user.email,
                    oldPassword: pwd.oldPassword,
                    newPassword: pwd.newPassword
                })
            })
            .then(data => {
                if (data.status == 409 || data.status == 404 || data.status == 401 || data.status == 400){
                    notifier.danger('Something wrong happened!')
                } 

                if (data.status == 202){
                    notifier.success('Password changes successfully')
                }
                
                pwd = {}

            })
            .catch(err => error = err.message)

        } catch (e){
            error = e;
        }

    }

</script>


<div class="container">

    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pwd-tab" data-bs-toggle="tab" data-bs-target="#pwd-tab-pane" type="button" role="tab" aria-controls="pwd-tab-pane" aria-selected="false">Contact</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="myorder-tab" data-bs-toggle="tab" data-bs-target="#myorder-tab-pane" type="button" role="tab" aria-controls="myorder-tab-pane" aria-selected="false">My orders</button>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">

            <form on:submit|preventDefault={updateProfile}>
                <div class="row g-3">
                    <div class="col-sm-6">
                        <Input id="name" label="Name" bind:value={data.user.name} placeholder="Please insert your name"/>
                    </div>
                    <div class="col-sm-6">
                        <Input id="surname" label="Surname" bind:value={data.user.surname} placeholder="Please insert your surname"/>
                    </div>
                    <div class="col-12">
                        <Input id="email" label="Email" bind:value={data.user.email} placeholder="Please insert your email" type="email"/>
                    </div>
                    <div class="col-12">
                        <Input id="address" label="Address" bind:value={data.user.address.address} placeholder="Please insert your shipping address"/>
                    </div>
                    <div class="col-12">
                        <Input id="address2" bind:value={data.user.address.address2} placeholder="Apartment or suite"/>
                    </div>
                    <div class="col-md-4">
                        <Select id="select-country" label="Country" arialabel="select country" bind:value={data.user.address.country} elements={utils.countries}/>
                    </div>
                    <div class="col-md-4">
                        <Select id="select-country" label="Region" arialabel="select region" bind:value={data.user.address.region} elements={utils.regions}/>
                    </div>
                    <div class="col-md-4">
                        <Input id="zip" label="ZIP" bind:value={data.user.address.zip} placeholder="ZIP code" type="number"/>
                    </div>
                </div>
                <button class="w-100 btn btn-primary btn-lg mt-2" type="submit">Update profile</button>
            </form>
        
        </div>
        <div class="tab-pane fade" id="pwd-tab-pane" role="tabpanel" aria-labelledby="pwd-tab" tabindex="0">
            
            <form on:submit|preventDefault={changePwd}>
                <div class="col-12">
                    <Input id="password" label="Old password" bind:value={pwd.oldPassword} placeholder="Please insert your old password" type="password"/>
                </div>
                <div class="col-12">
                    <Input id="password" label="New Password" bind:value={pwd.newPassword} placeholder="Please insert your new password" type="password"/>
                </div>
                <div class="col-12">
                    <Input id="password-conf" label="Confirm password" bind:value={pwd.passwordConf} placeholder="Please confirm your new password" type="password"/>
                </div>
                <button class="w-100 btn btn-primary btn-lg mt-2" type="submit">Change password</button>
            </form>
            <Hint str={error} />
        </div>
        <div class="tab-pane fade mt-2" id="myorder-tab-pane" role="tabpanel" aria-labelledby="myorder-tab" tabindex="0">

            {#if data.orders.orders.length === 0}
                <Hint str="No order yet"/>
            {:else}
                <OrderList>
                    {#each data.orders.orders as o}
                        <OrderElement order={o} />
                    {/each}
                </OrderList>
            {/if}
        
        </div>
    </div>
</div>

