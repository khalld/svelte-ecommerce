<script>
  export let id;
  export let labeledby;
  export let title = "Default title";
  export let body = "Default body";

</script>

<div class="modal fade" id={id} tabindex="-1" aria-labelledby={labeledby} aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{title}</h5>
        <i class="fa-solid fa-xmark fa-xl tb-sel" data-bs-dismiss="modal" aria-label="Close"></i>
      </div>
      <div class="modal-body">
        {body}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary bg-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary bg-primary" data-bs-dismiss="modal" on:click>Save</button>
      </div>
    </div>
  </div>
</div>