<script>
    import {user} from '../../lib/store/store.js';
</script>


<div class="container">

    <form>
        <h1 class="h3 mb-3 fw-normal">Information</h1>
    
        <div class="form-floating">
            <input type="text" class="form-control" id="name" placeholder="Name" bind:value={$user.name}>
            <label for="name">Name</label>
        </div>

        <div class="form-floating">
            <input type="text" class="form-control" id="surname" placeholder="Name" bind:value={$user.name}>
            <label for="surname">Surname</label>
        </div>

        <div class="form-floating">
            <input type="email" class="form-control" id="email" placeholder="name@example.com" bind:value={$user.email}>
            <label for="email">Email address</label>
        </div>

        <!-- TODO: Change password ! -->


        <div class="form-floating">
            <input type="text" class="form-control" id="address" placeholder="Address" bind:value={$user.name}>
            <label for="surname">Address</label>
        </div>
    
        <button class="w-100 btn btn-lg btn-primary" type="submit">Edit</button>
    </form>
</div>
