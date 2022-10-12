<script>
    import Input from "../../lib/component/Input.svelte";
    import Select from "../../lib/component/Select.svelte";
    import utils from "../../lib/store/utils";
    import env from "../../lib/store/env";
    import Hint from "../../lib/component/Hint.svelte";
    import { getNotificationsContext } from 'svelte-notifications';
    const { addNotification } = getNotificationsContext();
    import userStore from "../../lib/store/userStore";
    import {get} from 'svelte/store';
    import OrderList from "../../lib/component/OrderList.svelte";
    import OrderElement from "../../lib/component/OrderElement.svelte";
    import Pagenavigation from "../../lib/component/PageNavigation.svelte";

    export let data;
    let error;
    let pwd = { }

	let currPage = data.orders.currentPage;
	let ordersPage = [...Array(data.orders.totalPages).keys() ]

    async function changePage(selPage){
		const limit = 10
		await fetch(`${env.host}/orders/user/${get(userStore)._id}?page=${selPage}&limit=${limit}`)
		.then(res => {
			if (res.status == 400){
				throw new Error('Something wrong happened')
			}
			return res.json();
		})
		.then(data2 => {
			data.orders = data2;
		})
		.catch(err => console.log(err))
		currPage = selPage;
	}

    async function updateProfile(){
        const regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

        try {

            if (data.user.name == undefined || data.user.surname == undefined || data.user.email == undefined || data.user.phone == undefined || data.user.address.address == undefined || data.user.address.city == undefined || data.user.address.zip == undefined){
                throw new Error('Fill all required fields!')
            }

            if (data.user.name.length == 0 || data.user.surname.length == 0 || data.user.address.address.length == 0 || data.user.address.city.length == 0){
                throw new Error('Fill all required fields!')
            }

            if (regexEmail.test(data.user.email) == false){
                throw new Error('Email field is not valid!')
            }

            if (data.user.phone.toString().length < 8){
                throw new Error('Please insert a valid phone number')
            }

            await fetch(`${env.host}/users/${get(userStore)._id}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: data.user.name,
                    surname: data.user.surname,
                    phone: data.user.phone,
                    email: data.user.email,
                    address: data.user.address,
                })
            })
            .then(res => {
                if (res.status == 400 || res.status == 404 ){
                    addNotification({ text: 'Something wrong happened', type: 'danger', position: 'bottom-right' })
                }

                if (res.status == 200){
                    addNotification({ text: 'Information update', type: 'success', position: 'bottom-right' })
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
                    addNotification({ text:'Something wrong happened!', type: 'error', position: 'bottom-right' })
                } 

                if (data.status == 202){
                    addNotification({ text: 'Password changes successfully', type: 'success', position: 'bottom-right' })
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
                    <div class="col-6">
                        <Input id="email" label="Email" bind:value={data.user.email} placeholder="Please insert your email" type="email"/>
                    </div>
                    <div class="col-6">
                        <Input id="phone" label="Phone" bind:value={data.user.phone} placeholder="Please insert your phone number" type="number"/>
                    </div>
                    <div class="col-12">
                        <Input id="address" label="Address" bind:value={data.user.address.address} placeholder="Please insert your shipping address"/>
                    </div>
                    <div class="col-12">
                        <Input id="address2" bind:value={data.user.address.address2} placeholder="Apartment or suite"/>
                    </div>
                    <div class="col-6">
                        <Select id="select-country" label="Country" arialabel="select country" bind:value={data.user.address.country} elements={utils.countries}/>
                    </div>
                    <div class="col-6">
                        <Select id="select-country" label="Region" arialabel="select region" bind:value={data.user.address.region} elements={utils.regions}/>
                    </div>
                    <div class="col-8">
                        <Input id="city" label="City" bind:value={data.user.address.city} placeholder="City" type="text" colClass="mb-4" />
                    </div>
                    <div class="col-4">
                        <Input id="zip" label="ZIP" bind:value={data.user.address.zip} placeholder="ZIP code" type="number"  colClass="mb-4"/>
                    </div>
                </div>
                <Hint str={error} />
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
                
                <Pagenavigation addClass="mt-2">
                    {#each ordersPage as pg}
                        {#if currPage == pg+1}
                            <li class="page-item page-link tb-sel active" on:click={() => changePage(pg+1)}>{pg+1}</li>
                        {:else}
                            <li class="page-item page-link tb-sel" on:click={() => changePage(pg+1)}>{pg+1}</li>
                        {/if}
                    {/each}
                </Pagenavigation>
            {/if}

        </div>
    </div>
</div>

