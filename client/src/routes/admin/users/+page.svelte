<script>
    import Table from '../../../lib/component/Table.svelte';
    import Tr from '../../../lib/component/Tr.svelte';
    import Pagenavigation from '../../../lib/component/PageNavigation.svelte';
    import Modal from '../../../lib/component/Modal.svelte';
    import env from '../../../lib/store/env';
    import {goto} from '$app/navigation';

    export let data;
	let currPage = data.users.currentPage;
	let usersPage = [...Array(data.users.totalPages).keys() ]

    async function changePage(selPage){
		const limit = 10

		await fetch(`${env.host}/users?page=${selPage}&limit=${limit}`)
			.then(res => {
				if (res.status == 400){
					throw new Error('Something wrong happened')
				}
				return res.json();
			})
			.then(data2 => {
                console.log(data2)
				data.users = data2;
			})
			.catch(err => console.log(err))
        
		currPage = selPage;
	}

    async function disableUser(id){
        console.log("TODO:")
    }

</script>

<h1>Users list</h1>

<Table headers={['Name', 'Email', 'Enabled', 'Actions']}>
    {#if data.users.users.length == 0}
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    {:else}
        {#each data.users.users as u}
            <Tr>
                <td>{u.name} {u.surname}</td>
                <td>{u.email}</td>
                <td>
                    <div class="form-check form-switch">
                        {#if u.enabled == true}
                            <input class="form-switch form-check-input" type="checkbox" role="switch" id="check-{u._id}" aria-checked checked disabled>
                        {:else}
                            <input class="form-switch form-check-input" type="checkbox" role="switch" aria-checked id="check-{u._id}" disabled>
                        {/if}
                    </div>    
                </td>
                <td>
                    <i class="fas fa-pencil fa-lg tb-sel text-success" on:click={() => goto(`/admin/users/detail/${u._id}`)}/>
                    <i class="fa fa-trash fa-lg tb-sel text-danger" aria-hidden="true" data-bs-target="#deleteModal-{u._id}" data-bs-toggle="modal" />
                    <Modal id="deleteModal-{u._id}" labeledby="modal-label-{u._id}" on:click={disableUser(u._id)} title="Confirm delete" body="Are you sure that you want to delete product {u.email} ?"/>
                </td>
            </Tr>
        {/each}
    {/if}
</Table>


<Pagenavigation>

    {#each usersPage as pg}
        {#if currPage == pg+1}
            <li class="page-item page-link tb-sel active" on:click={() => changePage(pg+1)}>{pg+1}</li>
        {:else}
            <li class="page-item page-link tb-sel" on:click={() => changePage(pg+1)}>{pg+1}</li>
        {/if}
    {/each}
</Pagenavigation>