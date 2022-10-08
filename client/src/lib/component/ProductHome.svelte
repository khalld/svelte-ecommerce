<script>
    export let p;
</script>

<img src={p.photos[0].src} alt="img-{p.photos[0].id}" class="bd-placeholder-img rounded-circle" width="140" height="140"/>
<!-- <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg> -->
<h2 class="fw-normal">{p.name}</h2>
<p>{p.description}</p>
<p><a class="btn btn-secondary" href="/products/{p._id}">View details &raquo;</a></p>
