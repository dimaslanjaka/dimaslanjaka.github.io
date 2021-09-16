<?php
$json = ['UNITED48' => 0, 'ALLIANCE48' => 0];
$ip = [];
$ipfile = __DIR__ . '/vote-ip.json';
$jsonfile = __DIR__ . '/vote.json';
if (file_exists($jsonfile)) {
  $json = json_decode(file_get_contents($jsonfile), true);
}
if (file_exists($ipfile)) {
  $ip = json_decode(file_get_contents($ipfile), true);
}

if (isset($_POST['guildname']) && !empty($_POST['guildname']) && !isset($_COOKIE['done']) && !in_array(getIpAddress(), $ip)) {
  //header('content-type: application/json');
  $json[$_POST['guildname']]++;
  file_put_contents($jsonfile, json_encode($json));
  $_COOKIE['done'] = getIpAddress();
  $ip[] = getIpAddress();
  file_put_contents($ipfile, json_encode($ip));
}

/**
 * Gets IP address.
 */
function getIpAddress()
{
  $ipAddress = '';
  if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    // to get shared ISP IP address
    $ipAddress = $_SERVER['HTTP_CLIENT_IP'];
  } else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    // check for IPs passing through proxy servers
    // check if multiple IP addresses are set and take the first one
    $ipAddressList = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
    foreach ($ipAddressList as $ip) {
      if (!empty($ip)) {
        // if you prefer, you can check for valid IP address here
        $ipAddress = $ip;
        break;
      }
    }
  } else if (!empty($_SERVER['HTTP_X_FORWARDED'])) {
    $ipAddress = $_SERVER['HTTP_X_FORWARDED'];
  } else if (!empty($_SERVER['HTTP_X_CLUSTER_CLIENT_IP'])) {
    $ipAddress = $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
  } else if (!empty($_SERVER['HTTP_FORWARDED_FOR'])) {
    $ipAddress = $_SERVER['HTTP_FORWARDED_FOR'];
  } else if (!empty($_SERVER['HTTP_FORWARDED'])) {
    $ipAddress = $_SERVER['HTTP_FORWARDED'];
  } else if (!empty($_SERVER['REMOTE_ADDR'])) {
    $ipAddress = $_SERVER['REMOTE_ADDR'];
  }
  return $ipAddress;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Guild Name Change</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet">
  <style>
    * {
      word-wrap: break-word;
    }

    @media screen and (max-width:576px) {
      .btn-group {
        display: flex;
        flex-direction: column;
      }
    }
  </style>
</head>

<body>

  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="jumbotron m-5">
          <div class="text-center">Vote closed</div>
          <div class="text-center mb-2 d-none">
            please vote for the guild name for INDO1945 which is good for all players in s48 <br>
            User Hash: <?= md5(getIpAddress()) ?> <br>
            Choose One Below.
          </div>
          <form action="?vote" method="post" class="d-none">
            <input type="hidden" name="vote" value="i">

            <div class="row">
              <div class="col-md-4">
                <div class="btn-group" data-toggle="buttons">
                  <label class="btn btn-danger">
                    <input type="radio" name='guildname' value="UNITED48" required> <span> UNITED48</span>
                  </label>
                  <label class="btn btn-primary">
                    <input type="radio" name='guildname' value="ALLIANCE48" required> <span> ALLIANCE48</span>
                  </label>
                </div>
              </div>

              <div class="col-md-8">
                <div>
                  <button type="submit" class="btn-warning btn btn-block" disabled>Submit Vote</button>
                </div>
              </div>
            </div>

          </form>

          <div class="mt-2">
            This Short url : <a href="http://bit.ly/INDO1945-NAMEVOTE">http://bit.ly/INDO1945-NAMEVOTE</a>
            <pre><code><?= json_encode($json, JSON_PRETTY_PRINT) ?></code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>

</html>