<script>
    // export let pages;
    export let arialabel;
    
    
</script>

<nav aria-label="{arialabel}">
    <ul class="pagination pagination-md">
        <li class="page-item disabled">
            <span class="page-link tb-sel" aria-hidden="true">&laquo;</span>
        </li>
        <slot></slot>

        <li class="page-item disabled">
            <span class="page-link tb-sel" aria-hidden="true">&raquo;</span>
        </li>
    </ul>
</nav>

<!-- TODO: usa le classi di bootstrap 5!!! -->