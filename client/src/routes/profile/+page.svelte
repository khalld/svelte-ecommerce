<script>
    import Input from "../../lib/component/Input.svelte";
    import Select from "../../lib/component/Select.svelte";
    import utils from "../../lib/store/utils";
    import InfoPanel from "../../lib/component/InfoPanel.svelte";
    import env from "../../lib/store/env";
    import Hint from "../../lib/component/Hint.svelte";
    import { notifier } from "@beyonk/svelte-notifications";

    export let data;
    let error;
    let pwd = {
        oldPassword: 'password012345',
        newPassword: 'password02',
        passwordConf: 'password02'
    }

    // TODO: fetch per modifica campi

    async function changePwd(){
        try {

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
    <InfoPanel redirect="/profile/myorders" redirectText="Go to your orders">
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
    </InfoPanel>

    <!-- TODO: Implementa! -->
    <InfoPanel title="Change password">
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
    </InfoPanel>
</div>

