<script>
    import Modal from '../../../lib/component/Modal.svelte';
import Table from '../../../lib/component/Table.svelte';
    import Tr from '../../../lib/component/Tr.svelte';
    import {detail, del} from '../../../lib/js/tableutils.js';

    export let data;

    async function deleteProd(){
        
    }

</script>


<h1>Warehouse</h1>

<div class="row">
    <button class="btn btn-success">Add new product</button>
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
                    <i class="tb-sel fas fa-edit" on:click={() => detail(p._id, 'warehouse/detail')} />
                    <i class="tb-sel fa fa-trash" aria-hidden="true" data-bs-target="#exampleModal" data-bs-toggle="modal"/>
                    <Modal id="exampleModal" labeledby="exampleModalLabel" confirm={() => deleteProd(p._id)}/>
                </td>
            </Tr>
        {/each}
    {/if}
</Table>

