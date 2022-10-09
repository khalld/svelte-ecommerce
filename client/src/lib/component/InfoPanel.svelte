<script>
    export let title;
    export let redirect;
    export let redirectText;
</script>

<div class="container mt-4">
    <div class="card p-4 bg-body rounded shadow-sm mb-2">
        <div class="row pb-1">
            {#if title != null}
                <div class="col-4 mt-2">
                    <span>{title}</span>
                </div>
            {/if}
        </div>
        <slot></slot>

        {#if redirect != null}
            <hr class="my-1">
            <small class="d-block text-end mt-3">
                <a href={redirect} target="_blank">{redirectText}</a>
            </small>
        {/if}
    </div>

</div>
