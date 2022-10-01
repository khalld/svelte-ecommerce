<script>
    import InfoPanel from "../../../../../lib/component/InfoPanel.svelte";
    import InfoPanelHeader from "../../../../../lib/component/InfoPanelHeader.svelte";
    import VertInput from "../../../../../lib/component/VertInput.svelte";  
    
    export let data;
</script>

<InfoPanel>
    <InfoPanelHeader text="Detail of {data.user._id}" />
    <VertInput />
    <VertInput />

</InfoPanel>