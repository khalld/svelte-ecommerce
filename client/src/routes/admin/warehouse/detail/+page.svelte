<script>
    import InfoPanelAdmin from "../../../../lib/component/InfoPanelAdmin.svelte";
    import InfoPanelHeader from "../../../../lib/component/InfoPanelHeader.svelte";
    import InputFile from "../../../../lib/component/InputFile.svelte";
    import Hint from "../../../../lib/component/Hint.svelte";

    import Input from "../../../../lib/component/Input.svelte";
    import Checkbox from "../../../../lib/component/Checkbox.svelte";
    import env from "../../../../lib/store/env.js";
    import { goto } from '$app/navigation';    
    import { notifier } from '@beyonk/svelte-notifications';
    import calculateVat from '../../../../lib/js/utils.js';

    let product = {
        name: "Product 1",
        code: "PD1" + Math.random(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        longDescription: "Sed ut lobortis velit, volutpat porta ante. Vestibulum neque mauris, efficitur in dapibus eget, semper et elit",
        quantity: 100,
        price: 10.89,
        category: [],
        photos: [
            {
                id: 1,
                src: 'https://www.cameraegg.org/wp-content/uploads/2015/06/canon-powershot-g3-x-sample-images-1.jpg'
            },
            {
                id: 2,
                src: 'https://www.cameraegg.org/wp-content/uploads/2015/06/canon-powershot-g3-x-sample-images-1.jpg'
            },
            {
                id: 3,
                src: 'https://www.cameraegg.org/wp-content/uploads/2015/06/canon-powershot-g3-x-sample-images-1.jpg'
            },
            {
                id: 4,
                src: 'https://www.cameraegg.org/wp-content/uploads/2015/06/canon-powershot-g3-x-sample-images-1.jpg'
            },
            {
                id: 5,
                src: 'https://www.cameraegg.org/wp-content/uploads/2015/06/canon-powershot-g3-x-sample-images-1.jpg'
            },
        ],
        enabled: false
    };

    
    //let totPrice = 0.0;

    //$: totPrice = calculateVat(product.price, product.vat)

    async function submit() {
        try {
        
            // FIXME:
            let mandatory = product
            delete mandatory.category,
            delete mandatory.photos,

            Object.values(mandatory).forEach((element, index, array) => {
                if (element === null || element.length === 0) {
                    throw new Error('All fields are mandatory!');
                } 
            })
        
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

        } catch (e) {
            console.error(e);
        }
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

    <Input id="long-description" label="Long description" bind:value={product.longDescription} type="textarea" />


    <div class="mb-3 mt-2 row">
        <div class="col-3">
            <Input id="quantity" label="Quantity" bind:value={product.quantity} type="number" />
        </div>
        <div class="col-3">
            <Input id="price" label="Price" bind:value={product.price} type="number" />
        </div>
        <!-- TODO: Aggiungi 'simulatore del prezzo' -->
    </div>

    {#each product.photos as photo}
        <div class="col-6">
            <Input type="text" bind:value={photo.src} id="input-pic-{photo.id}" label="Pic n°{photo.id}"/>
        </div>
        {#if photo.src.length > 0}
        <div class="col-6">
            <img src={photo.src} class="rounded mx-auto d-block w-25" alt="pic-n-{photo.id}" >
        </div>
        {/if}
    {/each}

</InfoPanelAdmin>