<script>
	import { page } from '$app/stores'
	// import { userStore } from '../../lib/js/store';
	import { goto } from '$app/navigation';

	function logout(){
		// userStore.set({loggedIn: false, user: {}});
		goto("/login");
	}
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<div class="container-fluid">
		<a class="navbar-brand" href="/"><i class="fas fa-dragon"></i></a>
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
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item">
					<a class="nav-link { $page.url.pathname == "/" ? "active" : "" }" aria-current="page" href="/"><i class="fas fa-home"></i> Home</a>
				</li>
				<li class="nav-item">
					<a class="nav-link  { $page.url.pathname == "/cart" ? "active" : "" }" href="/cart"><i class="fas fa-shopping-cart"></i> Cart</a>
				</li>
				<li class="nav-item">
					<a class="nav-link  { $page.url.pathname == "/product" ? "active" : "" }" href="/product"><i class="fas fa-star"></i> Products</a>
				</li>
				<li class="nav-item dropdown">
					<a
						class="nav-link dropdown-toggle {$page.url.pathname == "/admin" || $page.url.pathname == "/profile" ? "active" : "" }"
						href="/"
						id="navbarDropdown"
						role="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
					<!-- <i class="fas fa-user"></i> {$userStore.user.username} -->
					</a>
					<ul class="dropdown-menu" aria-labelledby="navbarDropdown">

						<!-- {#if $userStore.user.role == 'admin'}
						<li><a class="dropdown-item {$page.url.pathname == "/admin" ? "active" : "" }" href="/admin">Admin</a></li>
						{/if} -->
						
						<li><a class="dropdown-item {$page.url.pathname == "/profile" ? "active" : "" }" href="/profile">Profile</a></li>
						<li><hr class="dropdown-divider" /></li>
						<li><div class="dropdown-item" on:click={logout}>Logout</div></li>
					</ul>
				</li>
			</ul>
			<!-- <form class="d-flex">
				<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
				<button class="btn btn-outline-success" type="submit">Search</button>
			</form> -->
		</div>
	</div>
</nav>
