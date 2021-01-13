<?php

$es = __EXSTRNG__;

?>
<head>
  <title>Restricted API Page</title>
</head>
<body>
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();

  socket.emit("event_out", '<?php echo $es; ?>');
</script>
</body>