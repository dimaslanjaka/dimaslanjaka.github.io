<?php
$session = uniqid();

if (isset($_POST['add'], $_POST['q'], $_POST['a'])) {
  if (!empty(trim($_POST['q'])) && strlen(trim($_POST['q'])) > 10) {
    header('content-type: application/json');
    $build = trim($_POST['q'] . ' (' . strtoupper($_POST['a']) . ')') . PHP_EOL;
    file_put_contents(__DIR__ . '/quiz.txt', $build, FILE_APPEND);
    header( "Refresh:5; url=https://www.webmanajemen.com/The%20Legend%20Of%20Neverland/Quiz.html", true, 303);
    echo json_encode(['msg' => 'Quiz added']);
    return;
  }
}
?>

<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>QUIZ - The Legend Of Neverland</title>
  <!-- Bootstrap CSS -->
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" rel="stylesheet" />
</head>

<body>

  <main>
    <div class="row m-3">
      <div class="col-md-12">
        <form action="?ok" method="post" class="form-horizontal">
          <input type="hidden" name="add" value="<?= $session ?>">
          <div class="row">
            <div class="form-group row col-md-12">
              <label for="firstName" class="col-1 col-form-label">Question</label>
              <div class="col-9">
                <input type="text" name="q" class="form-control" placeholder="Insert a quiz question" required>
              </div>
            </div>

            <div class="form-group row col-md-12">
              <label class="col-1 col-form-label">Answer</label>
              <div class="col-9">
                <label class="custom-control custom-radio">
                  <input id="ao" name="a" type="radio" class="custom-control-input" value="o" required>
                  <span class="custom-control-indicator"></span>
                  <span class="custom-control-description">(O)</span>
                </label>
                <label class="custom-control custom-radio">
                  <input id="ax" name="a" type="radio" class="custom-control-input" value="x" required>
                  <span class="custom-control-indicator"></span>
                  <span class="custom-control-description">(X)</span>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>

  <!-- Option 1: jQuery and Bootstrap Bundle (includes Popper) -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
  <script>
    var forms = document.querySelectorAll("form");
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        function(e) {
          var buttons = this.querySelectorAll('[type="submit"]');
          buttons.forEach(function(button) {
            button.setAttribute("disabled", "disabled");
          });
        },
        false
      );
    });
  </script>

</body>

</html>