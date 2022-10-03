<script>
    import { text } from "svelte/internal";
    import InfoPanel from "../../../lib/component/InfoPanel.svelte";
    import InfoPanelHeader from "../../../lib/component/InfoPanelHeader.svelte";
    import Input from "../../../lib/component/Input.svelte";
    import env from "../../../lib/store/env.js";
    import Select from "../../../lib/component/Select.svelte";


    export let data;

</script>


<InfoPanel title="Client details">

    <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12">
            <Input labelAlign="horizontal"  id="name" bind:value={data.order.customer.name} type="text" readonly/>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
            <Input labelAlign="horizontal"  id="surname" bind:value={data.order.customer.surname} type="text" readonly/>
        </div>
    </div>

    <Input labelAlign="horizontal"  id="email" label="Email" bind:value={data.order.customer.email} readonly="readonly" type="email"/>

    <Input id="address" label="Address" bind:value={data.order.address.address} readonly="readonly" />
    <Input id="address2" bind:value={data.order.address.address2} readonly="readonly" />
    <div class="row">
        <div class="col-4">
            <Input id="country" bind:value={data.order.address.country} readonly="readonly" />
        </div>
        <div class="col-4">
            <Input id="region" bind:value={data.order.address.region} readonly="readonly" />
        </div>
        <div class="col-4">
            <Input id="zip" bind:value={data.order.address.zip} readonly="readonly" />
        </div>
    </div>

    {#if data.order.notes != null}
        <Input labelAlign="horizontal"  id="notes" label="Notes" bind:value={data.order.notes} readonly="readonly" type="textarea"/>
    {:else}
        <i>No additional notes for expedition</i>
    {/if}
</InfoPanel>

<InfoPanel title="Order">

    <!-- TODO: lista di prodotti -->

    {#each data.order.products as prod}
        <div class="d-flex text-muted pt-3">
            <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
            
            <!-- TODO: sistema questo border bottom -->
            <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                <span class="d-block">Product code: <b>{prod.code}</b></span>
                <span class="d-block">Single price: <b>{prod.price}</b> €</span>
                <span class="d-block">Quantity: <b>{prod.quantity}</b> </span>

                <div class="d-flex justify-content-between">
                    <span>Amount</span>
                    <span>{prod.price * prod.quantity} €</span>
                </div>
            </div>
        </div>
    {/each}

<div class="d-flex text-muted pt-3">
    <div class="pb-3 mb-0 small lh-sm w-100">
        <div class="d-flex justify-content-between pb-1 mb-0">
            <strong class="text-gray-dark">Shipment</strong>
            <span>6.99 €</span>
        </div>
        
        {#if data.order.sales.length > 0}
            <div class="d-flex justify-content-between pb-1 mb-0">
                <strong class="text-gray-dark">Discount code</strong>
                <span>- {data.order.discount} %</span>
            </div>
        {:else}
            <div class="d-flex justify-content-between pb-1 mb-0">
                <span>No promos</span>
            </div>
        {/if}

        <div class="d-flex justify-content-between pb-1 mb-0">
            <strong class="text-gray-dark">Total amount</strong>
            <strong>{data.order.amount} €</strong>
        </div>
        <!-- <span class="d-block">Quantity: {prod.quantity} </span> -->
    </div>
</div>
</InfoPanel>

<InfoPanel title="Tracking status">
    <div class="d-flex text-muted pt-3">
        <div class="pb-3 mb-0 lh-sm w-100">
            
            <Input labelAlign="horizontal"  id="trackId" label="Tracking id" bind:value={data.order.tracking.id} type="number" readonly/>
            <Input labelAlign="horizontal"  id="trackProv" label="Tracking provider" bind:value={data.order.tracking.provider} readonly/>
            <Select labelAlign="horizontal" id="status-select" label="Current status" arialabel="Select status" bind:value={data.order.status} elements={env.status} />

        </div>
    </div>
</InfoPanel>

