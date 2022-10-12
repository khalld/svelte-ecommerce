<script>
    import Table from '../../../lib/component/Table.svelte';
    import Tr from '../../../lib/component/Tr.svelte';
    import Pagenavigation from '../../../lib/component/PageNavigation.svelte';
    import Modal from '../../../lib/component/Modal.svelte';
    import env from '../../../lib/store/env';
    import {goto} from '$app/navigation';
    import { getNotificationsContext } from 'svelte-notifications';
    const { addNotification } = getNotificationsContext();
    
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
				data.users = data2;
			})
			.catch(err => console.log(err))
        
		currPage = selPage;
	}

    async function disableUser(id, enabled){
        await fetch(`${env.host}/users/disable`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                enabled: !enabled
            })
        }).then(res => {
            if (res.status === 400){
                throw new Error('Something wrong happened')
            }
            if (res.status === 404){
                throw new Error('User not exist')
            }
        })
        .then(() => {
            const indexOfObject = data.users.users.findIndex(object => {
                return object._id === id;
            });
            data.users.users[indexOfObject].enabled = !enabled

            addNotification({ text: 'User disabled', type: 'success', position: 'bottom-right' })
        })
        .catch(err => addNotification({ text: e.message, type: 'error', position: 'bottom-right' }))
    }

</script>

<h1 class="mt-4">Users list</h1>

<Table headers={['Name', 'Email', 'Enabled', 'Actions']}>
    {#if data.users.users.length == 0}
        <Tr>
            <td colspan="4" style="text-align:center;">No orders</td>
        </Tr>
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
                    <i class="fa fa-exclamation fa-lg tb-sel {u.enabled == true ? "text-danger": "text-warning"}" aria-hidden="true" data-bs-target="#deleteModal-{u._id}" data-bs-toggle="modal" />
                    <Modal id="deleteModal-{u._id}" labeledby="modal-label-{u._id}" on:click={disableUser(u._id, u.enabled)} title="{u.enabled == true ? "Disable user" : "Enable user"} " body="Are you sure that you want to {u.enabled == true ? "disable" : "enable"} user {u.email} ?"/>
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