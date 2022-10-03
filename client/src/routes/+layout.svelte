<script>
import Navbar from '../lib/component/Navbar.svelte';
import Footer from '../lib/component/Footer.svelte';
import { NotificationDisplay } from '@beyonk/svelte-notifications'
import { page } from '$app/stores';

// export let data;

var currPath = [];
$: currPath = $page.url.pathname.split("/")

// $: console.log(get(userStore))

</script>

<style>
    @import '../../static/custom.css';
</style>

<NotificationDisplay />

<Navbar />
<div class="d-flex flex-column min-vh-100 {$page.url.pathname != "/" ? "mx-4 " : "" } mb-2">
    <slot></slot>
</div>


<Footer></Footer>