<script>
    import Table from '../../../lib/component/Table.svelte';
    import Tr from '../../../lib/component/Tr.svelte';
    import { goto } from '$app/navigation';
    import Pagenavigation from '../../../lib/component/PageNavigation.svelte';
    import env from '../../../lib/store/env';
    import convertData from '../../../lib/js/formatDate';
    
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
				data.orders = data2;
			})
			.catch(err => console.log(err))

		currPage = selPage;

	}

</script>

<h1 class="mt-4">Orders list</h1>

<Table headers={['Data', 'Name' ,'Email', 'Amount', 'Status', 'Actions']}>
    {#if data.orders.orders.length == 0}
        <Tr>
            <td colspan="6" style="text-align:center;">No orders</td>
        </Tr>
    {:else}
        {#each data.orders.orders as o}
            <Tr>
                <td>{convertData(o.data)}</td>
                <td>{o.customer.name} {o.customer.surname}</td>
                <td>{o.customer.email}</td>
                <td>{o.amount} €</td>
                <td>
                    <div class="progress mt-2" style="height: 5px;">
                        {#if o.status == "PENDING"}
                            <div class="progress-bar bg-warning" role="progressbar" style="width: 50%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        {:else if o.status == "REJECTED"}
                            <div class="progress-bar bg-danger" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        {:else if o.status == "SHIPPED"}
                            <div class="progress-bar bg-info" role="progressbar" style="width: 75%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        {:else if o.status == "DELIVERED"}
                            <div class="progress-bar bg-success" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        {:else if o.status == "RETURNED"}
                            <div class="progress-bar bg-danger" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
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