<script>
    export let label;
    export let value;
    export let id;
</script>

<div class="form-check">
    <input class="form-check-input" type="checkbox" bind:checked={value} id={id}>
    <label class="form-check-label" for={id}>
        {label}
    </label>
</div>