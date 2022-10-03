<script>
    export let str;
    export let type = "danger";
</script>

{#if str}
    <div class="alert alert-{type} mt-3 text-center" role="alert">
        {str}
    </div>
{/if}