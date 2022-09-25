<script>
    import Table from '../../../lib/component/Table.svelte';
    import Tr from '../../../lib/component/Tr.svelte';

    export let data;
</script>

<h1>Users</h1>

<Table headers={['id', 'Name', 'Email', '#']}>
    {#if data.users.length == 0}
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    {:else}
        {#each data.users as u}
            <Tr>
                <td>{u._id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><i class="fas fa-edit" /> <i class="fa fa-trash" aria-hidden="true" /> </td>
            </Tr>
        {/each}
    {/if}
</Table>