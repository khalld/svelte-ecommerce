<script>
  import ProductHome from "../lib/component/ProductHome.svelte";
  import userStore from '../lib/store/userStore.js';

  export let data;

</script>

<div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
    {#if $userStore.loggedIn == false}
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
    {/if}
  </div>
  <div class="carousel-inner">
    {#if $userStore.loggedIn == false}
    <div class="carousel-item active">
      <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"/></svg>
      <div class="container">
        <div class="carousel-caption text-start">
          <h1 contenteditable="true">Maecenas sit amet ligula ipsum</h1>
          <p contenteditable="true">Maecenas egestas at nisl non lacinia. Vestibulum nec nulla bibendum, elementum metus in, facilisis velit. Donec ac laoreet justo. Nulla accumsan interdum mi, vitae consequat nunc interdum volutpat. Duis fermentum porttitor nunc ut varius. Vestibulum cursus venenatis bibendum. Cras ornare pharetra purus. Curabitur odio libero, efficitur a est non, tristique malesuada nisi. Sed et finibus diam, quis euismod erat. </p>
          <p contenteditable="true"><a class="btn btn-lg btn-primary" href="/register">Sign up</a></p>
        </div>
      </div>
    </div>
    {/if}
    <div class="carousel-item {$userStore.loggedIn == true ? "active" : ""}">
      <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"/></svg>
      <div class="container">
        <div class="carousel-caption">
          <h1 contenteditable="true">Aenean tincidunt accumsan massa, vel vehicula purus lobortis at</h1>
          <p contenteditable="true">Maecenas rhoncus efficitur eleifend. Duis scelerisque massa vel tortor pulvinar mattis. Ut vestibulum nisl in rutrum venenatis. </p>
          <p contenteditable="true"><a class="btn btn-lg btn-primary" href="/findorder">Find your order</a></p>
        </div>
      </div>
    </div>
    <div class="carousel-item">
      <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"/></svg>
      <div class="container">
        <div class="carousel-caption text-end">
          <h1 contenteditable="true">Fusce ullamcorper velit eu finibus tempor.</h1>
          <p contenteditable="true">Phasellus dolor metus, volutpat vel eros eget, feugiat eleifend risus. Aliquam aliquam lobortis porttitor. Duis vitae mauris sit amet ex convallis auctor. Fusce non nisl vel leo sollicitudin tempus. Proin vel porta est, in porttitor justo. Phasellus id eros ultrices, placerat mi quis, hendrerit nisl.</p>
          <p contenteditable="true"><a class="btn btn-lg btn-primary" href="/products">Our products</a></p>
        </div>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>


<div class="marketing row">
  <!-- Three columns of text below the carousel -->
  <!-- {#if data.products.length > 0} -->
  <div class="row">
    {#each data.products as p}
      <div class="col-lg-4">
        <ProductHome p={p} />
      </div>
    {/each}
  </div>
  <!-- START THE FEATURETTES -->
  <hr class="featurette-divider">
  <!-- {/if} -->
  <div class="row featurette">
    <div class="col-md-7">
      <h2 class="featurette-heading fw-normal lh-1" contenteditable="true">First featurette heading. <span class="text-muted" contenteditable="true">It???ll blow your mind.</span></h2>
      <p class="lead" contenteditable="true">Some great placeholder content for the first featurette here. Imagine some exciting prose here.</p>
    </div>
    <div class="col-md-5">
      <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>
    </div>
  </div>
  <hr class="featurette-divider">
  <div class="row featurette">
    <div class="col-md-7 order-md-2">
      <h2 class="featurette-heading fw-normal lh-1" contenteditable="true">Oh yeah, it???s that good. <span class="text-muted" contenteditable="true">See for yourself.</span></h2>
      <p class="lead" contenteditable="true">Another featurette? Of course. More placeholder content here to give you an idea of how this layout would work with some actual real-world content in place.</p>
    </div>
    <div class="col-md-5 order-md-1">
      <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>
    </div>
  </div>
  <hr class="featurette-divider">
  <div class="row featurette">
    <div class="col-md-7">
      <h2 class="featurette-heading fw-normal lh-1" contenteditable="true">And lastly, this one. <span class="text-muted" contenteditable="true">Checkmate.</span></h2>
      <p class="lead" contenteditable="true">And yes, this is the last block of representative placeholder content. Again, not really intended to be actually read, simply here to give you a better view of what this would look like with some actual content. Your content.</p>
    </div>
    <div class="col-md-5">
      <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>
    </div>
  </div>

</div><!-- /.container -->




<style>
  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }

  /* GLOBAL STYLES
  -------------------------------------------------- */
  /* Padding below the footer and lighter body text */


  /* CUSTOMIZE THE CAROUSEL
  -------------------------------------------------- */

  /* Carousel base class */
  .carousel {
    margin-bottom: 4rem;
  }
  /* Since positioning the image, we need to help out the caption */
  .carousel-caption {
    bottom: 3rem;
    z-index: 10;
  }

  /* Declare heights because of positioning of img element */
  .carousel-item {
    height: 32rem;
  }


  /* MARKETING CONTENT
  -------------------------------------------------- */

  /* Center align the text within the three columns below the carousel */
  .marketing .col-lg-4 {
    margin-bottom: 1.5rem;
    text-align: center;
  }
  /* rtl:begin:ignore */
  .marketing .col-lg-4 p {
    margin-right: .75rem;
    margin-left: .75rem;
  }
  /* rtl:end:ignore */


  /* Featurettes
  ------------------------- */

  .featurette-divider {
    margin: 5rem 0; /* Space out the Bootstrap <hr> more */
  }

  /* Thin out the marketing headings */
  /* rtl:begin:remove */
  .featurette-heading {
    letter-spacing: -.05rem;
  }

  /* rtl:end:remove */

  /* RESPONSIVE CSS
  -------------------------------------------------- */

  @media (min-width: 40em) {
    /* Bump up size of carousel content */
    .carousel-caption p {
      margin-bottom: 1.25rem;
      font-size: 1.25rem;
      line-height: 1.4;
    }

    .featurette-heading {
      font-size: 50px;
    }
  }

  @media (min-width: 62em) {
    .featurette-heading {
      margin-top: 7rem;
    }
  }

</style>
