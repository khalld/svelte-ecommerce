<script>
  import {get, writable} from 'svelte/store'
  import userStore from '../../lib/store/userStore.js';
  import cartStore from '../store/cartStore.js';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  // $: console.log(get(userStore))
  // $: console.log(get(cartStore))
  // $: console.log($page.url.pathname)

	function logout(){
		userStore.set({loggedIn: false, _id: null, role: null});
		goto("/login");
	}

</script>

<nav class="navbar navbar-expand-lg bg-primary mb-4 {$page.url.pathname == "/" ? "fixed-top" : "" }">
  <div class="container-fluid">

    <a class="navbar-brand" href="/"><i class="fa-brands fa-d-and-d fa-xl"></i></a>
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

        <li class="nav-item me-4" >
          <button type="button" class="btn btn-primary position-relative {$page.url.pathname == "/cart" ? "active" : "" }" on:click={() => goto("/cart")}>
            <i class="fa-solid fa-cart-shopping fa-xl" ></i>
            <span class="position-absolute badge rounded-pill bg-danger">
              {$cartStore.n_elem}
            </span>
          </button>
        </li>

        <button type="button" class="btn btn-primary position-relative {$page.url.pathname == "/products" ? "active" : "" }" on:click={() => goto('/products')} >
          Products
        </button>

        {#if $userStore.loggedIn == true}
          <li class="nav-item dropstart">
            <button type="button" class="btn btn-primary position-relative {$page.url.pathname == "/profile" ? "active" : "" }" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-user fa-xl" ></i>
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item {$page.url.pathname == "/profile" ? "active" : "" }" href="/profile">Profile</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" on:click={() => logout()} href="/">Logout</a></li>
            </ul>
          </li>
        {:else}
          <button type="button" class="btn btn-primary position-relative" on:click={() => goto('/login')} >
            Login
          </button>
        {/if}

        {#if $userStore.role === "admin"}
          <li class="nav-item dropstart">
            <a
              class="nav-link dropdown-toggle"
              href="/"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Admin panel
            </a>
            <ul class="dropdown-menu">
              <li class="nav-item">
                <a class="dropdown-item {$page.url.pathname == "/admin" ? "active" : "" }" href="/admin">
                  <i class="fa-solid fa-jedi fa-lg"></i>
                  Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a class="dropdown-item  {$page.url.pathname == "/admin/orders" ? "active" : "" }" href="/admin/orders">
                  <i class="fa-solid fa-truck-fast fa-lg"></i>
                  Orders
                </a>
              </li>
              <li class="nav-item">
                <a class="dropdown-item  {$page.url.pathname == "/admin/users" ? "active" : "" }" href="/admin/users">
                  <i class="fa-solid fa-users fa-lg"></i>
                  Users
                </a>
              </li>

              <li class="nav-item">
                <a class="dropdown-item  {$page.url.pathname == "/admin/warehouse" ? "active" : "" }" href="/admin/warehouse">
                  <i class="fa-solid fa-warehouse fa-lg"></i>
                  Warehouse
                </a>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li class="nav-item">
                <a class="dropdown-item disabled" href="/">
                  <i class="fa-solid fa-question fa-lg"></i>
                  Helpdesk
                </a>
              </li>
            </ul>
          </li>
        {/if}

      </ul>
    </div>
  </div>
</nav>