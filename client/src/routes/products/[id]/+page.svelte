<script>

    import Carousel from "../../../lib/component/Carousel.svelte";
    import InfoPanel from "../../../lib/component/InfoPanel.svelte";
    import Input from "../../../lib/component/Input.svelte";
    import cartStore from '../../../lib/store/cartStore.js';
	import calculateVat from "../../../lib/js/utils";
    export let data;

    let totPrice = 0.0;
    $: totPrice = calculateVat(data.product.price, data.product.vat)

    function addToCart () {
		var currentCart = [];

		cartStore.subscribe((cart) => {
			currentCart = cart.products;
		});

        console.log(data.product)

		let filteredCart = currentCart.filter(o => o._id === data.product._id)

		// product is already in our cart
		if(filteredCart.length > 0){			
			currentCart.forEach((element, idx, arr) => {
				if(element._id === filteredCart[0]._id){
					element.quantity += 1
				}
			})
		} else {
			currentCart.push({
				_id: data.product._id,
				name: data.product.name,
				code: data.product.code,
				quantity: 1,
				price: data.product.price,
				maxQuantity: data.product.quantity
			});
		}

		var elements_num = 0;

		for (let i = 0; i < currentCart.length; i++){
			elements_num += currentCart[i].quantity 
		}

		cartStore.set({products: currentCart, amount: 0.0, n_elem: elements_num})

	}


</script>

<InfoPanel >
    <Carousel id="carousel-product" pics={data.product.photos}/>

    <div class="mb-3 mt-2 row">
        <div class="col-3">
            <Input id="quantity" label="Available quantity" bind:value={data.product.quantity} type="number" readonly/>
        </div>
        <div class="col-3">
            <Input id="totalprice" label="Total" bind:value={totPrice} type="number" readonly />
        </div>
    </div>
    <button class="btn btn-primary mt-2" on:click={() => addToCart()}>Add to cart</button>

</InfoPanel>