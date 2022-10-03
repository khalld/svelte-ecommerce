<script>

    import Carousel from "../../../lib/component/Carousel.svelte";
    import InfoPanel from "../../../lib/component/InfoPanel.svelte";
    import Input from "../../../lib/component/Input.svelte";
    export let data;

    let totPrice = 0.0;
    $: totPrice = ((data.product.vat / 100 ) * data.product.price)+ data.product.price

</script>

<InfoPanel >
    <Carousel id="carousel-product" pics={data.product.photos}/>

    <div class="mb-3 mt-2 row">
        <div class="col-3">
            <Input id="quantity" label="Available quantity" bind:value={data.product.quantity} type="number" readonly/>
        </div>
        <div class="col-3">
            <Input id="totalprice" label="Total" bind:value={totPrice} type="number" readonly />
        </div>
    </div>
</InfoPanel>