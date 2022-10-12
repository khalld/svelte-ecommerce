<script>
    import "../app.scss";
    import Navbar from '../lib/component/Navbar.svelte';
    import Footer from '../lib/component/Footer.svelte';
    import { page } from '$app/stores';
    import Sidebar from '../lib/component/Sidebar.svelte';
    import Notifications from 'svelte-notifications';


    var currPath = [];
    $: currPath = $page.url.pathname.split("/")
</script>

<Notifications>
{#if ! currPath.includes("admin")}
    <Navbar />
    <div class="d-flex flex-column min-vh-100 {$page.url.pathname != "/" ? "mx-4 " : "" } mb-2 p-5 mt-5">
        <slot></slot>
    </div>
    <Footer />
{:else}
    <Sidebar>
        <slot></slot>
    </Sidebar>
{/if}
</Notifications>

<style>
    @import '../../static/custom.css';
</style>