<script>
    import InfoPanelAdmin from "../../../../../lib/component/InfoPanelAdmin.svelte";
    import InfoPanelHeader from "../../../../../lib/component/InfoPanelHeader.svelte";
    import InputFile from "../../../../../lib/component/InputFile.svelte";
    import Input from "../../../../../lib/component/Input.svelte";
    import Checkbox from "../../../../../lib/component/Checkbox.svelte";
    import env from "../../../../../lib/store/env.js";
    import { notifier } from '@beyonk/svelte-notifications';
    import Carousel from "../../../../../lib/component/Carousel.svelte";
    import calculateVat from "../../../../../lib/js/utils";

    export let data;
    
	async function submit() {

        try {
            // FIXME:
            let mandatory = data.product
            delete mandatory.category,
            delete mandatory.photos,

            Object.values(mandatory).forEach((element, index, array) => {
                if (element === null || element.length === 0) {
                    throw new Error('All fields are mandatory!');
                } 
            })
            
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
                notifier.success('Product edited')
            })
            .catch(err => notifier.danger(err.message))
            
        } catch (e){
            console.error(e)
        }

	}

</script>

<InfoPanelAdmin on:click={submit}>
    <InfoPanelHeader text="Detail of product {data.product._id}" />

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

    <div class="d-flex flex-column justify-content-between mb-3">
        <div class="p-2 order-2">
            {#each data.product.photos as photo}
                    <Input type="text" bind:value={photo.src} id="input-pic-{photo.id}" label="Pic n°{photo.id}" labelAlign='horizontal'/>
            {/each}</div>
        <div class="order-1">
            <div class="container w-50 mt-2">
                <InfoPanelHeader text="Preview"/>
                <Carousel id="carousel-product" pics={data.product.photos} />
            </div>
        </div>
    </div>

</InfoPanelAdmin>