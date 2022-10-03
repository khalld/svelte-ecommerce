<script>
    export let id;
    export let label;
    export let readonly;
    export let value;
    // export let inputClass = readonly != null ? "form-control-plaintext" : "form-control";
    export let inputClass = "form-control";

    export let type ="text";
    export let colClass;
    export let placeholder;
    export let labelAlign = "vertical"
    export let requiredText = "This field is required "
</script>

{#if labelAlign === 'vertical'}
<!-- 
<div class="col-md-6">
    <label for="validationCustom03" class="form-label">City</label>
    <input type="text" class="form-control" id="validationCustom03" required>
    <div class="invalid-feedback">
      Please provide a valid city.
    </div>
  </div> -->

<div class="mt-2 {colClass}">
    {#if label != null}
        <label for={id} class="mb-1">{label}</label>
    {/if}
    {#if type === "text"}
    
    
    <div class="input-group has-validation">
        <input type="text" {readonly} class={inputClass} id={id} bind:value placeholder={placeholder} aria-describedby="validationServerUsernameFeedback" required>
        <div id="validationServerUsernameFeedback" class="invalid-feedback">
            Please choose a username.
          </div>
    </div>
    {:else if type === "email"}
        <input type="email" {readonly} class={inputClass} id={id} bind:value placeholder={placeholder} required>
    {:else if type === "textarea"}
        <textarea class={inputClass} id={id} rows="3" bind:value placeholder={placeholder}></textarea>
    {:else if type === "password"}
        <input type="password" {readonly} class={inputClass} id={id} bind:value placeholder={placeholder} required>
    {:else if type === "number"}
        <input type="number" {readonly} class={inputClass} id={id} bind:value placeholder={placeholder} required>
    {/if}
    <div class="invalid-feedback">
        {requiredText}
    </div>
</div>

{:else if labelAlign === 'horizontal'}

<div class="mb-3 mt-2 row">
    {#if label != null}
        <label for={id} class="col-sm-2 col-form-label">{label}</label>
    {/if}
    <div class="col-sm-10">
        {#if type === "text"}
            <input type="text" {readonly} class={inputClass} id={id} bind:value required>
        {:else if type === "password"}
            <input type="password" {readonly} class={inputClass} id={id} bind:value required>
        {:else if type === "number"}
            <input type="number" {readonly} class={inputClass} id={id} bind:value required>
        {:else if type === "email"}
            <input type="email" {readonly} class={inputClass} id={id} bind:value required>
        {:else if type === "textarea"}
            <textarea {readonly} class={inputClass} id={id} rows="3" bind:value required></textarea>
        {/if}
    </div>
    <div class="invalid-feedback">
        Please choose a username.
    </div>
</div>

{/if}

<!-- TODO: da aggiungere -->
<!-- <div class="invalid-feedback">
    Valid first name is required.
</div> -->