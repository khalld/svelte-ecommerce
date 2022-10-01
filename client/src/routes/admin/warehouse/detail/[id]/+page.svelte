<script>
    import HorzInput from "../../../../../lib/component/HorzInput.svelte";
    import InfoPanel from "../../../../../lib/component/InfoPanel.svelte";
    import InfoPanelHeader from "../../../../../lib/component/InfoPanelHeader.svelte";
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

<InfoPanel on:click={handleClick}>
    <InfoPanelHeader text="Detail of product {data.product._id}" />
    <HorzInput id="name" label="Name" value={data.product.name} type="text" />
    <VertInput id="price" label="Price" value={data.product.price} type="number" />

    <VertInput id="description" label="Description" value={data.product.description} type="textarea" />

    <div class="mb-3 mt-2 row">
        <div class="col-4">
            <VertInput id="price" label="Price" value={data.product.price} type="number" />
        </div>
        <div class="col-4">
            <VertInput id="vat" label="VAT" value={data.product.vat} type="number" />
        </div>
        <div class="col-4">
            <VertInput id="totalprice" label="Total" value={totPrice} type="number" />
        </div>

        <InputFile />

    </div>

</InfoPanel>