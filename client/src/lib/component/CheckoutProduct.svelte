<script>
  import cartStore from "../store/cartStore";
  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();
  import { goto } from '$app/navigation';
  import env from "../../lib/store/env";

  export let product;
  let maxQuantity = 10; // to avoid problem

  async function loadMaxQuantity(){
    await fetch(`${env.host}/products/enabled/${product._id}`) // returns list of all products
      .then(res => {
        if (res.status == 400){
          throw new Error('No available products founded!')
        }
        return res.json();
      })
      .then(data => {
        maxQuantity = data.quantity
      })
      .catch(err => console.error(err))
  }

  function deletefromCart(){
    var currentCart = [];
    var amount = 0.0
    let elements_num = 0;

    cartStore.subscribe((cart) => {
      currentCart = cart.products;
      currentCart = currentCart.filter(o => o._id !== product._id)
    });
    
    currentCart.forEach((element) => {
      // aggiorno l'amount totale dei prodotti
      amount += (element.price * element.quantity)
      // aggiorno il numero di elementi da visualizzare nel tooltip
      elements_num += element.quantity 
    })

    cartStore.set({products: currentCart, amount: amount, n_elem: elements_num})
  }

  async function addElement(id){

    await loadMaxQuantity()

    var currentCart = [];
    var amount = 0.0;
    let elements_num = 0;

    cartStore.subscribe((cart) => {
      currentCart = cart.products;
    });

    try {

      // filtro l'array di oggetti ed aumento di 1 la quantità del prodotto selezionato
      currentCart.forEach(element => {
        if (element._id === id){

          if (element.quantity >= maxQuantity){
            throw Error(`No more quantity available for ${element.name} (max: ${maxQuantity})`)
          }

          element.quantity = element.quantity + 1;
        }
      });

      currentCart.forEach((element) => {
        // aggiorno l'amount totale dei prodotti
        amount = amount + (element.price * element.quantity)
        // aggiorno il numero di elementi da visualizzare nel tooltip
        elements_num += element.quantity 
      })

      amount = amount.toFixed(2)

      cartStore.set({products: currentCart, amount: amount, n_elem: elements_num})
    } catch (e){
      addNotification({ text: e.message, type: 'error', position: 'bottom-right', removeAfter: 6000 })

    }

  }

  function removeElement(id){

    var currentCart = [];
    var amount = 0.0;

    cartStore.subscribe((cart) => {
      currentCart = cart.products;
    });

    if (product.quantity > 1){
      // filtro l'array di oggetti ed aumento di 1 la quantità del prodotto selezionato
      currentCart.forEach(element => {
        if (element._id === id){
          element.quantity = element.quantity - 1;
        }
      });
    } else {
      addNotification({ text: 'Minimum quantity requested', type: 'warning', position: 'bottom-right', removeAfter: 6000 })

    }

    let elements_num = 0;
  
    currentCart.forEach((element) => {
      // aggiorno l'amount totale dei prodotti
      amount += (element.price * element.quantity)
      // aggiorno il numero di elementi da visualizzare nel tooltip
      elements_num += element.quantity 
    })

    cartStore.set({products: currentCart, amount: amount, n_elem: elements_num})
  }


</script>


<li class="list-group-item d-flex justify-content-between lh-sm">
  <div>
    <h6 class="my-0 tb-sel" on:click={() => goto(`/products/${product._id}`)}>{product.name}</h6>
    <small class="text-muted">Quantity</small>
    <!-- <small class="text-muted p-2">Quantity</small> -->

    <div class="d-flex flex-row">
      <div class="p-2">
        <i class="fa-solid fa-minus fa-xl tb-sel" on:click={() => removeElement(product._id)}></i>
      </div>
      <div class="p-2">
        <span>{product.quantity}</span>
      </div>
      <div class="p-2">
        <i class="fa-solid fa-plus fa-xl tb-sel" on:click={() => addElement(product._id)}></i>
      </div>
    </div>
  </div>
  <span class="text-muted">{product.price * product.quantity} € <i class="fas fa-trash-alt tb-sel" on:click={deletefromCart}/></span>  
</li>