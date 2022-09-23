<script>
	export let product;
	export let addToCart;

</script>

<div class="card">
	<div class="row g-0">
		<div class="col-md-4">
			<img src={product.image} class="img-fluid rounded-start" alt={product.name} />
		</div>
		<div class="col-md-8">
			<div class="card-body">
				<h5 class="card-title">{product.title}</h5>
				<p class="card-text">{product.description}</p>
				<p class="card-text"><small class="text-muted">{product.price} €</small></p>
				<button class="btn btn-primary" on:click={() => addToCart}
					>Add in cart
				</button>
			</div>
		</div>
	</div>
</div>
