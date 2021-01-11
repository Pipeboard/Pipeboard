<?php

$envjson = json_decode(getenv("PIPEBOARD_EXPRESS_API_QUERY"));
$token = $envjson->token;

?>

Establishing connection

<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();

  socket.emit("event", "docker/exec/box/test");
</script>

<?php echo $token; ?>