<script>
    export let id;
    export let label;
    export let arialabel;
    export let value;
    export let elements = [];
    export let disabled;
    export let labelAlign = 'vertical';
</script>

{#if labelAlign == 'vertical'}
    <div class="mb-3 mt-2">
        <label for={id} class="col-sm-2 col-form-label">{label}</label>
        <select id={id} name={id} class="form-select" aria-label={arialabel} bind:value={value} {disabled}>
            {#each elements as e}
                <option value={e}>
                    {e}
                </option>
            {/each}
        </select>
    </div>
{:else if labelAlign == 'horizontal'}
    <div class="mb-3 row">
        <label for="status-select" class="col-sm-2 col-form-label"><b>{label}</b></label>
        <div class="col-sm-10">
            <select id={id} name={id} class="form-select" aria-label={arialabel} bind:value={value} {disabled}>
                {#each elements as e}
                    <option value={e}>
                        {e}
                    </option>
                {/each}
            </select>
        </div>
    </div>
{/if}