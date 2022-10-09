<script>
  import userStore from '../../lib/store/userStore.js';
  import cartStore from '../store/cartStore.js';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  function logout(){
		userStore.set({loggedIn: false, _id: null, role: null});
		goto("/login");
	}

</script>



<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
  <div class="container-fluid">

    <a class="navbar-brand p-2" href="/"><i class="fa-brands fa-d-and-d fa-xl {$page.url.pathname == "/" ? "link-light" : "link-secondary" } "></i></a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto ">
        <!-- TODO: categories -->
        <!-- <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="/"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Categories
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> -->

        <li class="nav-item">
          <a class="nav-link {$page.url.pathname == "/products" ? "active" : "" } " href="/products" >Our products</a>
        </li>

        {#if $userStore.loggedIn == true}
          <li class="nav-item dropstart me-3 ms-3 mt-2">
            <i class="fa-solid fa-user fa-xl tb-sel {$page.url.pathname == "/profile" ? "link-light" : "link-secondary" } " data-bs-toggle="dropdown" aria-expanded="false" ></i>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item {$page.url.pathname == "/profile" ? "active" : "" }" href="/profile">Profile</a></li>
              {#if $userStore.role === "admin"}
                <li><a class="dropdown-item {$page.url.pathname == "/admin" ? "active" : "" }" href="/admin">Dashboard</a></li>
              {/if}
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" on:click={() => logout()} href="/">Logout</a></li>
            </ul>
          </li>
        {:else}
          <a class="nav-link {$page.url.pathname == "/profile" ? "active" : "" }" href="/login" >
            Login
          </a>
        {/if}

        <li class="nav-item me-4 mt-2 position-relative" >
            <i class="fa-solid fa-cart-shopping fa-xl tb-sel {$page.url.pathname == "/cart" ? "link-light" : "link-secondary" } " on:click={() => goto("/cart")}></i>
            <span class="position-absolute badge rounded-pill bg-danger tb-sel">
              {$cartStore.n_elem}
            </span>
        </li>

      </ul>
    </div>
  </div>
</nav>