<?php
$envjson0 = base64_decode(__EXSTRNG__);
$envjson = json_decode($envjson0);
$url = $envjson->url;

$token = $envjson->params->token;
if(strpos($envjson->url, "?") !== false) {
  $namespace = explode("?", $envjson->url)[0];
  $namespace = substr($namespace, 1);
} else {
  $namespace = $envjson->url;
  $namespace = substr($namespace, 1);
}

$filename = __DIR__ . "/tempauthes.json";

$file_handle = fopen($filename, 'r+');
$fsize = filesize($filename);
if($fsize == 0) {
  $fsize = 1;
}

$read = fread($file_handle, $fsize);
$cont = json_decode($read);
$tkn = $token;
$tkn2 = md5($token);
$cont->$tkn2 = md5($namespace);
$cont = json_encode($cont, JSON_PRETTY_PRINT);
fwrite(fopen($filename, 'w+'), $cont);
fclose($file_handle);

$url = 'http://localhost:81/run?ns=' . urlencode($namespace) . '&tkn=' . urlencode($tkn);



echo json_encode(Array(
  "status" => "ok",
  "event" => $namespace,
  "token" => $token,
  "key" => md5($token) . " : " . md5($namespace)
), JSON_PRETTY_PRINT);
?>