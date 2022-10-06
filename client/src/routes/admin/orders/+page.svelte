<script>
    import Table from '../../../lib/component/Table.svelte';
    import Tr from '../../../lib/component/Tr.svelte';
    import { goto } from '$app/navigation';
    import Pagenavigation from '../../../lib/component/PageNavigation.svelte';
    import env from '../../../lib/store/env';
    export let data;

	let currPage = data.orders.currentPage;
	let ordersPage = [...Array(data.orders.totalPages).keys() ]

    async function changePage(selPage){
		const limit = 10

		await fetch(`${env.host}/orders?page=${selPage}&limit=${limit}`)
			.then(res => {
				if (res.status == 400){
					throw new Error('Something wrong happened')
				}
				return res.json();
			})
			.then(data2 => {
                console.log(data2)
				data.orders = data2;
			})
			.catch(err => console.log(err))

		currPage = selPage;

	}

    function convertDate(dt){

        // TODO: CONVERTI
        return dt
    }

</script>

<h1>Orders list</h1>

<Table headers={['Data', 'Name' ,'Email', 'Amount', 'Status', '#']}>
    {#if data.orders.orders.length == 0}
        <div class="spinner-border mt-2">
            <span class="visually-hidden">Loading...</span>
        </div>
    {:else}
        {#each data.orders.orders as o}
            <Tr>
                <td>{convertDate(o.data)}</td>
                <td>{o.customer.name} {o.customer.surname}</td>
                <td>{o.customer.email}</td>
                <td>{o.amount} €</td>
                <td>
                    <div class="progress mt-2" style="height: 5px;">
                        {#if o.status == "PENDING"}
                            <div class="progress-bar bg-warning" role="progressbar" style="width: 50%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        {:else if o.status == "REJECTED"}
                            <div class="progress-bar bg-danger" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        {:else}
                            <div class="progress-bar bg-success" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        {/if}
                    </div>

                </td>
                <td>
                    <i class="fas fa-pencil fa-lg tb-sel text-success" on:click={() => goto(`/admin/orders/detail/${o._id}`)}/>
                </td>
            </Tr>
        {/each}
    {/if}
</Table>


<Pagenavigation>

    {#each ordersPage as pg}
        {#if currPage == pg+1}
            <li class="page-item page-link tb-sel active" on:click={() => changePage(pg+1)}>{pg+1}</li>
        {:else}
            <li class="page-item page-link tb-sel" on:click={() => changePage(pg+1)}>{pg+1}</li>
        {/if}
    {/each}
</Pagenavigation>