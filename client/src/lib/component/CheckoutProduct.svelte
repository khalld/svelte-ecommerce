<script>
  import cartStore from "../store/cartStore";
  import { notifier } from '@beyonk/svelte-notifications';
  import { element } from "svelte/internal";

  export let product;

  function deletefromCart(){
    var currentCart = [];
    var amount = 0.0
    cartStore.subscribe((cart) => {
      currentCart = cart.products;
      currentCart = currentCart.filter(o => o._id !== product._id)
    });
    currentCart.map((price) => {
      amount += price.price;
    })
    let elements_num = 0;
    for (let i = 0; i < currentCart.length; i++){
      elements_num += currentCart[i].quantity 
    }
    cartStore.set({products: currentCart, amount: amount, n_elem: elements_num})
  }

  function addElement(id){
    var currentCart = [];
    var amount = 0.0;

    cartStore.subscribe((cart) => {
      currentCart = cart.products;
    });

    if (product.maxQuantity >= product.quantity+1) {
      // filtro l'array di oggetti ed aumento di 1 la quantità del prodotto selezionato
      currentCart.forEach(element => {
        if (element._id === id){
          element.quantity = element.quantity + 1;
        }
      });
    } else {
      notifier.warning('E che sei pazzo?? su chiò assai di cheddi ca avimu!!')
    }
    
    // aggiorno l'amount totale dei prodotti
    currentCart.map((price) => {
      amount += price.price;
    })

    // aggiorno il numero di elementi da visualizzare nel tooltip
    let elements_num = 0;
    for (let i = 0; i < currentCart.length; i++){
      elements_num += currentCart[i].quantity 
    }

    cartStore.set({products: currentCart, amount: amount, n_elem: elements_num})
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
      notifier.warning('Minimum requested quantity')
    }


    // aggiorno l'amount totale dei prodotti
    currentCart.map((price) => {
      amount += price.price;
    })

    // aggiorno il numero di elementi da visualizzare nel tooltip
    let elements_num = 0;
    for (let i = 0; i < currentCart.length; i++){
      elements_num += currentCart[i].quantity 
    }
    
    cartStore.set({products: currentCart, amount: amount, n_elem: elements_num})
  }

  // TODO: Aggiungi handlers per + e - !


</script>


<li class="list-group-item d-flex justify-content-between lh-sm">
  <div>
    <h6 class="my-0">{product.name}</h6>
    <small class="text-muted">{product.description}</small>
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
  <span class="text-muted">{product.singlePrice * product.quantity} € <i class="fas fa-trash-alt tb-sel" on:click={deletefromCart}/></span>  
</li>