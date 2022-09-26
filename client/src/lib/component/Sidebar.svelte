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
  z-index: 100;
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
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

/*
 * Navbar
 */

</style>


<script>
	import { page } from '$app/stores';
</script>

<div class="container-fluid">
  <div class="row">
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="position-sticky pt-3 sidebar-sticky">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link {$page.url.pathname == "/admin" ? "active" : "" }" href="/admin">
              <i class="fa-solid fa-jedi fa-lg"></i>
              Dashboard
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link {$page.url.pathname == "/admin/orders" ? "active" : "" }" href="/admin/orders">
              <i class="fa-solid fa-truck-fast fa-lg"></i>
              Orders
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link {$page.url.pathname == "/admin/users" ? "active" : "" }" href="/admin/users">
              <i class="fa-solid fa-users fa-lg"></i>
              Users
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="/">
              <i class="fa-solid fa-question fa-lg"></i>
              Helpdesk
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link {$page.url.pathname == "/admin/warehouse" ? "active" : "" }" href="/admin/warehouse">
              <i class="fa-solid fa-warehouse fa-lg"></i>
              Warehouse
            </a>
          </li>
        </ul>

        <!-- Example of submenus -->
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
      </div>
    </nav>


    <div class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <slot></slot>
    </div>
  </div>
</div>

