<script>
    import { goto } from '$app/navigation';
    
    export let addToCart;
    export let p = {
        url: '',
        description: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    };
</script>

<div class="col-sm-12 col-md-4 col-lg-6 col-xl-4 col-md-4 mt-2">
    <div class="card shadow-lg h-100">
      <!-- <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> -->
      <img src={p.photos[0].src} class="card-img-top tb-sel" alt="pic-n-{p.photos[0].id}" on:click={() => goto(`/products/${p._id}`)} >

      <div class="card-body">
        <p class="card-text">{p.description}</p>
      </div>
      <div class="card-footer d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button class="btn btn-success" on:click={() => goto(`/products/${p._id}`)}>Detail</button>
          {#if p.quantity <= 0}
            <button class="btn btn-warning" disabled>Add to cart</button>
          {:else}
            <button class="btn btn-warning" on:click={() => addToCart(p._id)} >Add to cart</button>
          {/if}
        </div>
        {#if p.quantity <= 0}
          <span class="badge bg-danger rounded-pill">On stock</span>
        {:else if p.quantity < 5}
          <span class="badge bg-warning rounded-pill">Only {p.quantity} left</span>
        {/if}


        <small class="text-muted">9 mins</small>
      </div>

    </div>
    
</div>