<script>
  import CheckoutProduct from "../../lib/component/CheckoutProduct.svelte";
  import cartStore from "../../lib/store/cartStore";
  import userStore from "../../lib/store/userStore";
  import { onMount } from 'svelte';
  import { notifier } from '@beyonk/svelte-notifications';
  import env from "../../lib/store/env";
  import utils from "../../lib/store/utils";
  import VertInput from "../../lib/component/VertInput.svelte";
  import Select from "../../lib/component/Select.svelte";

	var currCart = {};

  var oder = {
    cart: {},
    amount: 0.0,
    promos: [], // TODO: devi aggiornarlo dopo la fetch al submit del PROMOCODE
    customer: {}
  }


  // $: order.amount = currCart.amount

  // TODO: fai una variabile order: con tutte le informazioni come dovrebbero essere per il DB!
  // in questo modo quando hai la post hai tutto costruito direttamente!!!
  // se l'utente non è registrato customerId sarà nullo!

	onMount(async () => {
		cartStore.subscribe((cart) => {
			currCart.products = cart.products
      currCart.amount = cart.amount
		});

    userStore.subscribe((user) => {
      // userDet._id = user.user._id
      // userDet.email = user.user.email
    })
    
    currCart.products.forEach(element => {
      delete element.photo_cart
    });
	});

  $: console.info("currCart:", currCart)

  var customer = {
    address: {}
  };

  const promoCodes = [{
    code: "WELCOME10",
    amount: 0.20,
    startAt: null,
    startAt: null
  }]

  async function order() {
    // devi faer un altro subscribe ???? verifica!!!
    const order = {
      userId: userDet._id,
      email: userDet.email,
      products: currCart.products,
      amount: currCart.amount,
      status: "PENDING",
      tracking: {},
      provider: null,
      notes: null,
      data: +Date.now(),
      address: ""
    }

    // console.log(order);

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

<div class="container">
  <div class="row g-5">
    <div class="col-md-5 col-lg-4 order-md-last">
      <h4 class="d-flex justify-content-between align-items-center mb-3">
        <span class="text-primary">Your cart</span>
        <span class="badge bg-primary rounded-pill">{$cartStore.n_elem}</span>
      </h4>
      
      {#if $cartStore.products.length == 0}
        <div class="alert alert-danger text-center" role="alert">Empty cart!</div>
      {:else}
        <ul class="list-group mb-3">
          
          {#each $cartStore.products as elem}
            <CheckoutProduct product={elem} /> 
          {/each}

          {#if promoCodes.length > 0}
            {#each promoCodes as promo, idx}
              <li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-success">
                  <h6 class="my-0">Promo code: {idx + 1}</h6>
                  <small>{promo.code}</small>
                </div>
                <span class="text-success">{promo.amount * 100} %</span>
              </li>
            {/each}
          {/if}


          <li class="list-group-item d-flex justify-content-between">
            <span>Total </span>
            <strong>{currCart.amount} €</strong>
          </li>
        </ul>
      {/if}

      <form class="card p-2">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Promo code" readonly>
          <button type="submit" class="btn btn-secondary" disabled>Redeem</button>
        </div>
      </form>
    </div>
    <div class="col-md-7 col-lg-8">
      <h4 class="mb-3">Please insert your information for checkout</h4>
      <form class="needs-validation" novalidate>
        <div class="row g-3">
          <div class="col-sm-6">
            <VertInput id="name" label="Name" value={customer.name} placeholder="Please insert your name"/>
          </div>

          <div class="col-sm-6">
            <VertInput id="surname" label="Surname" value={customer.surname} placeholder="Please insert your surname"/>
          </div>

          <div class="col-12">
            <VertInput id="email" label="Email" value={customer.email} placeholder="Please insert your email" type="email"/>
          </div>

          <div class="col-12">
            <VertInput id="address" label="Address" value={customer.address.address} placeholder="Please insert your shipping address"/>
          </div>

          <div class="col-12">
            <VertInput id="address2" value={customer.address.address2} placeholder="Apartment or suite"/>
          </div>

          <div class="col-md-4">
            <Select id="select-country" label="Country" arialabel="select country" value={customer.address.country} elements={utils.countries}/>
          </div>

          <div class="col-md-4">
            <Select id="select-country" label="State/Region" arialabel="select region" value={customer.address.region} elements={utils.regions}/>
          </div>

          <div class="col-md-4">
            <VertInput id="zip" label="ZIP" value={customer.zip} placeholder="ZIP code" type="number"/>
          </div>

        </div>

        <hr class="my-4">

        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="same-address">
          <label class="form-check-label" for="same-address">Shipping address is the same as my billing address</label>
        </div>
        <button class="w-100 btn btn-primary btn-lg mt-2" type="submit">Continue to checkout</button>
      </form>
    </div>
  </div>
</div>
<!-- 
{#if $cartStore.products.length == 0}
	<div class="alert alert-danger text-center" role="alert">Empty cart!</div>
{:else}
  <div class="container-fluid">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-10">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-normal mb-0 text-black">Shopping Cart</h3>
          <p class="mb-0">You have {$cartStore.products.length} items in your cart</p>
        </div>        
          
        {#each $cartStore.products as elem}
          <CheckoutProduct product={elem} /> 
        {/each}

        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-warning btn-block btn-lg" on:click={order}>Proceed to Pay</button>
        </div>

      </div>
    </div>
  </div>
{/if} -->