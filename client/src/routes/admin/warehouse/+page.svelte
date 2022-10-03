<script>
    import Modal from '../../../lib/component/Modal.svelte';
    import Table from '../../../lib/component/Table.svelte';
    import Tr from '../../../lib/component/Tr.svelte';
    // import {detail} from '../../../lib/js/tableutils.js';
    import env from '../../../lib/store/env.js';
    import {notifier} from '@beyonk/svelte-notifications';
    import { goto } from '$app/navigation';

    export let data;

    async function deleteProd(id){
        await fetch(`${env.host}/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => {
            if (res.status === 400){
                throw new Error('Something wrong happened')
            }
            if (res.status === 404){
                throw new Error('Product not exist')
            }
        })
        .then(() => {
            notifier.success('Deleted successfully')
            goto('/admin')
        })
        .catch(err => notifier.danger(err.message))


    }

</script>


<h1>Warehouse</h1>

<div class="row">
    <button class="btn btn-success" on:click={() => goto('/admin/warehouse/detail')}>Add new product</button>
</div>

<Table headers={['Name', 'Description', 'Quantity', '#']}>
    {#if data.products.length == 0}
        <div class="spinner-border mt-2">
            <span class="visually-hidden">Loading...</span>
        </div>
    {:else}
        {#each data.products as p}
            <Tr>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.quantity}</td>
                <td>
                    <i class="tb-sel fas fa-edit" on:click={() => goto(`/admin/warehouse/detail/${p._id}`)} />
                    <i class="tb-sel fa fa-trash" aria-hidden="true" data-bs-target="#deleteModal-{p._id}" data-bs-toggle="modal"/>
                    <Modal id="deleteModal-{p._id}" labeledby="modal-label-{p._id}" on:click={deleteProd(p._id)} title="Confirm delete" body="Are you sure that you want to delete product {p.code} ?"/>
                </td>
            </Tr>
        {/each}
    {/if}
</Table>

