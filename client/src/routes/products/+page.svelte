<script>
	import Product from "../../lib/component/Product.svelte";
	import cartStore from '../../lib/store/cartStore.js';

	export let data;

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

</script>

<div class="row">
	{#each data.products as prod}
		<Product p={prod} addToCart={() => addToCart(prod)}/>
	{/each}
	
</div>

