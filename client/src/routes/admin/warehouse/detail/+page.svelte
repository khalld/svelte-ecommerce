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
        photos: [
            {
                id: 1,
                src: ''
                // src: 'https://www.cameraegg.org/wp-content/uploads/2015/06/canon-powershot-g3-x-sample-images-1.jpg'
            },
            {
                id: 2,
                src: ''
                // src: 'https://www.cameraegg.org/wp-content/uploads/2015/06/canon-powershot-g3-x-sample-images-1.jpg'
            },
            {
                id: 3,
                src: ''
                // src: 'https://www.cameraegg.org/wp-content/uploads/2015/06/canon-powershot-g3-x-sample-images-1.jpg'
            },
            {
                id: 4,
                src: ''
                // src: 'https://www.cameraegg.org/wp-content/uploads/2015/06/canon-powershot-g3-x-sample-images-1.jpg'
            },
            {
                id: 5,
                src: ''
                // src: 'https://www.cameraegg.org/wp-content/uploads/2015/06/canon-powershot-g3-x-sample-images-1.jpg'
            },
        ],
        enabled: false
    };

    async function submit() {
        try {
            if (product.name == undefined || product.code == undefined || product.description == undefined || product.longDescription == undefined || product.quantity == undefined || product.price == undefined ){
                throw new Error('All fields are mandatory')
            }

            if (product.photos[0].src.length == 0 || product.photos[1].src.length == 0 || product.photos[2].src.length == 0 || product.photos[3].src.length == 0 || product.photos[4].src.length == 0){
                throw new Error('You must insert all pictures!')
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
                addNotification({ text: 'New product added', type: 'success', position: 'bottom-right' })
                goto('/admin/warehouse')
            })
            .catch(err => addNotification({ text: e.message, type: 'error', position: 'bottom-right' }))

        } catch (e) {
            addNotification({ text: e.message, type: 'error', position: 'bottom-right' })
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
        <!-- TODO: Aggiungi 'simulatore del prezzo' in v2 -->
    </div>

    <div class="row">
        <div class="col-4">
            <img src={product.photos[0].src} class="img-fluid w-50 border" alt="pic-n-{product.photos[0].id}" >
        </div>
        <div class="col-8">
            <Input type="text" bind:value={product.photos[0].src} id="input-pic-{product.photos[0].id}" label="Pic n°{product.photos[0].id}"/>
        </div>
    </div>

    <div class="row">
        <div class="col-4">
            <img src={product.photos[1].src} class="img-fluid w-50 border" alt="pic-n-{product.photos[1].id}" >
        </div>
        <div class="col-8">
            <Input type="text" bind:value={product.photos[1].src} id="input-pic-{product.photos[1].id}" label="Pic n°{product.photos[1].id}"/>
        </div>
    </div>

    <div class="row">
        <div class="col-4">
            <img src={product.photos[2].src} class="img-fluid w-50 border" alt="pic-n-{product.photos[2].id}" >
        </div>
        <div class="col-8">
            <Input type="text" bind:value={product.photos[2].src} id="input-pic-{product.photos[2].id}" label="Pic n°{product.photos[2].id}"/>
        </div>
    </div>

    <div class="row">
        <div class="col-4">
            <img src={product.photos[3].src} class="img-fluid w-50 border" alt="pic-n-{product.photos[3].id}" >
        </div>
        <div class="col-8">
            <Input type="text" bind:value={product.photos[3].src} id="input-pic-{product.photos[3].id}" label="Pic n°{product.photos[3].id}"/>
        </div>
    </div>

    <div class="row">
        <div class="col-4">
            <img src={product.photos[4].src} class="img-fluid w-50 border" alt="pic-n-{product.photos[4].id}" >
        </div>
        <div class="col-8">
            <Input type="text" bind:value={product.photos[4].src} id="input-pic-{product.photos[4].id}" label="Pic n°{product.photos[4].id}"/>
        </div>
    </div>

</InfoPanelAdmin>