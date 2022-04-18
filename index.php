<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

$url  = parse_url($_SERVER['REQUEST_URI']);
$file = join_path(__DIR__, 'docs', $url['path']);
if (is_dir($file)) $file = join_path($file, 'index.html');
//var_dump($file, is_file($file), is_dir($file));
if (is_file($file)) {
  $mimetypes = json_decode(file_get_contents(join_path(__DIR__, 'src', 'curl', 'mimes.json')), true);
  $ext = strtolower(substr($file, strrpos($file, '.') + 1, strlen($file)));
  if (array_key_exists($ext, $mimetypes)) {
    $mime_type = $mimetypes[$ext];
  } else {
    //$mime_type = mime_content_type($file);
    exit('mime type not found');
  }

  header('Content-type: ' . $mime_type);
  header('Content-Length: ' . filesize($file));
  readfile_chunked($file);
} else {
  var_dump($file);
}

function readfile_chunked($filename, $retbytes = true)
{
  $chunksize = 1 * (1024 * 1024); // how many bytes per chunk
  $buffer = '';
  $cnt = 0;
  // $handle = fopen($filename, 'rb');
  $handle = fopen($filename, 'rb');
  if ($handle === false) {
    return false;
  }
  while (!feof($handle)) {
    $buffer = fread($handle, $chunksize);
    echo $buffer;
    if ($retbytes) {
      $cnt += strlen($buffer);
    }
  }
  $status = fclose($handle);
  if ($retbytes && $status) {
    return $cnt; // return num. bytes delivered like readfile() does.
  }
  return $status;
}

/**
 * Join string into a single URL string.
 *
 * @param string $parts,... The parts of the URL to join.
 * @return string The URL string.
 */
function join_path(...$parts)
{
  $separator = '/'; //DIRECTORY_SEPARATOR
  if (sizeof($parts) === 0) return '';
  $prefix = ($parts[0] === $separator) ? $separator : '';
  $processed = array_filter(array_map(function ($part) use ($separator) {
    return rtrim($part, $separator);
  }, $parts), function ($part) {
    return !empty($part);
  });
  return preg_replace('/\/+/', '/', $prefix . implode($separator, $processed));
}
