<script>
    // export let title;

    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    function goBack(){

        var listPage = $page.url.href.slice(0, $page.url.href.lastIndexOf('/') )
        listPage = listPage.slice(0, listPage.lastIndexOf('/') )

        goto(`${listPage}`)
    }

    function goNew() {

    }

    export let showButton = true;

</script>

<div class="container my-5">
    <div class="card p-4 bg-body rounded shadow-sm">
        <div class="row mb-2 pb-1">
            <div class="col-4">
                <i class="fa-solid fa-arrow-left fa-xl tb-sel" on:click={() => goBack()}></i>
                <span>Back</span>
            </div>
        </div>
        <slot></slot>
        {#if showButton == true}
        <div class="row border-top pt-3 mt-3">
            <div class="col-3">
                <button class="btn btn-success btn" on:click>Confirm</button>
            </div>
        </div>
        {/if}
    </div>

</div>
