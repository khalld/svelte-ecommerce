<script>
    export let order;
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
                                <span class="me-3">22-11-2021</span>
                                <span class="me-3">#16123222</span>
                                <span class="me-3">Visa -1234</span>
                                <span class="badge rounded-pill bg-info">SHIPPING</span>
                                </div>
                                <div class="d-flex">
                                <button class="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text"><i class="bi bi-download"></i> <span class="text">Invoice</span></button>
                                <div class="dropdown">
                                    <button class="btn btn-link p-0 text-muted" type="button" data-bs-toggle="dropdown">
                                    <i class="bi bi-three-dots-vertical"></i>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                    <li><a class="dropdown-item" href="#"><i class="bi bi-pencil"></i> Edit</a></li>
                                    <li><a class="dropdown-item" href="#"><i class="bi bi-printer"></i> Print</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <table class="table table-borderless">
                            <tbody>
                            {#each order.products as prod}
                                <tr>
                                    <td>
                                    <div class="d-flex mb-2">
                                        <div class="flex-shrink-0">
                                        <img src="https://via.placeholder.com/280x280/87CEFA/000000" alt="" width="35" class="img-fluid">
                                        </div>
                                        <div class="flex-lg-grow-1 ms-3">
                                        <h6 class="small mb-0"><a href="/products/{prod._id}" class="text-reset">{prod.name}</a></h6>
                                        <!-- <span class="small">Color: Black</span> -->
                                        </div>
                                    </div>
                                    </td>
                                    <td>{prod.quantity}</td>
                                    <td class="text-end">{prod.price * prod.quantity} €</td>
                                </tr>
                            {/each}
                            </tbody>
                            <tfoot>
                                <!-- TODO: add shipping cost -->
                            <!-- <tr>
                                <td colspan="2">Subtotal</td>
                                <td class="text-end">$159,98</td>
                            </tr>
                            <tr>
                                <td colspan="2">Shipping</td>
                                <td class="text-end">$20.00</td>
                            </tr> -->
                            <!-- TODO: add in v2 -->
                            <!-- <tr>
                                <td colspan="2">Discount (Code: NEWYEAR)</td>
                                <td class="text-danger text-end">-$10.00</td>
                            </tr> -->
                            <tr class="fw-bold">
                                <td colspan="2">TOTAL</td>
                                <td class="text-end">{order.amount} €</td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <!-- Payment -->
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <h3 class="h6">Payment Method</h3>
                                <p>Visa -1234 <br>
                                Total: $169,98 <span class="badge bg-success rounded-pill">PAID</span></p>
                                </div>
                                <div class="col-lg-6">
                                <h3 class="h6">Billing address</h3>
                                <address>
                                    <strong>John Doe</strong><br>
                                    1355 Market St, Suite 900<br>
                                    San Francisco, CA 94103<br>
                                    <abbr title="Phone">P:</abbr> (123) 456-7890
                                </address>
                            </div>
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

                        {#if order.tracking.id != null}
                            <strong>FedEx</strong>
                            <span><a href="#" class="text-decoration-underline" target="_blank">FF1234567890</a> <i class="bi bi-box-arrow-up-right"></i> </span>
                        {:else}
                        <strong>Your order is still being processed</strong>
                        {/if}
                            <hr>
                            <h3 class="h6">Address</h3>
                            <address>
                                <strong>{order.customer.name} {order.customer.surname}</strong><br>
                                {order.address.address} {#if order.address.address2 != null}
                                , {order.address.address2}{/if}<br>
                                {order.address.country}, {order.address.region}, {order.address.city} {order.address.zip}<br>
                                <abbr title="Phone">Phone:</abbr> {order.customer.phone}
                            </address>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
