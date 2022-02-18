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
      text-align: center;
    }
  </style>
</head>

<body>

  <main>
    <form action="?ok" method="post" class="form-horizontal">
      <input type="hidden" name="add" value="<?= $session ?>">
      <div class="row">
        <div class="form-group row col-md-12 mb-2">
          <label for="DishName" class="col-2 col-form-label">Dish Name</label>
          <div class="col-10">
            <input type="text" name="dish-name" id="DishName" class="form-control">
          </div>
        </div>

        <div class="form-group row col-md-12 mb-2">
          <label for="Ingredients" class="col-2 col-form-label">Ingredients</label>
          <div class="col-10">
            <textarea name="material" id="Ingredients" cols="10" rows="10" class="form-control" required>-</textarea>
          </div>
        </div>

        <div class="form-group row col-md-12 mb-2">
          <label for="Buffs" class="col-2 col-form-label">Buffs</label>
          <div class="col-10">
            <textarea type="text" id="Buffs" name="buffs" cols="10" rows="10" class="form-control" placeholder="Food buffs" required>-</textarea>
          </div>
        </div>

        <div class="form-group row col-md-12 mb-2">
          <label for="Facility" class="col-2 col-form-label">Facility</label>
          <div class="col-10">
            <select class="form-control" id="Facility" name="facility">
              <option value="stove-i">Stove I</option>
              <option value="stove-ii">Stove II</option>
              <option value="mixer">Mixer</option>
              <option value="camp-i">Camp I</option>
              <option value="camp-ii">Camp II</option>
              <option value="-">Others</option>
            </select>
          </div>
        </div>

        <div class="form-group row col-md-12 mb-2">
          <label class="col-2 col-form-label">Grade</label>
          <div class="col-10">
            <label class="custom-control custom-radio">
              <input id="grade-common" name="grade" type="radio" class="custom-control-input" value="common" required>
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description"><img src="https://cf.shopee.co.id/file/7cffeac9f9326369f87ab3b84ebe2853" alt="" class="img-s"> Common</span>
            </label>
            <label class="custom-control custom-radio">
              <input id="grade-rare" name="grade" type="radio" class="custom-control-input" value="rare" required>
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description"><img src="https://media-cdn.tripadvisor.com/media/photo-s/13/81/eb/d7/indigo-blue.jpg" alt="" class="img-s"> Rare</span>
            </label>
            <label class="custom-control custom-radio">
              <input id="grade-epic" name="grade" type="radio" class="custom-control-input" value="epic" required>
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Purplecom.jpg/200px-Purplecom.jpg" alt="" class="img-s"> Epic</span>
            </label>
            <label class="custom-control custom-radio">
              <input id="grade-legendary" name="grade" type="radio" class="custom-control-input" value="legendary" required>
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description"><img src="https://htmlcolorcodes.com/assets/images/colors/golden-yellow-color-solid-background-1920x1080.png" alt="" class="img-s"> Legendary</span>
            </label>
            <label class="custom-control custom-radio">
              <input id="grade-ultimate" name="grade" type="radio" class="custom-control-input" value="ultimate" required>
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description"><img src="https://png.pngtree.com/thumb_back/fw800/background/20200821/pngtree-simple-dark-red-solid-color-wallpaper-image_396557.jpg" alt="" class="img-s"> Ultimate</span>
            </label>
          </div>
        </div>

        <div class="text-center col-md-12">
          <button type="submit" class="btn btn-block btn-primary mb-2">Confirm recipe</button>
        </div>
      </div>
    </form>
  </main>

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