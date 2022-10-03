
<script>
  import env from '../../lib/store/env.js';
  import userStore from '../../lib/store/userStore.js';
	import { goto } from '$app/navigation';
  import Input from '../../lib/component/Input.svelte';
  import Hint from '../../lib/component/Hint.svelte';

  let code = null;

  export let error = "we";

  async function submit() {
    goto(`findorder/${code}`)
  }

</script>

<div class="container text-center w-50">
    <form on:submit|preventDefault={submit} class="needs-validation">
      <h1 class="h3 mb-3 fw-normal">Find your order</h1>
      <h6 class="mb-3 text-muted">Find your order inserting your code sended by email</h6>

      <Input type="text" placeholder="Insert your order code" id="code" bind:value={code}/>
      <Hint str={error}/>
      
      <button class="w-100 btn btn-lg btn-primary mt-2" type="submit">Send</button>

    </form>
</div>
