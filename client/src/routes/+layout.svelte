<script>
    import Navbar from '../lib/component/Navbar.svelte';
    import Footer from '../lib/component/Footer.svelte';
    import { NotificationDisplay } from '@beyonk/svelte-notifications'
    import { page } from '$app/stores';
    import Sidebar from '../lib/component/Sidebar.svelte';

    // export let data;

    var currPath = [];
    $: currPath = $page.url.pathname.split("/")

</script>

<NotificationDisplay />

{#if ! currPath.includes("admin")}

<Navbar />
<div class="d-flex flex-column min-vh-100 {$page.url.pathname != "/" ? "mx-4 " : "" } mb-2">
    <slot></slot>
</div>

<Footer></Footer>

{:else}
    <Sidebar>
        <slot></slot>
    </Sidebar>

{/if}

<style>
    @import '../../static/custom.css';
</style>