<?php
user_utility::i()->islogin(true);
?>
<div class="row">
  <div class="col-md-3 col-sm-3">
    <select name="sort" class="filter" data-key="sort" style="display: none;">
      <option value="newest" selected="">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="popular">Popular</option>
    </select>
  </div>
  <div class="col-md-4 col-sm-4">
    <div class="btn-group btn-group-sm">
      <a href="#" class="btn btn-outline-primary" id="selectall">Select All</a>
      <a href="#" class="btn btn-outline-danger" id="deleteall">Delete All</a>
    </div>
  </div>
</div>
<table id="urls-table" class="table urls-table table-striped table-bordered table-advance table-hover">
  <thead>
    <tr>
      <th></th>
      <th class="hidden-xs">Link</th>
      <th>Short link</th>
      <th>Clicks</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <?php foreach ($lists as $l) { ?>
    <tr>
      <td>
        <input type="checkbox" name="delete-id[]" value="idD5H">
      </td>
      <td class="hidden-xs">
        <img src="<?=$l->site_img; ?>" alt="Favicon">
        <a href="<?=$l->location; ?>" target="_blank"><?=base64_decode($l->site_title) . ' - ' . parse_url($l->location)['host']; ?></a>
      </td>
      <td>
        <a href="http://short.io/idD5H" target="_blank">
          <span class="url-first-part">http://short.io</span>/<span class="url-last-part">idD5H</span>
        </a>
      </td>
      <td class="center">
        <a href="http://short.io/idD5H+" target="_blank" class="link-clickz">0</a>
      </td>
      <td class="center">

      </td>
    </tr><!-- /.url-list -->
    <?php } ?>
  </tbody>
</table>

<?=$core->precom($lists);
