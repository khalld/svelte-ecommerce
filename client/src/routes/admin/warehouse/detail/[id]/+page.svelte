<script>
    import InfoPanelAdmin from "../../../../../lib/component/InfoPanelAdmin.svelte";
    import InfoPanelHeader from "../../../../../lib/component/InfoPanelHeader.svelte";
    import Input from "../../../../../lib/component/Input.svelte";
    import Checkbox from "../../../../../lib/component/Checkbox.svelte";
    import env from "../../../../../lib/store/env.js";
    import { notifier } from '@beyonk/svelte-notifications';

    export let data;
    
	async function submit() {

        try {
            if (product.name == undefined || product.code == undefined || product.description == undefined || product.longDescription == undefined || product.quantity == undefined || product.price == undefined ){
                throw new Error('All fields are mandatory')
            }

            if (product.photos[0].src.length == 0 || product.photos[1].src.length == 0 || product.photos[2].src.length == 0 || product.photos[3].src.length == 0 || product.photos[4].src.length == 0){
                throw new Error('You must insert all pictures!')
            }
            
            await fetch(`${env.host}/products/${data.product._id}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data.product)
            }).then(res => {
                if (res.status == 400){
                    throw new Error('Something wrong happened')
                }
                if (res.status == 404){
                    throw new Error('Product not exist')
                }
                return res.json();
            })
            .then(() => {
                addNotification({ text: 'Product edited', type: 'success', position: 'bottom-right' })
            })
            .catch(err => addNotification({ text: e.message, type: 'error', position: 'bottom-right' }))
            
        } catch (e){
            console.error(e)
        }

	}

</script>

<InfoPanelAdmin on:click={submit}>
    <InfoPanelHeader text="Detail of product" />

    <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12">
            <Input labelAlign="horizontal"  id="name" label="Name" bind:value={data.product.name} type="text" />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
            <Input labelAlign="horizontal"  id="code" label="Code" bind:value={data.product.code} type="text" />
        </div>
    </div>

    <Checkbox id="enabled" bind:value={data.product.enabled} label="Enable" />

    <Input id="description" label="Description" bind:value={data.product.description} type="textarea" />

    <Input id="long-description" label="Long description" bind:value={data.product.longDescription} type="textarea" />

    <div class="mb-3 mt-2 row">
        <div class="col-3">
            <Input id="quantity" label="Quantity" bind:value={data.product.quantity} type="number" />
        </div>
        <div class="col-3">
            <Input id="price" label="Price" bind:value={data.product.price} type="number" />
        </div>
    </div>

    <div class="row">
        <div class="col-4">
            <img src={data.product.photos[0].src} class="img-fluid w-50 border" alt="pic-n-{data.product.photos[0].id}" >
        </div>
        <div class="col-8">
            <Input type="text" bind:value={data.product.photos[0].src} id="input-pic-{data.product.photos[0].id}" label="Pic n°{data.product.photos[0].id}"/>
        </div>
    </div>

    <div class="row">
        <div class="col-4">
            <img src={data.product.photos[1].src} class="img-fluid w-50 border" alt="pic-n-{data.product.photos[1].id}" >
        </div>
        <div class="col-8">
            <Input type="text" bind:value={data.product.photos[1].src} id="input-pic-{data.product.photos[1].id}" label="Pic n°{data.product.photos[1].id}"/>
        </div>
    </div>

    <div class="row">
        <div class="col-4">
            <img src={data.product.photos[2].src} class="img-fluid w-50 border" alt="pic-n-{data.product.photos[2].id}" >
        </div>
        <div class="col-8">
            <Input type="text" bind:value={data.product.photos[2].src} id="input-pic-{data.product.photos[2].id}" label="Pic n°{data.product.photos[2].id}"/>
        </div>
    </div>

    <div class="row">
        <div class="col-4">
            <img src={data.product.photos[3].src} class="img-fluid w-50 border" alt="pic-n-{data.product.photos[3].id}" >
        </div>
        <div class="col-8">
            <Input type="text" bind:value={data.product.photos[3].src} id="input-pic-{data.product.photos[3].id}" label="Pic n°{data.product.photos[3].id}"/>
        </div>
    </div>

    <div class="row">
        <div class="col-4">
            <img src={data.product.photos[4].src} class="img-fluid w-50 border" alt="pic-n-{data.product.photos[4].id}" >
        </div>
        <div class="col-8">
            <Input type="text" bind:value={data.product.photos[4].src} id="input-pic-{data.product.photos[4].id}" label="Pic n°{data.product.photos[4].id}"/>
        </div>
    </div>
    
</InfoPanelAdmin>