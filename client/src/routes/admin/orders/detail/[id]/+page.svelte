<script>
    import env from '../../../../../lib/store/env';
    import { notifier } from '@beyonk/svelte-notifications';
    import Input from '../../../../../lib/component/Input.svelte';
    import InfoPanel from '../../../../../lib/component/InfoPanel.svelte';
    import Select from '../../../../../lib/component/Select.svelte';
    import InfoPanelHeader from '../../../../../lib/component/InfoPanelHeader.svelte';
    import Order from '../../../../../lib/component/Order.svelte';
    export let data;

    let isNewOrder = data.order.status === "PENDING" ? true : false;

    async function submit() {

        try {
        
            Object.values(data.order.tracking).forEach((element, index, array) => {
                if (element === null || element.length === 0) {
                    throw new Error('All fields are mandatory!');
                } 
            })

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
        
        } catch (e){
            console.error(e)
        }




        // TODO: dopo aver passato SHIPPED gestisci la quantità di oggetti nel warehouse

    }

</script>
<Order order={data.order} />

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
