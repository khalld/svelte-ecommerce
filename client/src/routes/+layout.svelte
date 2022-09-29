<script>
import Navbar from '../lib/component/Navbar.svelte';
import Footer from '../lib/component/Footer.svelte';
import cartStore from '../lib/store/cartStore';
import { NotificationDisplay } from '@beyonk/svelte-notifications'

</script>

<Navbar />
<NotificationDisplay />

<div class="mx-4">
    <slot></slot>
</div>

<!-- <slot></slot> -->

<!-- <Footer /> -->

<!-- {#if $page.url.pathname !== '/admin'}
<div class="my-3 mx-3">
    <slot></slot>
</div>
{:else}
    <slot></slot>
{/if} -->