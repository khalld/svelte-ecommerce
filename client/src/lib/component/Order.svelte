<script>
    import convertData from "../js/formatDate";
    export let order;

    let total = order.amount + order.shipment.price;

</script>

<div class="container-fluid">

    <div class="container">
        <!-- Title -->
        <div class="d-flex justify-content-between align-items-center py-3">
            <h2 class="h5 mb-0"><a href="#" class="text-muted"></a> Order #{order.code}</h2>
        </div>
        
        <!-- Main content -->
        <div class="row">
            <div class="col-lg-8">
            <!-- Details -->
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="mb-3 d-flex justify-content-between">
                            <div>
                                <span class="fw-bold">Order date: </span><span class="me-3">{convertData(order.data)}</span>
                                <!-- <span class="me-3">#16123222</span>
                                <span class="me-3">Visa -1234</span> -->
                                
                                <span class="fw-bold">Order status: </span>
                                {#if order.status == "PENDING"}
                                    <span class="badge bg-warning rounded-pill">PENDING</span>
                                {:else if order.status == "REJECTED"}
                                    <span class="badge bg-danger rounded-pill">REJECTED</span>
                                {:else if order.status == "SHIPPED"}
                                    <span class="badge bg-info rounded-pill">SHIPPED</span>
                                {:else if order.status == "DELIVERED"}
                                    <span class="badge bg-success rounded-pill">DELIVERED</span>
                                {:else if order.status == "RETURNED"}
                                    <span class="badge bg-danger rounded-pill">RETURNED</span>
                                {/if}


                            </div>
                        </div>

                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <th>Products</th>
                                    <th>Quantity</th>
                                    <th class="text-end">Total price</th>
                                </tr>
                                {#each order.products as prod}
                                <tr>
                                    <td>
                                        <div class="d-flex mb-2">
                                            <div class="flex-shrink-0">
                                            <img src="https://via.placeholder.com/280x280/87CEFA/000000" alt="" width="35" class="img-fluid">
                                            </div>
                                            <div class="flex-lg-grow-1 ms-3">
                                            <h6 class="small mb-0"><a href="/products/{prod._id}" class="text-reset">{prod.name}</a></h6>
                                            <span class="small">{prod.code}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{prod.quantity}</td>
                                    <td class="text-end">{prod.price * prod.quantity} €</td>
                                </tr>
                                {/each}
                                <tr>
                                    <td>{order.shipment.code} (shipment)</td>
                                    <td></td>
                                    <td class="text-end">{order.shipment.price} €</td>
                                </tr>
                            </tbody>
                            <tfoot>
                            <!-- TODO: add in v2 -->
                            <!-- <tr>
                                <td colspan="2">Discount (Code: NEWYEAR)</td>
                                <td class="text-danger text-end">-$10.00</td>
                            </tr> -->
                            <tr class="fw-bold">
                                <td colspan="2">TOTAL</td>
                                <td class="text-end">{total} €</td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <!-- Payment -->
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="row d-flex justify-content-center">
                            <span class="fw-bold mb-1">Shipping information</span>
                            <div class="col-6">
                                <span class="fw-bold">{order.customer.name} {order.customer.surname}</span> <br>
                                Phone: {order.customer.phone} <br>
                            </div>
                            <div class="col-6">
                                {order.address.country}, {order.address.region}<br>
                                {order.address.city}, {order.address.zip}<br>
                                {order.address.address} {#if order.address.address2 != null}, {order.address.address2}{/if}
                            </div>
                            <!-- <div class="col-lg-6">
                                <h3 class="h6">Payment Method</h3>
                                <p>Visa -1234 <br>
                                Total: $169,98 <span class="badge bg-success rounded-pill">PAID</span></p>
                            </div>
                            <div class="col-lg-6">
                                <h3 class="h6">Billing address</h3>
                                <strong>John Doe</strong><br>
                                1355 Market St, Suite 900<br>
                                San Francisco, CA 94103<br>
                                <abbr title="Phone">P:</abbr> (123) 456-7890
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <!-- Customer Notes -->
                <div class="card mb-4">
                    <div class="card-body">
                    <h3 class="h6">Customer Notes</h3>
                    {#if order.notes != null}
                        <p>{order.notes}</p>
                    {:else}
                        <p>No additional information</p>
                    {/if}
                    </div>
                </div>
                <div class="card mb-4">
                    <!-- Shipping information -->
                    <div class="card-body">
                        <h3 class="h6">Shipping Information</h3>

                        {#if order.shipment.trackingId != null}
                            <strong>{order.shipment.code}</strong><br>
                            <span class="text-decoration-underline text-primary">{order.shipment.trackingId} <i class="bi bi-box-arrow-up-right"></i> </span>
                        {:else}
                            <strong>Your order is still being processed</strong>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
