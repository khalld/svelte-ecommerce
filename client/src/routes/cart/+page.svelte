<script>
  import CheckoutProduct from "../../lib/component/CheckoutProduct.svelte";
  import cartStore from "../../lib/store/cartStore";
  import userStore from "../../lib/store/userStore";
  import { onMount } from 'svelte';
  import { notifier } from '@beyonk/svelte-notifications';
  import env from "../../lib/store/env";

  export let obj;

	var currCart = {};
  var userDet = {};

	const shipping = 5.00;

	onMount(async () => {
		cartStore.subscribe((cart) => {
			currCart.products = cart.products
      currCart.amount = cart.amount
		});

    userStore.subscribe((user) => {
      console.log(user)

      userDet._id = user.user._id
      userDet.email = user.user.email
    })
    
    currCart.products.forEach(element => {
      delete element.photo_cart
    });
	});

  async function order() {
    const order = {
      userId: userDet._id,
      email: userDet.email,
      products: currCart.products,
      amount: currCart.amount,
      status: "PENDING",
      address: ""
    }

    console.log(order);

    await fetch(`${env.host}/orders`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(order)
    }).then(res => {
      if (res.status == 400){
        throw new Error('Something wrong happened')
      }
      return res.json();
    })
    .then(() => {
      notifier.success('processato correttamente!')
      cartStore.set({products: [], amount: 0.0, n_elem: 0})

    })
    .catch(err => notifier.danger(err.message))
  }
</script>

{#if $cartStore.products.length == 0}
	<div class="alert alert-danger text-center" role="alert">Empty cart!</div>
{:else}
<section class="h-100" style="background-color: #eee;">
    <div class="container h-100 py-5">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-10">
  
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-normal mb-0 text-black">Shopping Cart</h3>
            <p class="mb-0">You have {$cartStore.products.length} items in your cart</p>

            <!-- <div>
              <p class="mb-0"><span class="text-muted">Sort by:</span> <a href="#!" class="text-body">price <i
                    class="fas fa-angle-down mt-1"></i></a></p>
            </div> -->
          </div>
          
            {#each $cartStore.products as elem}
                <CheckoutProduct product={elem} /> 
            {/each}
          <div class="card mb-4">
            <div class="card-body p-4 d-flex flex-row">
              <div class="form-outline flex-fill">
                <input type="text" id="form1" class="form-control form-control-lg" />
                <label class="form-label" for="form1">Discound code</label>
              </div>
              <button type="button" class="btn btn-outline-warning btn-lg ms-3">Apply</button>
            </div>
          </div>
  
          <div class="card">
            <div class="card-body">
              <button type="button" class="btn btn-warning btn-block btn-lg" on:click={order}>Proceed to Pay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
{/if}