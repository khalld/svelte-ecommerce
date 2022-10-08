<script>
    import InfoPanel from "../../../lib/component/InfoPanel.svelte";
    import InfoPanelHeader from "../../../lib/component/InfoPanelHeader.svelte";
    import Input from "../../../lib/component/Input.svelte";
    import Select from "../../../lib/component/Select.svelte";
    import env from '../../../lib/store/env';
    import Order from "../../../lib/component/Order.svelte";
    export let data;

</script>

<Order order={data.order} />