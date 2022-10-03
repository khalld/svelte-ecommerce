<script>
    import InfoPanelAdmin from "../../../../../lib/component/InfoPanelAdmin.svelte";
    import InfoPanel from "../../../../../lib/component/InfoPanel.svelte";
    import InfoPanelHeader from "../../../../../lib/component/InfoPanelHeader.svelte";
    import Input from "../../../../../lib/component/Input.svelte";  
    import Select from "../../../../../lib/component/Select.svelte";
    import utils from "../../../../../lib/store/utils";



    export let data;
</script>

<InfoPanel title="User detail">
    <div class="row g-3">
        <div class="col-sm-6">
            <Input id="name" label="Name" bind:value={data.user.name} placeholder="Please insert your name" readonly/>
        </div>
        <div class="col-sm-6">
            <Input id="surname" label="Surname" bind:value={data.user.surname} placeholder="Please insert your surname" readonly/>
        </div>
        <div class="col-12">
            <Input id="email" label="Email" bind:value={data.user.email} placeholder="Please insert your email" type="email" readonly/>
        </div>
        <div class="col-12">
            <Input id="address" label="Address" bind:value={data.user.address.address} placeholder="Please insert your shipping address" readonly/>
        </div>
        <div class="col-12">
            <Input id="address2" bind:value={data.user.address.address2} placeholder="Apartment or suite" readonly/>
        </div>
        <div class="col-md-4">
            <Select id="select-country" label="Country" arialabel="select country" bind:value={data.user.address.country} elements={utils.countries} disabled/>
        </div>
        <div class="col-md-4">
            <Select id="select-country" label="Region" arialabel="select region" bind:value={data.user.address.region} elements={utils.regions} disabled/>
        </div>
        <div class="col-md-4">
            <Input id="zip" label="ZIP" bind:value={data.user.address.zip} placeholder="ZIP code" type="number" readonly/>
        </div>
    </div>
</InfoPanel>

<!-- TODO: Implementa! -->
<InfoPanel title="Orders list">
    Under costruction...
</InfoPanel>