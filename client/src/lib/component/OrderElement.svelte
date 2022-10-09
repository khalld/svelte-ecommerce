<script>
    import { goto } from "$app/navigation";
    import convertData from '../js/formatDate.js';

    export let order;

    function red(){
        goto(`/findorder/${order.code}`)
    }
</script>

<li class="list-group-item d-flex justify-content-between align-items-start list-group-item-action tb-sel" on:click={() => red()}>
    <div class="ms-2 me-auto">
        <div>Day: <span class="fw-bold">{convertData(order.data)}</span></div>
        Total amount: <span class="fw-bold"> {order.amount} € </span>
    </div>
    {#if order.status == "PENDING"}
        <span class="badge bg-warning rounded-pill">PENDING</span>
    {:else if order.status == "REJECTED"}
        <span class="badge bg-danger rounded-pill">REJECTED</span>
    {:else if order.status == "SHIPPED"}
        <span class="badge bg-success rounded-pill">SHIPPED</span>
    {:else if order.status == "DELIVERED"}
        <span class="badge bg-success rounded-pill">DELIVERED</span>
    {/if}
</li>