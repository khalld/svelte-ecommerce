<script>
    
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    
    export let title;
    // $: console.log($page.url)

    // function goBack(){

    //     var listPage = $page.url.href.slice(0, $page.url.href.lastIndexOf('/') )
    //     listPage = listPage.slice(0, listPage.lastIndexOf('/') )

    //     goto(`${listPage}`)
    // }

    // function goNew() {

    // }

</script>

<div class="container">
    <div class="card p-4 bg-body rounded shadow-sm mb-2">
        <div class="row mb-2 pb-1">
            <div class="col-4">
                <!-- <i class="fa-solid fa-arrow-left fa-xl tb-sel" on:click={() => goBack()}></i> -->
                <span>{title}</span>
            </div>
        </div>
        <slot></slot>
        <div class="row border-top pt-3 mt-3">
            <div class="col-3">
                <!-- <button class="btn btn-success btn" on:click>Confirm</button> -->
            </div>
            <div class="col-3">
                <!-- <button class="btn btn-warning btn" on:click={() => goNew()}>Create new</button> -->
            </div>
        </div>
    </div>

</div>
