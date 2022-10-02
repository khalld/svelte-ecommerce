<script>
    export let id;
    export let label;
    export let readonly;
    export let value;
    export let inputClass="form-control";
    export let type ="text";
</script>

<div class="mb-3 mt-2 row">
    {#if label != null}
        <label for={id} class="col-sm-2 col-form-label"><b>{label}</b></label>
    {/if}
    <div class="col-sm-10">
        {#if type === "text"}
            <input type="text" {readonly} class={inputClass} id={id} bind:value>
        {:else if type === "password"}
            <input type="password" {readonly} class={inputClass} id={id} bind:value>
        {:else if type === "number"}
            <input type="number" {readonly} class={inputClass} id={id} bind:value>
        {:else if type === "email"}
            <input type="email" {readonly} class={inputClass} id={id} bind:value>
        {:else if type === "textarea"}
            <textarea {readonly} class={inputClass} id={id} rows="3" bind:value></textarea>
        {/if}
    </div>
</div>