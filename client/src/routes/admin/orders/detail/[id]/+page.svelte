<script>
    import env from '../../../../../lib/store/env';
    import { getNotificationsContext } from 'svelte-notifications';
    const { addNotification } = getNotificationsContext();
    import Input from '../../../../../lib/component/Input.svelte';
    import InfoPanel from '../../../../../lib/component/InfoPanel.svelte';
    import Select from '../../../../../lib/component/Select.svelte';
    import InfoPanelHeader from '../../../../../lib/component/InfoPanelHeader.svelte';
    import Order from '../../../../../lib/component/Order.svelte';

    export let data;

    let isNewOrder = data.order.status === "PENDING" ? true : false;

    async function submit() {
        try {
            if ((data.order.shipment.trackingId == undefined || data.order.shipment.trackingId.toString().length == 0) && data.order.status == 'SHIPPED' ){
                throw new Error('Need to insert tracking id')
            }

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
                addNotification({ text: 'Info submitted successfully!', type: 'success', position: 'bottom-right' })

            })
            .catch(err => addNotification({ text: err.message, type: 'error', position: 'bottom-right' }))
    
    
            if (isNewOrder && data.order.status === "SHIPPED"){
                // Update product's quantity warehouse
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
                        addNotification({ text: `Quantity of ${element.code} updated successfully`, type: 'success', position: 'bottom-right' })

                    })
                    .catch(err => addNotification({ text: err.message, type: 'error', position: 'bottom-right' }))
                });
            }
        
        } catch (e){
            addNotification({ text: e.message, type: 'error', position: 'bottom-right' })
        }
    }

</script>
<Order order={data.order} />

<div class="container">
    <form on:submit|preventDefault={submit}>
        <InfoPanel>
            <InfoPanelHeader text="Confirm order" />
            <div class="d-flex text-muted pt-3">
                <div class="pb-3 mb-0 lh-sm w-100">
                    
                    <Input labelAlign="horizontal" id="trackId" label="Tracking id" bind:value={data.order.shipment.trackingId} type="number" />
                    
                    <Select labelAlign="horizontal" id="status-select" label="Current status" arialabel="Default select example" bind:value={data.order.status} elements={env.status} />

                    <button class="w-100 btn btn-lg bg-success" on:click={submit}>Send</button>

                </div>
            </div>
        </InfoPanel>
    </form>
</div>
