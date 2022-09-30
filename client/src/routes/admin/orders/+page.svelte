<script>
    import Table from '../../../lib/component/Table.svelte';
    import Tr from '../../../lib/component/Tr.svelte';
    import { goto } from '$app/navigation';

    export let data;

</script>

<h1>Users</h1>

<Table headers={['Data', 'Customer email', 'Amount', 'Status', '#']}>
    {#if data.orders.length == 0}
        <div class="spinner-border mt-2">
            <span class="visually-hidden">Loading...</span>
        </div>
    {:else}
        {#each data.orders as o}
            <Tr>
                <td>{o.data}</td>
                <td>{o.email}</td>
                <td>{o.amount} €</td>
                <td class="{o.status == "PENDING" ? "table-warning" : (o.status == "REFUSED" ? "table-danger" : "table-success") }">{o.status}</td>
                <td>
                    <i class="fas fa-edit tb-sel" on:click={() => goto(`/admin/orders/detail/${o._id}`)}/>
                </td>
            </Tr>
        {/each}
    {/if}
</Table>