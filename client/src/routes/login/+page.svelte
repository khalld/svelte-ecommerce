
<script>
  import env from '../../lib/store/env.js';
  import userStore from '../../lib/store/userStore.js';
	import { goto } from '$app/navigation';
  import Hint from '../../lib/component/Hint.svelte';

  let user = {
    email: 'admin@mail.it',
    password: 'password01'
  }

  export let error = null;

  async function submitLogin() {
    error = null;

    const regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    try {

      if (regexEmail.test(user.email) == false){
        throw new Error('Email field is not valid!')
      }

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
        if (res.status == 401){
          throw new Error('Wrong password')
        }
        if (res.status == 409){
          throw new Error('User is disabled')
        }
        if (res.status == 404){
          throw new Error('Something wrong happened')
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
      
    } catch (e){
      error = e.message;
    }

  }

</script>


<div class="container">

  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card-group mb-0">
        <div class="card p-4">
          <div class="card-body">
            <h1>Login</h1>
            <form on:submit|preventDefault={submitLogin}>
              <p class="text-muted">Sign In to your account</p>
              <div class="input-group mb-3">
                <span class="input-group-text" id="addon-email"><i class="fa fa-user"></i></span>
                <input type="email" class="form-control" id="email-login" placeholder="Email" bind:value={user.email} required>
              </div>
              <div class="input-group mb-4">
                <span class="input-group-text" id="addon-pwd"><i class="fa fa-lock"></i></span>
                <input type="password" class="form-control" id="pwd-login" placeholder="Password" bind:value={user.password} required>
              </div>
              <div class="row">
                <Hint str={error} />
                <div class="col-6">
                  <button type="submit" class="btn btn-primary px-4">Login</button>
                </div>
                <div class="col-6 text-right">
                  <button type="button" class="btn btn-link px-0" on:click={() => goto('/recover')}>Forgot password?</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="card text-white bg-primary py-5 ">
          <div class="card-body text-center">
            <div>
              <h2>Sign up</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <button type="button" class="btn btn-primary active mt-3" on:click={() => goto('/register')}>Register Now!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
