<script>
    import InfoPanelAdmin from "../../../../../lib/component/InfoPanelAdmin.svelte";
    import InfoPanelHeader from "../../../../../lib/component/InfoPanelHeader.svelte";
    import InfoPanel from "../../../../../lib/component/InfoPanel.svelte";
    import Input from "../../../../../lib/component/Input.svelte";
    import Checkbox from "../../../../../lib/component/Checkbox.svelte";
    import env from "../../../../../lib/store/env.js";
    import { getNotificationsContext } from 'svelte-notifications';
    const { addNotification } = getNotificationsContext();

    export let data;
    let currImg;

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

            if (data.product.photos[0].src.length == 0 ){
                throw new Error('You must insert at least the first picture')
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
                addNotification({ text: 'Product edited', type: 'success', position: 'bottom-right' })
            })
            .catch(err => addNotification({ text: err.message, type: 'error', position: 'bottom-right' }))
            
        } catch (e){
            console.error(e)
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
            .then(() => addNotification({ text: 'Image uploaded', type: 'success', position: 'bottom-right' }))
            .catch(err => addNotification({ text: err.message, type: 'error', position: 'bottom-right' }))

        } catch (e){
            console.error(e)
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


<InfoPanel >
    <InfoPanelHeader text="Upload images" />
    <div class="row my-3">
        <div class="col-8">
            <input class="form-control" type="file" id="imageUpload" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={currImg} >  
        </div>
        <div class="col-4">
            <button class="btn btn-success" type="button" on:click={() => uploadSingleImage()} >Upload</button>
        </div>
    </div>

</InfoPanel>