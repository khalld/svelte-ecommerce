<script>
    import Hint from "../../../lib/component/Hint.svelte";
    import InfoPanel from "../../../lib/component/InfoPanel.svelte";
    import OrderList from "../../../lib/component/OrderList.svelte";
    import OrderElement from "../../../lib/component/OrderElement.svelte";

    export let data;

    console.log("orders", data.orders)


</script>


<div class="container">

    <InfoPanel title="Orders list">
        {#if data.orders.length === 0}
            <Hint str="No order yet"/>
        {:else}
            <OrderList>
                {#each data.orders as o}
                    <OrderElement order={o} />
                {/each}
            </OrderList>
        {/if}
    </InfoPanel>

</div>

