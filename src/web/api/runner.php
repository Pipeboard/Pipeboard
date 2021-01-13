<?php
$sidstamp = strtoupper(bin2hex(random_bytes(5)));

$envjson0 = base64_decode(__EXSTRNG__);
$envjson = json_decode($envjson0);
$url = $envjson->url;

$filename = __DIR__ . "/tempauthes.json";

$file_handle = fopen($filename, 'r');
$fsize = filesize($filename);
if($fsize == 0) {
  $fsize = 1;
}

$read = fread($file_handle, $fsize);
$cont = json_decode($read);
fclose($file_handle);

$tkn = $envjson->params->tkn;
$tkn2 = md5($tkn);
$namespace = $envjson->params->ns;

if($cont->$tkn2 == md5($namespace)):
?>
<head>
  <title>Restricted API Page</title>
</head>
<body>
<p id="out"></p>
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();

  socket.emit("event", "<?php echo $namespace; ?>?<?php echo $sidstamp; ?>");
  socket.on("event_out", (arg) => {
    let data = JSON.parse(window.atob(arg));
    if(data.sid == '<?php echo $sidstamp; ?>') {
      document.getElementById("out").innerHTML = data.out;
    }
  });
</script>
</body>
<?php
endif;
?>