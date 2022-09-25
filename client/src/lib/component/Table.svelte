<script>
    export let headers = [];
</script>

<div class="table-responsive mt-2">
    <table class="table table-striped table-sm">
        <thead>
            <tr>
                {#each headers as h }
                    <th scope="col">{h}</th>
                {/each}
            </tr>
        </thead>
        <tbody>

            <slot></slot>

        </tbody>
    </table>
</div>