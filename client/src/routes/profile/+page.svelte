<script>
    import userStore from '../../lib/store/userStore.js';
    export let data;

</script>


<div class="container">


    <form>
        <h1 class="h3 mb-3 fw-normal">Profile page</h1>
    
        <div class="form-floating">
            <input type="text" class="form-control" id="name" placeholder="Name" bind:value={data.user.name}>
            <label for="name">Name</label>
        </div>

        <div class="form-floating mt-2">
            <input type="text" class="form-control" id="surname" placeholder="Surname" bind:value={data.user.surname}>
            <label for="surname">Surname</label>
        </div>

        <div class="form-floating mt-2">
            <input type="email" class="form-control" id="email" placeholder="Email" bind:value={data.user.email}>
            <label for="email">Email address</label>
        </div>

        <div class="form-floating mt-2">
            <input type="text" class="form-control" id="street" placeholder="street" bind:value={data.user.address.street}>
            <label for="street">Street Address</label>
        </div>
    
        <div class="form-floating mt-2">
            <input type="number" class="form-control" id="zip" placeholder="ZIP" bind:value={data.user.address.zip}>
            <label for="zip">ZIP or postal code</label>
        </div>

        <div class="form-floating mt-2">
            <input type="text" class="form-control" id="city" placeholder="City" bind:value={data.user.address.city}>
            <label for="city">City</label>
        </div>

        <div class="form-floating mt-2 mb-2">
            <input type="text" class="form-control" id="country" placeholder="Country" bind:value={data.user.address.country}>
            <label for="country">Country</label>
        </div>

        <!-- <ErrorComponent str={error} /> -->

        <button class="w-100 btn btn-lg btn-primary" type="submit">Edit</button>
    </form>
</div>
