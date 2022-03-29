<?php
require_once(__DIR__ . '/../vendor/autoload.php');
session_start();
header("Access-Control-Allow-Origin: *");
if (!isset($_SESSION['visitor'])) {
  $new_session = uniqid();
  $_SESSION['visitor'] = $new_session;
};
$session = $_SESSION['visitor'];

$file = __DIR__ . '/pets.json';
$data = json_decode(file_get_contents($file), true);

if (isset($_REQUEST['json'])) {
  header('content-type: application/json');
  exit(json_encode($data, JSON_PRETTY_PRINT));
}

if (isset($_POST['add'])) {
  header('content-type: text/plain');
  $petName = $_POST['pet-name'];
  $attr = array_map(function ($value) {
    return trim($value);
  }, explode("\n", $_POST['attr']));

  $search = $petName;
  $found = array_filter($data['data'], function ($v, $k) use ($search) {
    return $v['name'] == $search;
  }, ARRAY_FILTER_USE_BOTH);

  if (empty($found) && count($attr) >= 1) {
    $data['data'][] = ['name' => ucwords($petName), 'qty' => 'GRADE ' . strtoupper($_POST['grade']) . ' ATK ' . $_POST['atk'] . ' HP ' . $_POST['hp'] . ' DEF ' . $_POST['def'], 'attr' => $attr];
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
    header('Location: ?done');
    $_SESSION['submit'] = 1;
  } else {
    if (!empty($found)) {
      $_SESSION['submit'] = 1;
      header('Location: ?duplicate');
    } else {
      $_SESSION['submit'] = 1;
      header('Location: ?missing');
    }
  }
  exit;
}

?>

<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Pets - Chimeraland</title>
  <!-- Bootstrap CSS -->
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" rel="stylesheet" />
  <style>
    .img-s {
      width: 15px;
      height: 15px;
    }

    label {
      text-align: right;
    }

    body {
      height: 100%;
      width: 100%;
    }

    main {
      width: fit-content;
      text-align: left;
    }
  </style>
</head>

<body>

  <center>
    <main>
      <?php
      if (isset($_SESSION['submit'])) {
        unset($_SESSION['submit']);
        if (isset($_REQUEST['done'])) {
      ?>
          <div class="alert alert-success" role="alert">
            Done Pet Information Added (Reload Page To View Changes).
          </div>
        <?php
        } else if (isset($_REQUEST['duplicate'])) {
        ?>
          <div class="alert alert-danger" role="alert">
            That pet information already added before (duplicated).
          </div>
        <?php
        } else if (isset($_REQUEST['missing'])) {
        ?>
          <div class="alert alert-danger" role="alert">
            Pet attributes information missing (required).
          </div>
      <?php
        }
      }
      ?>
      <form action="?<?= $session ?>" method="post" class="form-horizontal">
        <input type="hidden" name="add" value="<?= $session ?>">
        <div class="row">
          <div class="form-group row col-md-12 mb-2">
            <label for="BeastName" class="col-2 col-form-label">Beast Name</label>
            <div class="col-10">
              <input type="text" name="pet-name" id="BeastName" class="form-control" placeholder="Insert Animal Name" required>
            </div>
          </div>

          <div class="form-group row col-md-12 mb-2">
            <label for="Ingredients" class="col-2 col-form-label">Default Quality</label>
            <div class="col-10">
              <div class="form-group row col mb-2">
                <label for="Grade" class="col-1 col-form-label text-left">Grade</label>
                <div class="col-9">
                  <select name="grade" id="Grade" class="form-control" required no-save>
                    <option value="">Select Default Grade</option>
                    <option value="a">A Noble</option>
                    <option value="b">B Grand</option>
                    <option value="c">C Rare</option>
                    <option value="s">S Illustrious</option>
                  </select>
                </div>
              </div>

              <div class="form-group row col mb-2">
                <label for="Atk" class="col-1 col-form-label text-left">ATK</label>
                <div class="col-9">
                  <input type="number" name="atk" id="Atk" class="form-control" required>
                </div>
              </div>
              <div class="form-group row col mb-2">
                <label for="Hp" class="col-1 col-form-label text-left">HP</label>
                <div class="col-9">
                  <input type="number" name="hp" id="Hp" class="form-control" required>
                </div>
              </div>
              <div class="form-group row col mb-2">
                <label for="Def" class="col-1 col-form-label text-left">DEF</label>
                <div class="col-9">
                  <input type="number" name="def" id="Def" class="form-control" required>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group row col-md-12 mb-2">
            <label for="Attr" class="col-2 col-form-label">Skill Attributes</label>
            <div class="col-10">
              <textarea type="text" no-save="true" id="Attr" name="attr" cols="10" rows="10" class="form-control" placeholder="Pet Attributes" required>Attributes Conversion Rate 4.0%</textarea>
              <small class="form-text text-muted">Must Be Separated by line</small>
            </div>
          </div>

          <div class="text-center col-md-12 p-2">
            <button type="submit" class="btn btn-block btn-primary mb-2">Confirm pet</button>
          </div>
        </div>
      </form>
    </main>
  </center>

  <!-- Option 1: jQuery and Bootstrap Bundle (includes Popper) -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>

  <script src="https://raw.githack.com/dimaslanjaka/smartform/master/dist/release/bundle.js"></script>
  <script>
    (function() {
      formsaver(true);
    })();
    var forms = document.querySelectorAll("form");
Array.from(forms).forEach((form) => {
  form.addEventListener(
    "submit",
    function (e) { 
      var buttons = this.querySelectorAll('[type="submit"]');
      buttons.forEach(function (button) {
        button.setAttribute("disabled", "disabled");
      });
    },
    false
  );
});
  </script>

</body>

</html>