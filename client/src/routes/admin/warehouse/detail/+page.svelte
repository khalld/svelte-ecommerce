<script>
    import InfoPanelAdmin from "../../../../lib/component/InfoPanelAdmin.svelte";
    import InfoPanelHeader from "../../../../lib/component/InfoPanelHeader.svelte";
    import InputFile from "../../../../lib/component/InputFile.svelte";
    import Input from "../../../../lib/component/Input.svelte";
    import Checkbox from "../../../../lib/component/Checkbox.svelte";
    import env from "../../../../lib/store/env.js";
    import { goto } from '$app/navigation';    
    import { notifier } from '@beyonk/svelte-notifications';

    let product = {
        name: "Product 1",
        code: "PD1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut lobortis velit, volutpat porta ante. Vestibulum neque mauris, efficitur in dapibus eget, semper et elit",
        quantity: 100,
        price: 10.89,
        vat: 21,
        category: [],
        photos: [],
        enabled: false
    };

    let totPrice = 0.0;

    $: totPrice = (((product.vat / 100 ) * product.price)+ product.price).toFixed(2)
    
	async function submit() {
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
            notifier.success('New product added!')
            goto('/admin/warehouse')
        })
        .catch(err => notifier.danger(err.message))
	}

</script>

<InfoPanelAdmin on:click={submit}>
    <InfoPanelHeader text="Detail of product {product._id}" />

    <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12">
            <Input labelAlign="horizontal"  id="name" label="Name" bind:value={product.name} type="text" />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
            <Input labelAlign="horizontal"  id="code" label="Code" bind:value={product.code} type="text" />
        </div>
    </div>

    <Checkbox id="enabled" bind:value={product.enabled} label="Enable" />

    <Input id="description" label="Description" bind:value={product.description} type="textarea" />

    <div class="mb-3 mt-2 row">
        <div class="col-3">
            <Input id="quantity" label="Quantity" bind:value={product.quantity} type="number" />
        </div>
        <div class="col-3">
            <Input id="price" label="Price" bind:value={product.price} type="number" />
        </div>
        <div class="col-3">
            <Input id="vat" label="VAT" bind:value={product.vat} type="number" />
        </div>
        <div class="col-3">
            <Input id="totalprice" label="Total" bind:value={totPrice} type="number" />
        </div>
        <InputFile />
    </div>

</InfoPanelAdmin>