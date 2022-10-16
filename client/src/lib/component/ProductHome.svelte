<script>
    export let p;
</script>


<div class="card-body">
    <img src={p.photos[0]} alt="img-{p.photos[0].id}" class="bd-placeholder-img rounded-circle" width="140" height="140"/>
    <h2 class="fw-normal">{p.name}</h2>
    <p>{p.description}</p>
    <div class="card-footer">
        <p><a class="btn btn-secondary" href="/products/{p._id}">View details &raquo;</a></p>            
    </div>
</div>

