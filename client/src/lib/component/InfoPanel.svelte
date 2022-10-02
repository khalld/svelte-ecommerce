<script>
    export let title;

</script>

<div class="container">
    <div class="card p-4 bg-body rounded shadow-sm mb-2">
        <div class="row mb-2 pb-1">
            <div class="col-4">
                <span>{title}</span>
            </div>
        </div>
        <slot></slot>
    </div>

</div>
