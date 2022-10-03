<script>
    import { goto } from "$app/navigation";
    
    export let order;

    function red(){
        goto(`/findorder/${order.code}`)
    }
</script>

<li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
        <div class="fw-bold tb-sel" on:click={() => red()}>{order.data}</div>
        Content for item
    </div>
    {#if order.status == "PENDING"}
        <span class="badge bg-warning rounded-pill"><i class="fa-solid fa-boxes-stacked fa-xl p-2"></i></span>
    {:else if order.status == "REJECTED"}
        <span class="badge bg-danger rounded-pill"><i class="fa-solid fa-exclamation fa-xl p-2"></i></span>
    {:else if order.status == "SHIPPED"}
        <span class="badge bg-success rounded-pill"><i class="fa-solid fa-truck-ramp-box p-2"></i></span>
    {/if}
</li>