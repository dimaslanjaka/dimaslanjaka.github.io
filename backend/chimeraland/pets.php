<?php
session_start();
header("Access-Control-Allow-Origin: *");

$file = __DIR__ . '/pets.json';
$read = json_decode(file_get_contents($file));

if (isset($_REQUEST['json'])) {
  header('content-type: application/json');
  exit(json_encode($read));
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
      <form action="?ok" method="post" class="form-horizontal">
        <input type="hidden" name="add" value="<?= $session ?>">
        <div class="row">
          <div class="form-group row col-md-12 mb-2">
            <label for="BeastName" class="col-2 col-form-label">Beast Name</label>
            <div class="col-10">
              <input type="text" name="dish-name" id="BeastName" class="form-control" placeholder="Insert Animal Name" required>
            </div>
          </div>

          <div class="form-group row col-md-12 mb-2">
            <label for="Ingredients" class="col-2 col-form-label">Quality</label>
            <div class="col-10">
              <div class="form-group row col mb-2">
                <label for="Atk" class="col-1 col-form-label">ATK</label>
                <div class="col-2">
                  <input type="number" name="atk" id="Atk" class="form-control" required>
                </div>
              </div>
              <div class="form-group row col mb-2">
                <label for="Hp" class="col-1 col-form-label">HP</label>
                <div class="col-2">
                  <input type="number" name="hp" id="Hp" class="form-control" required>
                </div>
              </div>
              <div class="form-group row col mb-2">
                <label for="Def" class="col-1 col-form-label">DEF</label>
                <div class="col-2">
                  <input type="number" name="def" id="Def" class="form-control" required>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group row col-md-12 mb-2">
            <label for="Buffs" class="col-2 col-form-label">Skill Attributes</label>
            <div class="col-10">
              <textarea type="text" id="Buffs" name="buffs" cols="10" rows="10" class="form-control" placeholder="Pet Attributes" required></textarea>
              <small class="form-text text-muted">Must Be Separated by line</small>
            </div>
          </div>

          <div class="text-center col-md-12 p-2">
            <button type="submit" class="btn btn-block btn-primary mb-2">Confirm recipe</button>
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
  </script>

</body>

</html>