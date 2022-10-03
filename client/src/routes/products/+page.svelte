<script>
	import Product from "../../lib/component/Product.svelte";
	import cartStore from '../../lib/store/cartStore.js';
	import Searchbar from "../../lib/component/Searchbar.svelte";
	import Hint from "../../lib/component/Hint.svelte";

	export let data;
	let searchbar = "";
	let results = [];
	let isSearch = false;

	function addToCart (p) {
		var currentCart = [];

		cartStore.subscribe((cart) => {
			currentCart = cart.products;
		});

		let filteredCart = currentCart.filter(o => o._id === p._id)

		// product is already in our cart
		if(filteredCart.length > 0){			
			currentCart.forEach((element, idx, arr) => {
				if(element._id === filteredCart[0]._id){
					element.quantity += 1
				}
			})
		} else {
			currentCart.push({
				_id: p._id,
				name: p.name,
				code: p.code,
				quantity: 1,
				price: p.price,
				maxQuantity: p.quantity
			});
		}

		var elements_num = 0;

		for (let i = 0; i < currentCart.length; i++){
			elements_num += currentCart[i].quantity 
		}

		cartStore.set({products: currentCart, amount: 0.0, n_elem: elements_num})

	}


	// execute the function every time searchbar value change
	$: filterOverProducts(searchbar)

	function filterOverProducts(value){
		results = data.products.filter((prod, idx) => {
		// console.log("filter", prod, idx)
			return searchbar.split("").every(internalItem => {
				return prod.name.toLowerCase().indexOf(internalItem.toLowerCase()) !== -1
			})
		})
	}

	// $: console.log("res",results, results.length)

</script>


<div class="row">
	<Searchbar placeholder="Filter over available products" bind:value={searchbar} bind:isSearching={isSearch}/>
</div>

<div class="row">
	{#if isSearch}
		{#if results.length === 0}
			<Hint str="Sorry bro! Anything founded"/>
		{:else}
			{#each results as prod}
				<Product p={prod} addToCart={() => addToCart(prod)}/>
			{/each}
		{/if}
	{:else}
		{#each data.products as prod}
			<Product p={prod} addToCart={() => addToCart(prod)}/>
		{/each}
	{/if}

</div>

