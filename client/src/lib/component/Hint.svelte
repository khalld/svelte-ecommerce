<script>
    export let str;
    export const type = "danger";
    export let classes;
</script>

{#if str}
    <div class="alert alert-{type} {classes}" role="alert">
        {str}
    </div>
{/if}