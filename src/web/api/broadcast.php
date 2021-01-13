<?php

$exs = __EXSTRNG__;

$es = json_decode(base64_decode($exs));
print_r($es);

?>
<head>
  <title>/emit - Restricted API Page • Pipeboard</title>
</head>
<body>
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();
  socket.emit("<?php echo $es->title; ?>", '<?php echo $es->data; ?>');
</script>
</body>