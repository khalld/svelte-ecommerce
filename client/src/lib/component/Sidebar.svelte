<script>
    import { page } from '$app/stores';
    import userStore from '../store/userStore';
    import { goto } from '$app/navigation';

    // function capitalizeFirst(str){
    //     return str.charAt(0).toUpperCase() + str.slice(1);
    // }

    // let title = capitalizeFirst($page.url.pathname.split("/")[$page.url.pathname.split("/").length - 1])

    function logout(){
		userStore.set({loggedIn: false, _id: null, role: null});
		goto("/login");
	}

</script>

<header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/">Admin Dashboards</a>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
</header>

<div class="container-fluid">
    <div class="row position-relative">
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="position-sticky pt-3 sidebar-sticky">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link {$page.url.pathname == "/admin" ? "active" : "" } nav-link" href="/admin">
                            <i class="fa-solid fa-jedi fa-lg"></i>
                            Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link  {$page.url.pathname == "/admin/orders" ? "active" : "" }" href="/admin/orders">
                            <i class="fa-solid fa-truck-fast fa-lg"></i>
                            Orders
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link  {$page.url.pathname == "/admin/users" ? "active" : "" }" href="/admin/users">
                            <i class="fa-solid fa-users fa-lg"></i>
                            Users
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link  {$page.url.pathname == "/admin/warehouse" ? "active" : "" }" href="/admin/warehouse">
                            <i class="fa-solid fa-warehouse fa-lg"></i>
                            Warehouse
                        </a>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="/">
                            <i class="fa-solid fa-question fa-lg"></i>
                            Helpdesk
                        </a>
                    </li>
                </ul>

                <!-- <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                    <span>Saved reports</span>
                    <a class="link-secondary" href="#" aria-label="Add a new report">
                    <span data-feather="plus-circle" class="align-text-bottom"></span>
                    </a>
                </h6>
                <ul class="nav flex-column mb-2">
                    <li class="nav-item">
                    <a class="nav-link" href="#">
                        <span data-feather="file-text" class="align-text-bottom"></span>
                        Current month
                    </a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">
                        <span data-feather="file-text" class="align-text-bottom"></span>
                        Last quarter
                    </a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">
                        <span data-feather="file-text" class="align-text-bottom"></span>
                        Social engagement
                    </a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">
                        <span data-feather="file-text" class="align-text-bottom"></span>
                        Year-end sale
                    </a>
                    </li>
                </ul> -->

                <div class="position-absolute bottom-0 start-0 mb-2 p-2">
                    <div class="dropdown flex-column">
                        <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-user fa-xl rounded-circle me-2"></i>

                            <strong>Profile</strong>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                            <li><a class="dropdown-item {$page.url.pathname == "/profile" ? "active" : "" }" href="/profile">Profile</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" on:click={() => logout()} href="/">Logout</a></li>
                        </ul>
                    </div>
                </div>


            </div>

        </nav>

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <!-- <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Dashboard</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group me-2">
                    <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
                </div>
                <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
                    <span data-feather="calendar" class="align-text-bottom"></span>
                    This week
                </button>
            </div>
        </div> -->
            <slot></slot>
        </main>
    </div>
</div>





<style>

    .sidebar {
        position: fixed;
        top: 0;
        /* rtl:raw:
        right: 0;
        */
        bottom: 0;
        /* rtl:remove */
        left: 0;
        z-index: 100; /* Behind the navbar */
        padding: 48px 0 0; /* Height of navbar */
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
    }

    @media (max-width: 767.98px) {
        .sidebar {
            top: 1rem;
        }
    }

    .sidebar-sticky {
        height: calc(100vh - 48px);
        overflow-x: hidden;
        overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
    }

    .sidebar .nav-link {
        font-weight: 500;
        color: #333;
    }


    .sidebar .nav-link.active {
        color: #2470dc;
    }

    .sidebar-heading {
        font-size: .75rem;
    }

    .navbar-brand {
        padding-top: .75rem;
        padding-bottom: .75rem;
        background-color: rgba(0, 0, 0, .25);
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
    }

    .navbar .navbar-toggler {
        top: .25rem;
        right: 1rem;
    }

</style>