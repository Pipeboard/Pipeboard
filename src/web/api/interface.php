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

echo json_encode(Array(
  "status" => "ok",
  "event" => $namespace,
  "token" => $token,
  "key" => md5($token) . " : " . md5($namespace)
), JSON_PRETTY_PRINT);

// Worker::runAll();

?>