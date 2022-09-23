<script>
	export let p;
	export let addToCart;
	import { goto } from '$app/navigation';

</script>

<div class="card h-100">
	<img
		src={p.image}
		class="card-img-top "
		alt={p.name}
		style="max-width: 100%; height: auto; width: 150px;"
	/>
	<div class="card-body">
		<h5 class="card-title">{p.title}</h5>
		<p class="card-text">
			{p.description}
		</p>
		<button class="btn btn-success" on:click={() => goto(`/product/${p.id}`)}>Detail</button>
		<button class="btn btn-success" on:click={() => addToCart(p.id)} >Add to cart</button>

	
	</div>
</div>
