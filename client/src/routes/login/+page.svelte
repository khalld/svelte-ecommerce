
<script>
  import env from '../../lib/store/env.js';
  import userStore from '../../lib/store/userStore.js';
	import { goto } from '$app/navigation';

  let user = {
    email: 'admin@email.it',
    password: 'password01'
  }

  export let error = null;

  async function submitLogin() {
    await fetch(`${env.host}/users/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res => {
      if (res.status == 400){
        throw new Error('User not founded or password is not correct')
      }
      if (res.status == 409){
        throw new Error('User is disabled')
      }
      return res.json();
    })
    .then(data => {
      userStore.set({
        loggedIn: true,
        _id: data._id,
        role: data.role
      })
    })
    .then(() => {
      goto("/products");
    })
    .catch(err => error = err.message)
  }

</script>

<div class="container text-center w-50">
    <form on:submit|preventDefault={submitLogin}>
        <h1 class="h3 mb-3 fw-normal">Please Sign in</h1>
    
        <div class="form-floating mb-2">
          <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" bind:value={user.email}>
          <label for="floatingInput">Email address</label>
        </div>

        <div class="form-floating mb-2">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" bind:value={user.password}>
          <label for="floatingPassword">Password</label>
        </div>
        <!-- <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div> -->
        <p>Needs an account? Register <a href="/register">here</a>!</p>
        <p>Forgot your password? Click <a href="/recover">here</a>!</p>

        {#if error}
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        {/if}
        <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

      </form>
</div>
