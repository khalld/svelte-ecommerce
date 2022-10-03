<script>
    export let title;

</script>

<div class="container">
    <div class="card p-4 bg-body rounded shadow-sm mb-2">
        <div class="row pb-1">
            {#if title != null}
                <div class="col-4 mt-2">
                    <span>{title}</span>
                </div>
            {/if}
        </div>
        <slot></slot>
    </div>

</div>
