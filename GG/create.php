<?php

$json = json_decode(file_get_contents(__DIR__ . '/variable.json'), true);

$dofu_mini = $json['duofu'][max(array_keys($json['duofu']))]['mini'];
var_dump($dofu_mini);

$variablesTxt = '';

foreach ($json as $room => $bet) {
  //var_dump($room, $bet);
  $variableName = $room . "_";
  foreach ($bet as $betVal => $betJp) {
    $vname = $variableName . $betVal . "_";
    foreach ($betJp as $key => $value) {
      $vname2 = $vname . $key;
      $variablesTxt .= "local $vname2 = $value" . PHP_EOL;
    }
  }
}

file_put_contents(__DIR__ . '/variable.lua', $variablesTxt);

function create($bet, $jp)
{
  $fn = <<<EOF
gg.clearResults()
gg.searchNumber("$bet", gg.TYPE_AUTO, false, gg.SIGN_EQUAL, 0, -1, 0)
gg.processResume()
-- gg.timeJump("1:1:0")
gg.searchFuzzy("0", gg.SIGN_FUZZY_EQUAL, gg.TYPE_DWORD | gg.TYPE_XOR | gg.TYPE_FLOAT | gg.TYPE_QWORD | gg.TYPE_DOUBLE, 0, -1, 0)
revert = gg.getResults(500, nil, nil, nil, nil, nil, nil, nil, nil)
gg.editAll("$jp", gg.TYPE_DWORD)
EOF;
  return $fn;
}
