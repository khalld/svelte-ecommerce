<script>
    import HorzInput from "../../../../../lib/component/HorzInput.svelte";
    import InfoPanelAdmin from "../../../../../lib/component/InfoPanelAdmin.svelte";
    import InfoPanelAdminHeader from "../../../../../lib/component/InfoPanelAdminHeader.svelte";
    import InputFile from "../../../../../lib/component/InputFile.svelte";
    import VertInput from "../../../../../lib/component/VertInput.svelte";
    
    export let data;
    let totPrice = 0.0;

    $: totPrice = ((data.product.vat / 100 ) * data.product.price)+ data.product.price

    $: console.log(data.product)
    
	async function handleClick() {
        // TODO: add fetch
		alert('Button Clicked');
	}
</script>

<InfoPanelAdmin on:click={handleClick}>
    <InfoPanelAdminHeader text="Detail of product {data.product._id}" />
    <HorzInput id="name" label="Name" bind:value={data.product.name} type="text" />
    <VertInput id="price" label="Price" bind:value={data.product.price} type="number" />

    <VertInput id="description" label="Description" bind:value={data.product.description} type="textarea" />

    <div class="mb-3 mt-2 row">
        <div class="col-4">
            <VertInput id="price" label="Price" bind:value={data.product.price} type="number" />
        </div>
        <div class="col-4">
            <VertInput id="vat" label="VAT" bind:value={data.product.vat} type="number" />
        </div>
        <div class="col-4">
            <VertInput id="totalprice" label="Total" bind:value={totPrice} type="number" />
        </div>

        <InputFile />

    </div>

</InfoPanelAdmin>