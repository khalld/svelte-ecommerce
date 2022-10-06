<script>
    import Input from "../../../lib/component/Input.svelte";
    import cartStore from '../../../lib/store/cartStore.js';

    export let data;

	let focusImg = data.product.photos[0].src;

    function addToCart () {
		var currentCart = [];

		cartStore.subscribe((cart) => {
			currentCart = cart.products;
		});

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
				price: data.product.price
			});
		}

		var elements_num = 0;

		for (let i = 0; i < currentCart.length; i++){
			elements_num += currentCart[i].quantity 
		}

		cartStore.set({products: currentCart, amount: 0.0, n_elem: elements_num})

	}


</script>


<div class="container">
	<div class="row">
		<div class="col-sm-12 col-lg-6 col-md-6">
			<div class="pro-img-details">
				<img src={focusImg} alt="detail-0">
			</div>
			<div class="pro-img-list p-2">
			{#each data.product.photos as pic, idx}
				<!-- <a href="#"> -->
				<img src="{pic.src}" class="w-25 m-2 tb-sel" alt="detail-{idx}" on:click={() => focusImg = pic.src}>
				<!-- </a> -->
			{/each}
			</div>
		</div>
		<div class="col-sm-12 col-lg-6 col-md-6">
			<h3 class="pro-d-title">
				{data.product.name}
			</h3>
			<p>{data.product.longDescription}</p>
			<div class="product_meta">
				<span class="posted_in"> <strong>Categories:</strong> <a rel="tag" href="#">Jackets</a>, <a rel="tag" href="#">Men</a>, <a rel="tag" href="#">Shirts</a>, <a rel="tag" href="#">T-shirt</a>.</span>
				<span class="tagged_as"><strong>Tags:</strong> <a rel="tag" href="#">mens</a>, <a rel="tag" href="#">womens</a>.</span>
			</div>
			<div class="m-bot15"> <strong>Price : </strong> <span > {data.product.price} €</span></div>
			<div class="m-bot15"> <strong>Available quantity : </strong> 
				{#if data.product.quantity <= 0}
					<span> {data.product.price} €</span>
				{:else}
					<span>{data.product.price} €</span>
				{/if}
			</div>
			{#if data.product.quantity <= 0}
				<button class="btn btn-danger mt-2" disabled> <i class="fa fa-shopping-cart"></i> Add to cart</button>
			{:else}
				<button class="btn btn-danger mt-2" on:click={() => addToCart()}> <i class="fa fa-shopping-cart"></i>Add to cart</button>
			{/if}
		</div>
	</div>
</div>



<style>
	.pro-img-details {
		margin-left: -15px;
	}
	
	.pro-img-details img {
		width: 100%;
	}
	
	.pro-d-title {
		font-size: 16px;
		margin-top: 0;
	}
	
	.product_meta {
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		padding: 10px 0;
		margin: 15px 0;
	}
	
	.product_meta span {
		display: block;
		margin-bottom: 10px;
	}
	.product_meta a, .pro-price{
		color:#fc5959 ;
	}
	
	.pro-img-list {
		margin: 10px 0 0 -15px;
		width: 100%;
		display: inline-block;
	}
	
</style>
