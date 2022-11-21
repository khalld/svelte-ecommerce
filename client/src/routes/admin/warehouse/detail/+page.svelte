<script>
    import InfoPanelAdmin from "../../../../lib/component/InfoPanelAdmin.svelte";
    import InfoPanelHeader from "../../../../lib/component/InfoPanelHeader.svelte";
    import Input from "../../../../lib/component/Input.svelte";
    import Checkbox from "../../../../lib/component/Checkbox.svelte";
    import env from "../../../../lib/store/env.js";
    import { goto } from '$app/navigation';    
    import { getNotificationsContext } from 'svelte-notifications';
    const { addNotification } = getNotificationsContext();

    let product = {
        // name: "Product 1",
        // code: "PD1" + Math.random(),
        // description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        // longDescription: "Sed ut lobortis velit, volutpat porta ante. Vestibulum neque mauris, efficitur in dapibus eget, semper et elit",
        // quantity: 100,
        // price: 10.89,
        // category: [], // TODO: Enable logic in v2
        enabled: false
    };

    async function submit() {
        try {
            if (product.name == undefined || product.code == undefined || product.description == undefined || product.longDescription == undefined || product.quantity == undefined || product.price == undefined ){
                throw new Error('All fields are mandatory')
            }
            
            await fetch(`${env.host}/products/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(product)
            }).then(res => {
                if (res.status == 400){
                    throw new Error('Something wrong happened!')
                }
                if (res.status == 409){
                    throw new Error('Product code already used!')
                }
                return res.json();
            })
            .then(() => {
                addNotification({ text: 'New product added', type: 'success', position: 'bottom-right', removeAfter: 6000 })
                goto('/admin/warehouse')
            })
            .catch(err => addNotification({ text: err.message, type: 'error', position: 'bottom-right', removeAfter: 6000 }))

        } catch (e) {
            addNotification({ text: e.message, type: 'error', position: 'bottom-right', removeAfter: 6000 })
        }
	}
</script>

<InfoPanelAdmin on:click={submit}>
    {#if product._id == undefined}
        <InfoPanelHeader text="Create new product" />
    {:else}
        <InfoPanelHeader text="Detail of product {product._id}" />
    {/if}

    <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12">
            <Input labelAlign="horizontal"  id="name" label="Name" bind:value={product.name} type="text" />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
            <Input labelAlign="horizontal"  id="code" label="Code" bind:value={product.code} type="text" />
        </div>
    </div>

    <Checkbox id="enabled" bind:value={product.enabled} label="Enabled" />

    <Input id="description" label="Description" bind:value={product.description} type="textarea" />

    <Input id="long-description" label="Long description" bind:value={product.longDescription} type="textarea" />


    <div class="mb-3 mt-2 row">
        <div class="col-3">
            <Input id="quantity" label="Quantity" bind:value={product.quantity} type="number" />
        </div>
        <div class="col-3">
            <Input id="price" label="Price" bind:value={product.price} type="number" />
        </div>
        <!-- TODO: Aggiungi 'simulatore del prezzo' in v2 -->
    </div>

</InfoPanelAdmin>