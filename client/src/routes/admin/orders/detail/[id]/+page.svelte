<script>
    import env from '../../../../../lib/store/env';
    import { notifier } from '@beyonk/svelte-notifications';
    import Input from '../../../../../lib/component/Input.svelte';
    import InfoPanel from '../../../../../lib/component/InfoPanel.svelte';
    import Select from '../../../../../lib/component/Select.svelte';
    import InfoPanelHeader from '../../../../../lib/component/InfoPanelHeader.svelte';
  import { onMount } from 'svelte';
    
    export let data;

    let isNewOrder = data.order.status === "PENDING" ? true : false;

    // onMount(async() => {
    //     isNewOrder = data.order.status === "PENDING" ? true : false
    // })

    $: console.log(isNewOrder)

    // $: console.log(initialStatus)

    async function submit() {
        await fetch(`${env.host}/orders/${data.order._id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data.order)
        }).then(res => {
            if (res.status == 400 || res.status == 404){
                throw new Error('Something wrong happened')
            }
            return res.json();
        })
        .then(() => {
            notifier.success('Info submitted successfully')
        })
        .catch(err => notifier.danger(err.message))


        if (isNewOrder && data.order.status === "SHIPPED"){
            console.log(data.order.products)

            data.order.products.forEach(async element => {
                await fetch(`${env.host}/products/updatequantity/${element._id}`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({quantity: element.quantity})
                })
                .then(res => {
                    if (res.status == 400 || res.status == 404){
                        throw new Error('Something wrong happened')
                    }
                })
                .then(() => {
                    notifier.success(`Quantity of ${element.code} updated successfully`)
                })
                .catch(err => notifier.danger(err.message))
            });
        }




        // TODO: dopo aver passato SHIPPED gestisci la quantità di oggetti nel warehouse

    }

</script>

<div class="container">
    <InfoPanel title="Detail of order {data.order._id}">
        <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12">
                <Input labelAlign="horizontal"  id="name" bind:value={data.order.customer.name} type="text" readonly/>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
                <Input labelAlign="horizontal"  id="surname" bind:value={data.order.customer.surname} type="text" readonly/>
            </div>
        </div>

        <Input id="email" label="Email" bind:value={data.order.customer.email} readonly="readonly" type="email" labelAlign="horizontal"/>

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
            <Input labelAlign="horizontal" id="notes" label="Notes" bind:value={data.order.notes} readonly="readonly" type="textarea"/>
        {:else}
            <i>No additional notes for expedition</i>
        {/if}
    </InfoPanel>

    <InfoPanel title="Order detail">
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
</div>


<div class="container">
    <form on:submit|preventDefault={submit}>
        <InfoPanel>
            <InfoPanelHeader text="Confirm order" />
            <div class="d-flex text-muted pt-3">
                <div class="pb-3 mb-0 lh-sm w-100">
                    
                    <Input labelAlign="horizontal" id="trackId" label="Tracking id" bind:value={data.order.tracking.id} type="number" />
                    <Input labelAlign="horizontal" id="trackProv" label="Tracking provider" bind:value={data.order.tracking.provider} />
                    
                    <Select labelAlign="horizontal" id="status-select" label="Current status" arialabel="Default select example" bind:value={data.order.status} elements={env.status} />

                    <button class="w-100 btn btn-lg bg-success" on:click={submit}>Send</button>

                </div>
            </div>
        </InfoPanel>
    </form>
</div>
