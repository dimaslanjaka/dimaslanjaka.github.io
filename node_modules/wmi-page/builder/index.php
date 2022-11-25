<?php
include __DIR__ . '/func.php';
include __DIR__ . '/constant.php';

$req = str_replace('/page/builder/', '', $_SERVER['REQUEST_URI']);
//exit(var_dump(preg_match('/^build/s', $req), $req, Url()));
if (preg_match('/^build/s', $req)) {
  indexBuild();
} else if (preg_match('/^view/s', $req)) {
  indexView();
} else {
  indexList();
}


function indexView()
{
  global $head;
  try {
    $file = '/' . $_REQUEST['path'];
    if (!file_exists($file)) {
      $file = preg_replace('/\/\//m', '/', '/files/' . $file);
    }
    $xf = file_get_contents(__DIR__ . $file);
    $xf = buildMeta($xf);
    ob_clean();
    ob_start();
    include __DIR__ . '/head.php';
    include __DIR__ . '/body.php';
    echo $xf;
    include __DIR__ . '/foot.php';
    $c = ob_get_contents();
    ob_clean();
    echo $c;
  } catch (\Throwable $th) {
    echo 'files you need is inaccessible, try contact admin at +6285655667573';
  }
}

function buildMeta($xf)
{
  global $head;
  if (preg_match('/\%title\:(.*)\%/m', $xf, $t)) {
    if (isset($t[1])) {
      if (empty($t[1])) {
        $t[1] = 'Your title is empty';
      }
      $head['title'] = $t[1];
      $xf = str_replace($t[0], '', $xf);
    }
  }
  if (preg_match('/\%desc\:(.*)\%/m', $xf, $t)) {
    if (isset($t[1])) {
      if (empty($t[1])) {
        $t[1] = 'Your description is empty';
      }
      $head['desc'] = $t[1];
      $xf = str_replace($t[0], '', $xf);
    }
  }
  if (preg_match('/\%image\:(.*)\%/m', $xf, $t)) {
    if (isset($t[1])) {
      if (empty($t[1])) {
        $t[1] = 'https://1.bp.blogspot.com/-rkXCUBbNXyw/XfY0hwoFu5I/AAAAAAAAAhw/BUyeKW5BtMoIJLlPUcPSdqGZBQRncXjDQCK4BGAYYCw/s600/PicsArt_09-09-12.12.25.jpg';
      }
      $head['image'] = $t[1];
      $xf = str_replace($t[0], '', $xf);
    }
  }
  if (preg_match('/\%published\:(.*)\%/m', $xf, $t)) {
    if (isset($t[1])) {
      if (empty($t[1]) || $t[1] == 'auto' || !check_date($t[1])) {
        $t[1] = date('c');
      }
      $head['published'] = $t[1];
      $xf = str_replace($t[0], '', $xf);
    }
  }
  if (preg_match('/\%modified\:(.*)\%/m', $xf, $t)) {
    if (isset($t[1])) {
      if (empty($t[1]) || $t[1] == 'auto' || !check_date($t[1])) {
        $t[1] = date('c');
      }
      $head['modified'] = $t[1];
      $xf = str_replace($t[0], '', $xf);
    }
  }
  return $xf;
}

function check_date($myDateString)
{
  return (bool) strtotime($myDateString);
}

function indexBuild()
{
?>
  <section>
    <textarea name="" id="" cols="30" rows="10" class="form-control">
    <?php
    ?>
  </textarea>
  </section>
<?php
}

function indexList()
{
  global $head;
  $head['title'] = 'WMI HTML Page Builder';
  $head['desc'] = 'Build HTML page with material bootstrap 4 (MDB) PRO and Font Awesome 5 PRO latest for free';
  include __DIR__ . '/head.php';
  include __DIR__ . '/body.php';
?>
  <section>
    <table class="table">
      <thead>
        <tr>
          <th>Filename</th>
          <th>Size</th>
          <th>Created</th>
          <th>Modified</th>
          <th>Extension</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <?php
        foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator('./files')) as $entry) {
          /**
           * @var SplFileInfo $entry
           */
          if ($entry->isDir() || $entry->getExtension() != 'html') continue;
          $url = preg_replace('/(view|build)$/m', '', Url());
          echo '<tr> <td>' . $entry->getFilename() . '</td>';
          echo '<td>' . formatSizeUnits($entry->getSize()) . '</td>';
          echo '<td>' . date('D, d M Y H:i:s', $entry->getCTime()) . '</td>';
          echo '<td>' . date('D, d M Y H:i:s', $entry->getMTime()) . '</td>';
          echo '<td>' . $entry->getExtension() . '</td>';
          echo '<td><a href="' . $url . 'build?path=' . $entry->getFilename() . '" title="Build ' . $entry->getFilename() . '" class="btn btn-primary">Build</a><a href="' . $url . 'view?path=' . $entry->getFilename() . '" title="Preview ' . $entry->getFilename() . '" class="btn btn-pink"><i class="fas fa-eye"></i></a></td>';
          echo '</tr>';
        }
        ?>
      </tbody>
    </table>
  </section>
<?php
  include __DIR__ . '/foot.php';
}
