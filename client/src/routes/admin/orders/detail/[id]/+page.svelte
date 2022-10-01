<script>
    import HorizInput from '../../../../../lib/component/HorzInput.svelte';
    import env from '../../../../../lib/store/env';
    import { notifier } from '@beyonk/svelte-notifications';

    const status = ["PENDING", "REJECTED", "SHIPPED"];
    
    export let data;

    // TODO: prendilo col nuovo modello da Db le info del tracking
    var orderConf = {};
    let error;

    async function submit() {
        notifier.success('processato correttamente!')
    }



</script>


<div class="container">

    <form on:submit|preventDefault={submit}>
        <h1 class="h3 mb-3 fw-normal">Detail of order {data.order._id}</h1>
        <div class="card my-3 p-3 bg-body rounded shadow-sm">
            <h6 class="border-bottom pb-2 mb-0">User information</h6>

            <HorizInput id="custInfo" label="Customer info" bind:value={data.order.customerName} inputClass="form-controls-plaintext mt-2" readonly="readonly" />

            <HorizInput id="email" label="Customer email" bind:value={data.order.email} inputClass="form-controls-plaintext mt-2" readonly="readonly" />
            <HorizInput id="address" label="Address" bind:value={data.order.address} inputClass="form-controls-plaintext mt-2" readonly="readonly" />


            {#if data.order.notes != null}
                <HorizInput id="notes" label="Notes" bind:value={data.order.notes} inputClass="form-controls-plaintext mt-2" readonly="readonly" />
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
                        <span class="d-block">Single price: <b>{prod.price}</b></span>
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
                    <div class="d-flex justify-content-between pb-1 mb-0">
                        <strong class="text-gray-dark">Discount code</strong>
                        <span>{data.order.amount} €</span>
                    </div>
                    <div class="d-flex justify-content-between pb-1 mb-0">
                        <strong class="text-gray-dark">Discount code</strong>
                        <span>- {data.order.discount} %</span>
                    </div>
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
                    
                    <HorizInput id="trackId" label="Tracking id" bind:value={orderConf.trackId} type="number"/>
                    <HorizInput id="trackProv" label="Tracking provider" bind:value={orderConf.trackProv}/>
                                            
                    <div class="mb-3 mt-2 row">
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

            <!-- <small class="d-block text-end mt-3">
                <a href="#">All suggestions</a>
            </small> -->
        </div>
    </form>
</div>
