<script>
    import Order from "../../../lib/component/Order.svelte";
    export let data;
</script>

<Order order={data.order} />