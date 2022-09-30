<script>
    export let id;
    export let label;
    export let readonly;
    export let value;
    export let inputClass="form-control";
    export let type ="text";
</script>

<div class="mb-3 mt-2 row">
    <label for={id} class="col-sm-2 col-form-label"><b>{label}</b></label>
    <div class="col-sm-10">
        {#if type === "text"}
            <input type="text" {readonly} class={inputClass} id={id} bind:value={value}>
        {:else if type === "password"}
            <input type="password" {readonly} class={inputClass} id={id} bind:value={value}>
        {:else if type === "number"}
            <input type="number" {readonly} class={inputClass} id={id} bind:value={value}>
        {/if}
    </div>
</div>