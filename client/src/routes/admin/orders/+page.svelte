<script>
    import Table from '../../../lib/component/Table.svelte';
    import Tr from '../../../lib/component/Tr.svelte';

    export let data;

</script>

<h1>Users</h1>

<Table headers={['id', 'Name', 'Email', '#']}>
    {#if data.orders.length == 0}
        <div class="spinner-border mt-2">
            <span class="visually-hidden">Loading...</span>
        </div>
    {:else}
        {#each data.orders as o}
            <Tr>
                <!-- <td>{u._id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><i class="fas fa-edit" /> <i class="fa fa-trash" aria-hidden="true" /> </td> -->
            </Tr>
        {/each}
    {/if}
</Table>