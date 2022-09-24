<nav class="navbar navbar-expand-lg bg-light border border-5">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Navbar</a>
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
            href="#"
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
          <button type="button" class="btn position-relative">
            <i class="fa-solid fa-cart-shopping fa-xl" ></i>
            <span class="position-absolute badge rounded-pill bg-danger">
              99+
            </span>
          </button>
        </li>

        <li class="nav-item dropstart">
          <button type="button" class="btn position-relative" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-user fa-xl" ></i>
            <!-- <span class="position-absolute badge rounded-pill bg-danger">
              99+
            </span> -->
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>


      </ul>
    </div>
  </div>
</nav>