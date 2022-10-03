<script>

    export let id;
    export let pics = [];

    console.log(pics)
</script>

<div id={id} class="carousel slide carousel-fade" data-bs-ride="carousel">
    <div class="carousel-inner">
    {#each pics as pc, idx}
        {#if idx === 0}
            <div class="carousel-item active">
                <img src="{pc.src}" class="d-block img-fluid" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Image: {pc.id}</h5>
                    <p>This is gonna be the pic that will go on card</p>
                </div>
            </div>
        {:else}
            <div class="carousel-item">
                <img src="{pc.src}" class="d-block img-fluid" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Image: {pc.id} </h5>
                    <p>This image will be shown in product detai</p>
                </div>
            </div>
            {/if}
            
            {/each}
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#{id}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#{id}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
</div>