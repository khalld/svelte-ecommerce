<script>
    export let headers = [];
</script>

<div class="table-responsive mt-2">
    <table class="table project-table table-centered table-nowrap">
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