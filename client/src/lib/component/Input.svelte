<script>
    export let id;
    export let label;
    export let readonly;
    export let value;
    export let inputClass="form-control";
    export let type ="text";
    export let colClass;
    export let placeholder;
    export let labelAlign = "vertical"
</script>

{#if labelAlign === 'vertical'}

<div class="mt-2 {colClass}">
    {#if label != null}
        <label for={id} class="mb-1"><b>{label}</b></label>
    {/if}
    {#if type === "text"}
        <input type="text" {readonly} class={inputClass} id={id} bind:value placeholder={placeholder}>
    {:else if type === "email"}
        <input type="email" {readonly} class={inputClass} id={id} bind:value placeholder={placeholder}>
    {:else if type === "textarea"}
        <textarea class={inputClass} id={id} rows="3" bind:value placeholder={placeholder}></textarea>
    {:else if type === "password"}
        <input type="password" {readonly} class={inputClass} id={id} bind:value placeholder={placeholder}>
    {:else if type === "number"}
        <input type="number" {readonly} class={inputClass} id={id} bind:value placeholder={placeholder}>
    {/if}
</div>

{:else if labelAlign === 'horizontal'}

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

{/if}

<!-- TODO: da aggiungere -->
<!-- <div class="invalid-feedback">
    Valid first name is required.
</div> -->