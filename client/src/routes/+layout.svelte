<script>
import Navbar from '../lib/component/Navbar.svelte';
import Navbar2 from '../lib/component/Navbar2.svelte';

// import { page } from '$app/stores';

</script>

<Navbar2 />

<slot></slot>

<!-- {#if $page.url.pathname !== '/admin'}
<div class="my-3 mx-3">
    <slot></slot>
</div>
{:else}
    <slot></slot>
{/if} -->