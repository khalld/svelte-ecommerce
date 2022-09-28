<script>
  import {get, writable} from 'svelte/store'
  import userStore from '../../lib/store/userStore.js';
  import cartStore from '../store/cartStore.js';
  import { goto } from '$app/navigation';

  // $: console.log(get(userStore))
  // $: console.log(get(cartStore))

  let totalAmount = 0;

	function logout(){
		userStore.set({loggedIn: false, user: {}});
		goto("/login");
	}

</script>

<nav class="navbar navbar-expand-lg bg-primary mb-4">
  <div class="container-fluid">

    <a class="navbar-brand" href="/">Navbar</a>
    <button class="navbar-toggler ms-4 d-md-none collapsed bg-success" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
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
        <!-- TODO: fetch delle categories -->
        <li class="nav-item dropdown">
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
        </li>
        <li class="nav-item me-4" >
          <button type="button" class="btn position-relative" on:click={() => goto("/cart")}>
            <i class="fa-solid fa-cart-shopping fa-xl" ></i>
            <span class="position-absolute badge rounded-pill bg-danger">
              {$cartStore.n_elem}
            </span>
          </button>
        </li>

        {#if $userStore.loggedIn == true}
          <li class="nav-item dropstart">
            <button type="button" class="btn position-relative" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-user fa-xl" ></i>
              <!-- <span class="position-absolute badge rounded-pill bg-danger">
                99+
              </span> -->
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/profile">Profile</a></li>
              {#if $userStore.user.role === "admin"}
                <li><a class="dropdown-item" href="/admin">Admin panel</a></li>
              {/if}

              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" on:click={() => logout()} href="/">Logout</a></li>
            </ul>
          </li>
        {:else}
          <button type="button" class="btn btn-primary position-relative" on:click={() => goto('/login')} >
            Login
          </button>
        {/if}


      </ul>
    </div>
  </div>
</nav>