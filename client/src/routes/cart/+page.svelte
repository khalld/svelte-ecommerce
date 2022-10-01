<script>
  import CheckoutProduct from "../../lib/component/CheckoutProduct.svelte";
  import cartStore from "../../lib/store/cartStore";
  import { onMount } from 'svelte';
  import { notifier } from '@beyonk/svelte-notifications';
  import env from "../../lib/store/env";
  import utils from "../../lib/store/utils";
  import VertInput from "../../lib/component/VertInput.svelte";
  import Select from "../../lib/component/Select.svelte";
  
  export let data;
  
  // TODO: sostiuisci con fetch ?
  // const promoCodes = [{
  //   code: "WELCOME10",
  //   amount: 0.20,
  //   startAt: null,
  //   startAt: null
  // }]

  $: console.log("data", data)

  // TODO: se l'utente non è registrato customerId sarà nullo!

	onMount(async () => {
    let nElem = 0;
    let amount = 0;
		cartStore.subscribe((cart) => {
			data.order.products = cart.products
      data.order.amount = cart.amount
		});

    data.order.products.forEach((element) => {
      // aggiorno l'amount totale dei prodotti
      amount += (element.price * element.quantity)
      nElem += element.quantity
      // aggiorno il numero di elementi da visualizzare nel tooltip
    })

    cartStore.set({products: data.order.products, amount: amount, n_elem: nElem})


	});

  async function sendOrder() {
    await fetch(`${env.host}/orders`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data.order)
    }).then(res => {
      if (res.status == 400){
        throw new Error('Something wrong happened')
      }
      return res.json();
    })
    .then(() => {
      notifier.success('processato correttamente!')
      cartStore.set({products: [], amount: 0.0, n_elem: 0})
      // TODO: Pulisci il form o rimanda ad un altra pagina
    })
    .catch(err => notifier.danger(err.message))
  }
</script>

<div class="container">
  <div class="row g-5">
    
    <!-- List of products area -->
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

          <!-- {#if promoCodes.length > 0}
            {#each promoCodes as promo, idx}
              <li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-success">
                  <h6 class="my-0">Promo code: {idx + 1}</h6>
                  <small>{promo.code}</small>
                </div>
                <span class="text-success">{promo.amount * 100} %</span>
              </li>
            {/each}
          {/if} -->


          <li class="list-group-item d-flex justify-content-between">
            <span>Total </span>
            <strong>{data.order.amount} €</strong>
          </li>
        </ul>
      {/if}

      <!-- <form class="card p-2">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Promo code" readonly>
          <button type="submit" class="btn btn-secondary" disabled>Redeem</button>
        </div>
      </form> -->
    </div>
    <!-- END list of products area -->


    <div class="col-md-7 col-lg-8">
      <h4 class="mb-3">Please insert your information for checkout</h4>
      <form on:submit|preventDefault={sendOrder} class="needs-validation" novalidate> <!-- TODO: che signfica ?? -->
        <div class="row g-3">
          <div class="col-sm-6">
            <VertInput id="name" label="Name" bind:value={data.order.customer.name} placeholder="Please insert your name"/>
          </div>

          <div class="col-sm-6">
            <VertInput id="surname" label="Surname" bind:value={data.order.customer.surname} placeholder="Please insert your surname"/>
          </div>

          <div class="col-12">
            <VertInput id="email" label="Email" bind:value={data.order.customer.email} placeholder="Please insert your email" type="email"/>
          </div>

          <div class="col-12">
            <VertInput id="address" label="Address" bind:value={data.order.address.address} placeholder="Please insert your shipping address"/>
          </div>

          <div class="col-12">
            <VertInput id="address2" bind:value={data.order.address.address2} placeholder="Apartment or suite"/>
          </div>

          <div class="col-12">
            <VertInput id="additional-notes" label="Notes" bind:value={data.order.notes} placeholder="Write additional notes for the expedition" type="textarea" />
          </div>

          <div class="col-md-4">
            <Select id="select-country" label="Country" arialabel="select country" bind:value={data.order.address.country} elements={utils.countries}/>
          </div>

          <div class="col-md-4">
            <Select id="select-country" label="State/Region" arialabel="select region" bind:value={data.order.address.region} elements={utils.regions}/>
          </div>

          <div class="col-md-4">
            <VertInput id="zip" label="ZIP" bind:value={data.order.address.zip} placeholder="ZIP code" type="number"/>
          </div>
          
        </div>

        <hr class="my-4">

        <!-- <div class="form-check">
          <input type="checkbox" class="form-check-input" id="same-address">
          <label class="form-check-label" for="same-address">Shipping address is the same as my billing address</label>
        </div> -->
        <button class="w-100 btn btn-primary btn-lg mt-2" type="submit">Continue to checkout</button>
        <!-- <button class="w-100 btn btn-primary btn-lg mt-2" on:click={() => sendOrder()}>Continue to checkout</button> -->

      </form>
    </div>
  </div>
</div>