<script>
    import VertInput from "../../lib/component/VertInput.svelte";
    import Select from "../../lib/component/Select.svelte";
    import utils from "../../lib/store/utils";
    import InfoPanel from "../../lib/component/InfoPanel.svelte";

    export let data;
    export let changePassword = {};
    // TODO: fetch per modifica campi

</script>


<div class="container">
    <InfoPanel>
        <div class="row g-3">
            <div class="col-sm-6">
                <VertInput id="name" label="Name" bind:value={data.user.name} placeholder="Please insert your name"/>
            </div>
            <div class="col-sm-6">
                <VertInput id="surname" label="Surname" bind:value={data.user.surname} placeholder="Please insert your surname"/>
            </div>
            <div class="col-12">
                <VertInput id="email" label="Email" bind:value={data.user.email} placeholder="Please insert your email" type="email"/>
            </div>
            <div class="col-12">
                <VertInput id="address" label="Address" bind:value={data.user.address.address} placeholder="Please insert your shipping address"/>
            </div>
            <div class="col-12">
                <VertInput id="address2" bind:value={data.user.address.address2} placeholder="Apartment or suite"/>
            </div>
            <div class="col-md-4">
                <Select id="select-country" label="Country" arialabel="select country" bind:value={data.user.address.country} elements={utils.countries}/>
            </div>
            <div class="col-md-4">
                <Select id="select-country" label="Region" arialabel="select region" bind:value={data.user.address.region} elements={utils.regions}/>
            </div>
            <div class="col-md-4">
                <VertInput id="zip" label="ZIP" bind:value={data.user.address.zip} placeholder="ZIP code" type="number"/>
            </div>
        </div>
    </InfoPanel>

    <!-- TODO: Implementa! -->
    <InfoPanel title="Change password">
        <div class="col-12">
            <VertInput id="password" label="Old password" bind:value={changePassword.oldPassword} placeholder="Please insert your old password" type="password"/>
        </div>
        <div class="col-12">
            <VertInput id="password" label="New Password" bind:value={changePassword.newPassword} placeholder="Please insert your new password" type="password"/>
        </div>
        <div class="col-12">
            <VertInput id="password-conf" label="Confirm password" bind:value={changePassword.passwordConf} placeholder="Please confirm your new password" type="password"/>
        </div>
    </InfoPanel>

    <!-- TODO: Implementa! -->
    <InfoPanel title="Orders list">
        Under costruction...
    </InfoPanel>

</div>

