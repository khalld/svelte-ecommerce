<script>
    import Input from "../../../../../lib/component/Input.svelte";  
    import Select from "../../../../../lib/component/Select.svelte";
    import utils from "../../../../../lib/store/utils";
    import Pagenavigation from "../../../../../lib/component/PageNavigation.svelte";  
    import Hint from "../../../../../lib/component/Hint.svelte";
    import OrderList from "../../../../../lib/component/OrderList.svelte";
    import OrderElement from "../../../../../lib/component/OrderElement.svelte";
    import InfoPanelAdmin from "../../../../../lib/component/InfoPanelAdmin.svelte";
    import InfoPanelHeader from "../../../../../lib/component/InfoPanelHeader.svelte";
    import env from "../../../../../lib/store/env";

    export let data;

    let currPage = data.orders.currentPage;
	let ordersPage = [...Array(data.orders.totalPages).keys() ]

    async function changePage(selPage){
		const limit = 10

		await fetch(`${env.host}/orders/user/${data.user._id}?page=${selPage}&limit=${limit}`)
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

<InfoPanelAdmin showButton=false>
    <InfoPanelHeader text="Detail of user" />
    <div class="row g-3 mb-4">
        <div class="col-sm-6">
            <Input id="name" label="Name" bind:value={data.user.name} placeholder="Please insert your name" readonly/>
        </div>
        <div class="col-sm-6">
            <Input id="surname" label="Surname" bind:value={data.user.surname} placeholder="Please insert your surname" readonly/>
        </div>
        <div class="col-6">
            <Input id="email" label="Email" bind:value={data.user.email} placeholder="Please insert your email" type="email" readonly/>
        </div>
        <div class="col-6">
            <Input id="phone" label="Phone" bind:value={data.user.phone} placeholder="Please insert your phone number" type="number " readonly/>
        </div>
        <div class="col-12">
            <Input id="address" label="Address" bind:value={data.user.address.address} placeholder="Please insert your shipping address" readonly/>
        </div>
        <div class="col-12">
            <Input id="address2" bind:value={data.user.address.address2} placeholder="Apartment or suite" readonly/>
        </div>
        <div class="col-6">
            <Select id="select-country" label="Country" arialabel="select country" bind:value={data.user.address.country} elements={utils.countries} disabled/>
        </div>
        <div class="col-6">
            <Select id="select-country" label="Region" arialabel="select region" bind:value={data.user.address.region} elements={utils.regions} disabled/>
        </div>
        <div class="col-6">
            <Input id="city" label="City" bind:value={data.user.address.city} placeholder="City" type="text" readonly/>
        </div>
        <div class="col-6">
            <Input id="zip" label="ZIP" bind:value={data.user.address.zip} placeholder="ZIP code" type="number" readonly/>
        </div>
        
    </div>

    <InfoPanelHeader text="Orders" />

    {#if data.orders.orders.length === 0}
        <Hint str="No order yet"/>
    {:else}
        <OrderList>
            {#each data.orders.orders as o}
                <OrderElement order={o} />
            {/each}
        </OrderList>
    {/if}

    <Pagenavigation addClass="mt-2">
        {#each ordersPage as pg}
            {#if currPage == pg+1}
                <li class="page-item page-link tb-sel active" on:click={() => changePage(pg+1)}>{pg+1}</li>
            {:else}
                <li class="page-item page-link tb-sel" on:click={() => changePage(pg+1)}>{pg+1}</li>
            {/if}
        {/each}
    </Pagenavigation>

</InfoPanelAdmin>