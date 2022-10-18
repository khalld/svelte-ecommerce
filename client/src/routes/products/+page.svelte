<script>
	import Product from "../../lib/component/Product.svelte";
	import Searchbar from "../../lib/component/Searchbar.svelte";
	import Hint from "../../lib/component/Hint.svelte";
	import env from "../../lib/store/env.js";
	import Pagenavigation from "../../lib/component/PageNavigation.svelte";

	export let data;
	let searchbar = "";
	let results = [];
	let isSearch = false;

	console.log(data)

	let currPage = data.products.currentPage;
	let productsPage = [...Array(data.products.totalPages).keys() ]

	async function changePage(selPage){
		const limit = 10

		await fetch(`${env.host}/products/enabled?page=${selPage}&limit=${limit}`)
			.then(res => {
				if (res.status == 400){
					throw new Error('Something wrong happened')
				}
				return res.json();
			})
			.then(data2 => {
				data.products = data2;
			})
			.catch(err => console.log(err))

		currPage = selPage;

	}

	// execute the function every time searchbar value change
	$: filterOverProducts(searchbar)

	var firstImg = null;
	var blob = null;

	async function filterOverProducts(value){
		if (data.all != undefined) {
			results = data.all.filter((prod, idx) => {
				return searchbar.split("").every(internalItem => {
					return prod.name.toLowerCase().indexOf(internalItem.toLowerCase()) !== -1
				})
			})
		}
		
		// FIXME: maybe is not a best practice fetch images here?
		// this if allow to make one call when typing in the searchbar
		if (firstImg == null && blob == null) {
			for (let i = 0; i < results.length; i++){
				firstImg = null;
				blob = null;
				
				await fetch(`${env.host}/images/list/${results[i]._id}`)
				.then(res => {
					if (res.status == 500){
						throw new Error('Something wrong happened')
					}
					return res.json();
				})
				.then(data => {
					firstImg = data.images[0];
				})
				.catch(err => console.log(err))
			
				await fetch(`${env.host}/images/info`, {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify({
						prodId: results[i]._id,
						name: firstImg
					})
				})
				.then(res => res.blob())
				.then(imageBlob => {
					// Then create a local URL for that image and print it 
					// const imageObjectURL = URL.createObjectURL(imageBlob);
					blob = URL.createObjectURL(imageBlob);
				})
				.catch(err => console.log(err))

				results[i].mainPic = blob
			}

		}
	}

</script>

<div class="container">
	<div class="row">
		<!-- TODO: all this line commented needs to be all uncommented them all at once
			and are going to be enabled in v2 -->
		<!-- <div class="col-sm-4 col-md-3"> -->
			<Searchbar placeholder="Filter over available products" bind:value={searchbar} bind:isSearching={isSearch}/>
			
			<!-- <h3>Price</h3>
			
			<div class="form-check">
				<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
				<label class="form-check-label" for="exampleRadios1">
					Default radio
				</label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
				<label class="form-check-label" for="exampleRadios2">
					Second default radio
				</label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" disabled>
				<label class="form-check-label" for="exampleRadios3">
					Disabled radio
				</label>
			</div>

			<h3>Other filters</h3>

			<div class="form-check">
				<input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
				<label class="form-check-label" for="defaultCheck1">
					Default checkbox
				</label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="checkbox" value="" id="defaultCheck2" disabled>
				<label class="form-check-label" for="defaultCheck2">
				Disabled checkbox
				</label>
			</div>
		</div> -->

		<!-- <div class="col-sm-8 col-md-9"> -->

			<!-- <ul class="shop__sorting">
				<li class="active"><a href="#">Popular</a></li>
				<li><a href="#">Newest</a></li>
				<li><a href="#">Bestselling</a></li>
				<li><a href="#">Price (low)</a></li>
				<li><a href="#">Price (high)</a></li>
			</ul> -->

			<!-- {#if imgAreloaded == true} -->
				<div class="row">
					{#if isSearch}
						{#if results.length === 0}
							<Hint str="Sorry bro! Anything founded"/>
						{:else}
							{#each results as prod}
								<Product p={prod}/>
							{/each}
						{/if}
					{:else}
						{#each data.products.products as prod}
							<Product p={prod}/>
						{/each}
					{/if}
					
				</div>
			<!-- {/if} -->

			<div class="mt-5 p-2">
				
				{#if !isSearch && data.products.products.length > 0}
				<div class="row">
					<div class="col-sm-12">
						<Pagenavigation>
							{#each productsPage as pg}
								{#if currPage == pg+1}
									<li class="page-item page-link tb-sel active" on:click={() => changePage(pg+1)}>{pg+1}</li>
								{:else}
									<li class="page-item page-link tb-sel" on:click={() => changePage(pg+1)}>{pg+1}</li>
								{/if}
							{/each}
						</Pagenavigation>
					</div>
				</div>
				{/if}
			</div>

		<!-- </div> -->
	</div> 
</div>

<!-- TODO: uncomment in v2 -->
<!-- <style>
	
	.shop__sorting {
	list-style: none;
	padding-left: 0;
	margin-bottom: 40px;
	margin-top: -20px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	text-align: right;
	}
	.shop__sorting > li {
	display: inline-block;
	}
	.shop__sorting > li > a {
	display: block;
	padding: 20px 10px;
	margin-bottom: -1px;
	border-bottom: 2px solid transparent;
	color: #757575;
	-webkit-transition: all .05s linear;
		-o-transition: all .05s linear;
			transition: all .05s linear;
	}
	.shop__sorting > li > a:hover,
	.shop__sorting > li > a:focus {
	color: #333333;
	text-decoration: none;
	}
	.shop__sorting > li.active > a {
	color: #ed3e49;
	border-bottom-color: #ed3e49;
	}
	@media (max-width: 767px) {
		.shop__sorting {
			text-align: left;
			border-bottom: 0;
		}
		.shop__sorting > li {
			display: block;
		}
		.shop__sorting > li > a {
			padding: 10px 15px;
			margin-bottom: 10px;
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		}
		.shop__sorting > li.active > a {
			font-weight: 600;
		}
	}
</style> -->