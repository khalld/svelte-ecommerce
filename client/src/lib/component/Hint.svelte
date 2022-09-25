<script>
    export let str;
    export const type = "danger";
</script>

{#if str}
    <div class="alert alert-{type}" role="alert">
        {str}
    </div>
{/if}