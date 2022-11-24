<script>
    import InfoPanelAdmin from "../../../../../lib/component/InfoPanelAdmin.svelte";
    import InfoPanelHeader from "../../../../../lib/component/InfoPanelHeader.svelte";
    import InfoPanel from "../../../../../lib/component/InfoPanel.svelte";
    import Input from "../../../../../lib/component/Input.svelte";
    import Checkbox from "../../../../../lib/component/Checkbox.svelte";
    import Modal from '../../../../../lib/component/Modal.svelte';
    import env from "../../../../../lib/store/env.js";
    import { getNotificationsContext } from 'svelte-notifications';
    const { addNotification } = getNotificationsContext();

    export let data;

    let currImg;

    let imagesName = []; // array dei soli path
    let imagesBlob = [];
    let imgAreloaded = false;

    $: getImages()

	const onFileSelected =(e)=>{
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            currImg = e.target.result
        };
    }

	async function submit() {

        try {
            if (data.product.name == undefined || data.product.code == undefined || data.product.description == undefined || data.product.longDescription == undefined || data.product.quantity == undefined || data.product.price == undefined ){
                throw new Error('All fields are mandatory')
            }
            
            await fetch(`${env.host}/products/${data.product._id}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data.product)
            }).then(res => {
                if (res.status == 400){
                    throw new Error('Something wrong happened')
                }
                if (res.status == 404){
                    throw new Error('Product not exist')
                }
                return res.json();
            })
            .then(() => {
                addNotification({ text: 'Product edited', type: 'success', position: 'bottom-right', removeAfter: 6000 })
            })
            .catch(err => addNotification({ text: err.message, type: 'error', position: 'bottom-right', removeAfter: 6000 }))
            
        } catch (e){
            addNotification({ text: e.message, type: 'error', position: 'bottom-right', removeAfter: 6000 })
        }

	}

    async function uploadSingleImage() {
        try {
            const toSend = {}
            const imgData = currImg.split(',');
            toSend["image"] = imgData[1];
    
            await fetch(`${env.host}/images/upload/${data.product._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(toSend)
            })
            .then(res =>  res.json())
            .then(() => {
                addNotification({ text: 'Image uploaded', type: 'success', position: 'bottom-right', removeAfter: 6000 })
                getImages()
            })
            .catch(err => addNotification({ text: err.message, type: 'error', position: 'bottom-right', removeAfter: 6000 }))

        } catch (e){
            console.error(e)
        }
    }

    async function getImages(){
        imgAreloaded = false;
        imagesName = [];
        imagesBlob = [];
        await fetch(`${env.host}/images/list/${data.product._id}`)
        .then(res => {
            if (res.status == 500){
                throw new Error('Something wrong happened')
            }
            return res.json();
        })
        .then(data => {
            imagesName = data.images;
        })
        .catch(err => console.error(err))

        for (let i = 0; i < imagesName.length; i++){

            await fetch(`${env.host}/images/info`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    prodId: data.product._id,
                    name: imagesName[i]
                })
            })
            .then(res => res.blob())
            .then(imageBlob => {
                // Then create a local URL for that image and print it 
                // const imageObjectURL = URL.createObjectURL(imageBlob);
                imagesBlob.push(URL.createObjectURL(imageBlob))
            })
            .catch(err => console.error(err))
        }
        imgAreloaded = true;
    }

    async function deleteImage(index){
        try {

            await fetch(`${env.host}/images/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prodId: data.product._id,
                    imagename: imagesName[index]
                })
            })
            .then(res => {
                if (res.status == 200){
                    addNotification({ text: 'Image deleted', type: 'success', position: 'bottom-right', removeAfter: 6000 })
                    getImages()
                } else {
                    throw new Error('Something wrong happened')
                }
            })
            .catch(err => console.error(err))
            
        } catch (e) {
            addNotification({ text: e.message, type: 'error', position: 'bottom-right', removeAfter: 6000 })
        }

    }

</script>

<InfoPanelAdmin on:click={submit}>
    <InfoPanelHeader text="Detail of product" />

    <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12">
            <Input labelAlign="horizontal"  id="name" label="Name" bind:value={data.product.name} type="text" />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
            <Input labelAlign="horizontal"  id="code" label="Code" bind:value={data.product.code} type="text" />
        </div>
    </div>

    <Checkbox id="enabled" bind:value={data.product.enabled} label="Enabled" />

    <Input id="description" label="Description" bind:value={data.product.description} type="textarea" />

    <Input id="long-description" label="Long description" bind:value={data.product.longDescription} type="textarea" />

    <div class="mb-3 mt-2 row">
        <div class="col-3">
            <Input id="quantity" label="Quantity" bind:value={data.product.quantity} type="number" />
        </div>
        <div class="col-3">
            <Input id="price" label="Price" bind:value={data.product.price} type="number" />
        </div>
    </div>

</InfoPanelAdmin>

<InfoPanel>
    <InfoPanelHeader text="Upload images" />
    <div class="row my-3">
        <div class="col-10">
            <input class="form-control" type="file" id="imageUpload" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={currImg} >  
        </div>
        <div class="col-2 d-grid">
            <button class="btn btn-success btn-block" type="button" on:click={() => uploadSingleImage()} >Upload</button>
        </div>
    </div>

    {#if imgAreloaded == true}
        {#each imagesBlob as im, idx}
            {#if idx == 0}
                <InfoPanelHeader text="Main picture"/>
            {:else if idx == 1}
                <InfoPanelHeader text="Detail pictures"/>
            {/if}

            <div class="wrapper mt-2">
                <div class="content">
                    <img src="{im}" class="border border-secondary img-fluid mb-2" alt="alt-{im}" >
                    <!-- <img src="{im}" class="w-25 m-2 tb-sel border border-secondary" alt="alt-{idx}"  aria-hidden="true" data-bs-target="#deleteModal-{idx}" data-bs-toggle="modal" /> -->
                    <i class="fa-solid fa-x fa-lg text-danger tb-sel"  alt="alt-{idx}"  aria-hidden="true" data-bs-target="#deleteModal-{idx}" data-bs-toggle="modal"></i>
                    <Modal id="deleteModal-{idx}" labeledby="modal-label-{idx}" on:click={() => deleteImage(idx)} title="Delete image" body="Are you sure that you want to delete the selected image?"/>
                </div>
            </div>
        <!-- <img src="{im}" class="w-25 m-2 tb-sel border border-secondary" /> -->
        {/each}
    {/if}
</InfoPanel>


<style>
    .wrapper { 
        display: flex;
        justify-content: center;
    }    
    .content { 
        position: relative;
        width: max-content
    }
    .content img { display: block; }
    .content .fa-x { position: absolute; bottom:25px; right:10px; }
</style>