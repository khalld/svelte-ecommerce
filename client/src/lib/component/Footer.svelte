<script>
  import { t, locales, locale } from '$lib/translations'; 
</script>
<!-- Footer -->
<footer class="text-center text-lg-start bg-dark text-muted">
    <!-- Section: Social media -->
    <section class="d-flex justify-content-center justify-content-lg-between p-4">
      <!-- Left -->
      <div class="me-5 d-none d-lg-block">
        <span>Get connected with us on social networks:</span>
      </div>
      <!-- Left -->
  
      <!-- Right -->
      <div>
        <a href="" class="me-4 text-reset">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="" class="me-4 text-reset">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="" class="me-4 text-reset">
          <i class="fab fa-google"></i>
        </a>
        <a href="" class="me-4 text-reset">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="" class="me-4 text-reset">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="" class="me-4 text-reset">
          <i class="fab fa-github"></i>
        </a>
      </div>
      <!-- Right -->
    </section>
    <!-- Section: Social media -->
  
    <!-- Section: Links  -->
    <section class="">
      <div class="container text-center text-md-start mt-5">
        <div class="row mt-3">

          <div class="col-md-5 col-lg-7 mx-auto mb-4">
            <!-- Content -->
            <h6 class="text-uppercase fw-bold mb-4">
              <i class="fas fa-gem me-3"></i>Company name
            </h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan bibendum fermentum. Duis interdum a lorem eget efficitur. Nullam ornare erat in egestas commodo. Fusce sit amet sem in urna malesuada tristique. Aenean vitae purus elementum, malesuada lorem nec, porttitor libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla a sapien non erat egestas porta a a neque. Aenean mollis bibendum urna at faucibus.
            </p>
          </div>
  
          <div class="col-md-3 col-lg-2 mx-auto mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4">
              Useful links
            </h6>
            <p>
              <a href="/products" class="text-reset">Our products</a>
            </p>
            <p>
              <a href="/register" class="text-reset">Registration</a>
            </p>
            <p>
              <a href="/findorder" class="text-reset">Find your order</a>
            </p>
            <p>
              <a href="/recover" class="text-reset">Forgot your password?</a>
            </p>

          </div>
  
          <div class="col-md-4 col-lg-3 mx-auto mb-md-0 mb-4">
            <h6 class="text-uppercase fw-bold">Choose language</h6>
            <select class="form-select form-select-sm mb-2" bind:value="{$locale}">
                {#each $locales as value}
                    <option value="{value}">{$t(`lang.${value}`)}</option>
                {/each}
            </select>
            <h6 class="text-uppercase fw-bold mb-2">Contact</h6>
            <p><i class="fas fa-home me-3"></i> New York, NY 10012, US</p>
            <p>
              <i class="fas fa-envelope me-3"></i>
              <a href = "mailto: info@example.com">info@example.com</a>
            </p>
            <p><i class="fas fa-phone me-3"></i> + 01 234 567 88</p>
            <p><i class="fas fa-print me-3"></i> + 01 234 567 89</p>
          </div>
        </div>
      </div>
    </section>
    <!-- Section: Links  -->
  
    <!-- Copyright -->
    <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
      © Copyright:
      <a class="text-reset fw-bold" href="https://www.linkedin.com/in/danilo-leocata-3a76a915b/">Danilo Leocata</a>
    </div>
    <!-- Copyright -->
  </footer>
  <!-- Footer -->