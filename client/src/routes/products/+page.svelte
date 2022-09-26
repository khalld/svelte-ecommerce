<script>
  import Product from "../../lib/component/Product.svelte";

  export let data;

  console.log(data)
</script>

{#each data.products as prod}
    <Product p={prod} addToCart={() => console.log("todo")}/>

{/each}
