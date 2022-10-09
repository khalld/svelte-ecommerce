<script>
    // export let pages;
    export let arialabel;
    export let addClass;
    
    
</script>

<nav aria-label="{arialabel}" class="d-flex flex-row-reverse bd-highlight">
    <ul class="pagination pagination-md {addClass} ">
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