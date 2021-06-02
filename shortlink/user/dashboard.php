<?php
user_utility::i()->islogin(true);
?>

<h2 class="az-content-title tx-24 mg-b-5">Hi, <?=$user->user->data->display_name; ?>!</h2>
<form action="" method="POST" id="short" class="border border-info p-2">
  <div class="row">
    <div class="col-md-12">
      <a href="#" class="az-logo text-uppercase"><span>Short</span>en <span>Link</span></a>
      <div class="input-group mb-3">
        <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"
          placeholder="https://example.com/parameter?query" name="url">
        <input type="hidden" name="user"
          value="<?=$user->user->data->ID; ?>">
        <button type="submit" class="btn">Shorten</button>
      </div>
    </div>
  </div>
  <div class="d-flex">
    <hr class="my-auto flex-grow-1">
    <div class="px-4 font-weight-bold">Page Custom</div>
    <hr class="my-auto flex-grow-1">
  </div>
  <div class="row">
    <div class="col-md-6">
      <label for="">Custom Page Title</label>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            <label class="ckbox">
              <input type="checkbox" data-disabled="pt"><span></span>
            </label>
          </span>
        </div>
        <input type="text" class="form-control" placeholder="Page Title" aria-label="Page Title"
          aria-describedby="basic-addon1" id="pt" name="ptitle" disabled>
      </div>
    </div>
    <div class="col-md-6">
      <label for="">Custom Page Description</label>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            <label class="ckbox">
              <input type="checkbox" data-disabled="pd"><span></span>
            </label>
          </span>
        </div>
        <input type="text" class="form-control" name="pdesc" placeholder="Page Description" aria-label="Page Title"
          aria-describedby="basic-addon1" id="pd" disabled>
      </div>
    </div>
  </div>
  <div class="d-flex">
    <hr class="my-auto flex-grow-1">
    <div class="px-4 font-weight-bold">Filter</div>
    <hr class="my-auto flex-grow-1">
  </div>
  <div class="row">
    <div class="col-md-6" disabled>
      <label for="">Custom Page Referer</label>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            <label class="ckbox">
              <input type="checkbox" data-disabled="pd"><span></span>
            </label>
          </span>
        </div>
        <input type="text" class="form-control" placeholder="Page Referer" aria-label="Page Ref"
          aria-describedby="basic-addon1" id="pd" name="pref" disabled>
      </div>
    </div>
  </div>
  <div class="d-flex">
    <hr class="my-auto flex-grow-1">
    <div class="px-4 font-weight-bold">Customizing</div>
    <hr class="my-auto flex-grow-1">
  </div>
  <div class="row">
    <div class="col-md-12">
      <label for="">HTML Script</label>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            <label class="ckbox">
              <input type="checkbox" data-disabled="ta"><span></span>
            </label>
          </span>
        </div>
        <textarea type="text" class="form-control" placeholder="Advertisement" aria-label="Page Title"
          aria-describedby="basic-addon1" id="ta" name="html" disabled></textarea>
      </div>
    </div>
  </div>
</form>




<div class="modal fade" id="s_result" tabindex="-1" role="dialog" aria-labelledby="shortlink_result" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header border-bottom-0">
        <h5 class="modal-title" id="shortlink_result">Shortlink Successful</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body">
        <div class="border p-2">
          <div class="input-group mb-3">
            <input type="text" class="form-control" id="shorted-url" aria-describedby="basic-addon3"
              placeholder="https://example.com/parameter?query" name="url" onkeydown="vl(this)">
            <button id="copy" class="btn" data-toggle="tooltip" title="COPY URL"><i class="far fa-copy"></i></button>
          </div>
        </div>
      </div>
      <div class="modal-footer border-top-0 d-flex justify-content-center">
        <button class="btn btn-success" data-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
</div>


<div id="snackbar">Notification</div>