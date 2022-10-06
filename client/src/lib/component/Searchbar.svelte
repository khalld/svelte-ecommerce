<script>
    export let placeholder;
    export let value;
    export let isSearching;
    // let isFocused = null;
    // let inputValue = "";


    const inputHandler = event => {
        value = event.target.value;
        isSearching = true;
    };

    const blurHandler = event => {
        // isFocused = false;
        // inputValue = "";
        value = ""
        isSearching = false;
    };

</script>

<div class="input-group flex-nowrap mb-5">
    <span class="input-group-text" id="addon-wrapping"><i class="fas fa-search"></i></span>
    <input type="text" class="form-control" placeholder={placeholder} aria-describedby="addon-wrapping"
        bind:value
        on:input={inputHandler}
        on:blur={blurHandler} />
</div>