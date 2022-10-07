<script>
    import Modal from '../../../lib/component/Modal.svelte';
    import Table from '../../../lib/component/Table.svelte';
    import Tr from '../../../lib/component/Tr.svelte';
    import env from '../../../lib/store/env.js';
    import {notifier} from '@beyonk/svelte-notifications';
    import { goto } from '$app/navigation';
    import Pagenavigation from '../../../lib/component/PageNavigation.svelte';

    export let data;
	let currPage = data.products.currentPage;
	let productsPage = [...Array(data.products.totalPages).keys() ]

    async function changePage(selPage){
		const limit = 10

		await fetch(`${env.host}/products?page=${selPage}&limit=${limit}`)
			.then(res => {
				if (res.status == 400){
					throw new Error('Something wrong happened')
				}
				return res.json();
			})
			.then(data2 => {
				data.products = data2;
			})
			.catch(err => console.log(err))
        
		currPage = selPage;
	}

    
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
            // TODO: Sistemare!
            // const indexOfObject = data.products.products.findIndex(object => {
            //     return object._id === id;
            // });
            // data.products.products = data.products.products.splice(indexOfObject, 1);
            notifier.success('Product deleted successfully')
        })
        .catch(err => notifier.danger(err.message))


    }

</script>


<h1>Warehouse</h1>

<div class="d-flex flex-row-reverse bd-highlight">
    <button class="btn btn-success" on:click={() => goto('/admin/warehouse/detail')}>Add new product</button>
</div>

<Table headers={['Code', 'Name', 'Enabled' ,'Price', 'Description', 'Quantity', 'Actions']}>
    {#if data.products.products.length == 0}
        <div class="spinner-border mt-2">
            <span class="visually-hidden">Loading...</span>
        </div>
    {:else}
        {#each data.products.products as p}
            <Tr>
                <td>{p.code}</td>
                <td>{p.name}</td>
                <td>
                    <div class="form-check form-switch">
                        {#if p.enabled === true}
                            <input class="form-switch form-check-input" type="checkbox" role="switch" id="check-{p._id}" aria-checked checked disabled>
                        {:else}
                        <input class="form-switch form-check-input" type="checkbox" id="check-{p._id}" aria-checked disabled >
                        {/if}
                    </div>    
                </td>
                <td>{p.description}</td>
                <td>{p.price}</td>
                <td>{p.quantity}</td>
                <td>
                    <i class="tb-sel fas fa-edit fa-lg tb-sel text-success" on:click={() => goto(`/admin/warehouse/detail/${p._id}`)} />
                    <i class="tb-sel fa fa-trash fa-lg tb-sel text-danger" aria-hidden="true" data-bs-target="#deleteModal-{p._id}" data-bs-toggle="modal"/>
                    <Modal id="deleteModal-{p._id}" labeledby="modal-label-{p._id}" on:click={deleteProd(p._id)} title="Confirm delete" body="Are you sure that you want to delete product {p.code} ?"/>
                </td>
            </Tr>
        {/each}
    {/if}
</Table>


<Pagenavigation>
    {#each productsPage as pg}
        {#if currPage == pg+1}
            <li class="page-item page-link tb-sel active" on:click={() => changePage(pg+1)}>{pg+1}</li>
        {:else}
            <li class="page-item page-link tb-sel" on:click={() => changePage(pg+1)}>{pg+1}</li>
        {/if}
    {/each}
</Pagenavigation>