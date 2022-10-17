<script>
  import CheckoutProduct from "../../lib/component/CheckoutProduct.svelte";
  import cartStore from "../../lib/store/cartStore";
  import { onMount } from 'svelte';
  import env from "../../lib/store/env";
  import utils from "../../lib/store/utils";
  import Input from "../../lib/component/Input.svelte";
  import Select from "../../lib/component/Select.svelte";
  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();
  import { goto } from '$app/navigation';

  export let data;
  const shipment = env.shipment[0];
  
	onMount(async () => {
    let nElem = 0;
    let amount = 0;
		cartStore.subscribe((cart) => {
			data.order.products = cart.products
      data.order.amount = cart.amount
		});

    data.order.products.forEach((element) => {
      // aggiorno l'amount totale dei prodotti, il prodotto con VAT è già calcolato nello store
      amount += element.price * element.quantity;
      nElem += element.quantity;
      // aggiorno il numero di elementi da visualizzare nel tooltip
    }) 
      
    amount = amount.toFixed(2)
    
    cartStore.set({products: data.order.products, amount: amount, n_elem: nElem})

	});
  
  let total = shipment.price + parseFloat(data.order.amount)
  const regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

  async function sendOrder() {
    try {
      
      if (data.order.customer.name == undefined || data.order.customer.surname == undefined || data.order.customer.email == undefined || data.order.customer.phone == undefined || data.order.address.address == undefined || data.order.address.city == undefined || data.order.address.zip == undefined){
        throw new Error('Fill all required fields!')
      }
      if (data.order.customer.name.length == 0 || data.order.customer.surname.length == 0 || data.order.address.address.length == 0 || data.order.address.city.length == 0){
        throw new Error('Fill all required fields!')
      }
      if (regexEmail.test(data.order.customer.email) == false){
        throw new Error('Email field is not valid!')
      }
      if (data.order.customer.phone.toString().length < 8){
        throw new Error('Please insert a valid phone number')
      }
      if (data.order.products.length === 0){
        throw new Error('What do you want to order with empty cart?')
      }

      var products = []

      await fetch(`${env.host}/products/enabled?page=0&limit=0`) // returns list of all products
      .then(res => {
        if (res.status == 400){
          throw new Error('No available products founded!')
        }
        return res.json();
      })
      .then(data => {
        products = data.products;
      })
      .catch(err => console.log(err))

      data.order.products.forEach((element) => {
        const indexOfObject = products.findIndex(object => {
          return object._id === element._id;
        });

        if (products[indexOfObject].quantity < element.quantity){
          throw new Error(`max available quantity of ${element.name} : ${products[indexOfObject].quantity}`)
        }

      })

      data.order.amount = parseFloat(data.order.amount)
      data.order.shipment = shipment

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
        addNotification({ text: 'Order submitted successfully! Check your email to find the info', type: 'success', position: 'bottom-right', removeAfter: 3000 })
        cartStore.set({products: [], amount: 0.0, n_elem: 0})
        data.order.customer = {}
        data.order.address = {}
      })
      .catch(err => addNotification({ text: err.message, type: 'error', position: 'bottom-right', removeAfter: 3000 }))

    } catch (e) {
      addNotification({ text: e.message, type: 'error', position: 'bottom-right', removeAfter: 3000 })
    }

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

          <!-- TODO: to enable in v2 -->
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

          {#if shipment != null}
              <li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-success">
                  <h6 class="my-0">{shipment.code}</h6>
                  <small>Spedizione</small>
                </div>
                <span class="text-success">{shipment.price} €</span>
              </li>
          {/if}

          <li class="list-group-item d-flex justify-content-between">
            <span>Total </span>
            <strong>{total} €</strong>
          </li>
        </ul>
      {/if}

      <!-- TODO: to enable in v2 -->
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
      <p class="text-muted">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis tincidunt ex. Curabitur efficitur tincidunt enim nec efficitur. Proin in commodo mauris. Quisque ultrices metus eros, commodo tempus dui posuere quis
      </p>
      <form on:submit|preventDefault={sendOrder} class="needs-validation">
        <div class="row g-3">
          <div class="col-sm-6">
            <Input id="name" label="Name" bind:value={data.order.customer.name} placeholder="Please insert your name"/>
          </div>

          <div class="col-sm-6">
            <Input id="surname" label="Surname" bind:value={data.order.customer.surname} placeholder="Please insert your surname"/>
          </div>

          <div class="col-6">
            <Input id="email" label="Email" bind:value={data.order.customer.email} placeholder="Please insert your email" type="email"/>
          </div>

          <div class="col-6">
            <Input id="phone" label="Phone" bind:value={data.order.customer.phone} placeholder="Please insert your phone number" type="number"/>
        </div>
          <div class="col-12">
            <Input id="address" label="Address" bind:value={data.order.address.address} placeholder="Please insert your shipping address"/>
          </div>

          <div class="col-12">
            <Input id="address2" bind:value={data.order.address.address2} placeholder="Apartment or suite"/>
          </div>

          <div class="col-12">
            <Input id="additional-notes" label="Notes" bind:value={data.order.notes} placeholder="Write additional notes for the expedition" type="textarea" />
          </div>

          <div class="col-md-6">
            <Select id="select-country" label="Country" arialabel="select country" bind:value={data.order.address.country} elements={utils.countries}/>
          </div>

          <div class="col-md-6">
            <Select id="select-country" label="State/Region" arialabel="select region" bind:value={data.order.address.region} elements={utils.regions}/>
          </div>

          <div class="col-8">
            <Input id="city" label="City" bind:value={data.order.address.city} placeholder="City" type="text" colClass="mb-4" />
        </div>
        <div class="col-4">
            <Input id="zip" label="ZIP" bind:value={data.order.address.zip} placeholder="ZIP code" type="number"  colClass="mb-4"/>
        </div>
          
        </div>

        <hr class="my-4">

        <!-- TODO: to enable in v2-->
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