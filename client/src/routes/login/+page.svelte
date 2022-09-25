
<script>
  // import {get, writable} from 'svelte/store'
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
        throw new Error('User not founded')
      }
      return res.json();
    })
    .then(data => {
      userStore.set({
        loggedIn: true,
        user: {
          _id: data._id,
          email: data.email,
          role: data.role
        }
      })
      // console.log(data)
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
        {#if error}
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        {/if}
        <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

      </form>
</div>
