<script>
    import InfoPanelAdmin from "../../../../../lib/component/InfoPanelAdmin.svelte";
    import InfoPanelAdminHeader from "../../../../../lib/component/InfoPanelAdminHeader.svelte";
    import VertInput from "../../../../../lib/component/VertInput.svelte";  
    
    export let data;
</script>

<InfoPanelAdmin>
    <InfoPanelAdminHeader text="Detail of {data.user._id}" />
    <VertInput />
    <VertInput />

</InfoPanelAdmin>