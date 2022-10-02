<script>
    import HorizInput from '../../../../../lib/component/HorzInput.svelte';
    import env from '../../../../../lib/store/env';
    import { notifier } from '@beyonk/svelte-notifications';
    import VertInput from '../../../../../lib/component/VertInput.svelte';
    import HorzInput from '../../../../../lib/component/HorzInput.svelte';
    import InfoPanel from '../../../../../lib/component/InfoPanel.svelte';

    const status = ["PENDING", "REJECTED", "SHIPPED"];
    
    export let data;

    async function submit() {
        await fetch(`${env.host}/orders/${data.order._id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data.order)
        }).then(res => {
            if (res.status == 400){
                throw new Error('Something wrong happened')
            }
            return res.json();
        })
        .then(() => {
            notifier.success('processato correttamente!')
        })
        .catch(err => notifier.danger(err.message))

    }

</script>


<div class="container">
    <form on:submit|preventDefault={submit}>
        <InfoPanel title="Detail of order {data.order._id}">

            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <HorzInput id="name" bind:value={data.order.customer.name} type="text" readonly/>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <HorzInput id="surname" bind:value={data.order.customer.surname} type="text" readonly/>
                </div>
            </div>

            <HorizInput id="email" label="Email" bind:value={data.order.customer.email} readonly="readonly" type="email"/>

            <VertInput id="address" label="Address" bind:value={data.order.address.address} readonly="readonly" />
            <VertInput id="address2" bind:value={data.order.address.address2} readonly="readonly" />
            <div class="row">
                <div class="col-4">
                    <VertInput id="country" bind:value={data.order.address.country} readonly="readonly" />
                </div>
                <div class="col-4">
                    <VertInput id="region" bind:value={data.order.address.region} readonly="readonly" />
                </div>
                <div class="col-4">
                    <VertInput id="zip" bind:value={data.order.address.zip} readonly="readonly" />
                </div>
            </div>

            {#if data.order.notes != null}
                <HorizInput id="notes" label="Notes" bind:value={data.order.notes} readonly="readonly" type="textarea"/>
            {:else}
                <i>No additional notes for expedition</i>
            {/if}

            <h6 class="border-bottom pb-2 mb-0 mt-4">Order detail</h6>
            
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
            
            <h6 class="border-bottom pb-2 mb-0">Confirm order</h6>
            <div class="d-flex text-muted pt-3">
                <div class="pb-3 mb-0 lh-sm w-100">
                    
                    <HorizInput id="trackId" label="Tracking id" bind:value={data.order.tracking.id} type="number" />
                    <HorizInput id="trackProv" label="Tracking provider" bind:value={data.order.tracking.provider} />
                    
                    <div class="mb-3 row">
                        <label for="status-select" class="col-sm-2 col-form-label"><b>Current status</b></label>
                        <div class="col-sm-10">
                            <select class="form-select" aria-label="Default select example" bind:value={data.order.status} >
                                {#each status as s}
                                    <option value={s}>
                                        {s}
                                    </option>
                                {/each}
                            </select>
                        </div>
                    </div>
                    <button class="w-100 btn btn-lg bg-success" on:click={submit}>Send</button>

                </div>
            </div>

        </InfoPanel>
    </form>
</div>
