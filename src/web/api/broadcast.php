<?php
$exs = __EXSTRNG__;
$es = json_decode(base64_decode($exs));

$datapack = array(
  "render" => array(
    "pg_title" => "Restricted API Page",
    "pg_baseurl" => "http://localhost/",
    "include_header" => "yes",
    "include_header_buttons" => "no",
    "include_sidebar" => "no",
    "include_footer" => "no",
    "include_page" => "no"
  )
);
require dirname(__DIR__, 1) . "/panel/inc/pages/templates/header.php";
?>
<script src="http://localhost:81/socket.io/socket.io.js"></script>
<script>
  const socket = io();
  socket.emit("<?php echo $es->title; ?>", '<?php echo $es->data; ?>');
</script>
<style>
  .indicator {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 62px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
</style>
<img class="indicator" src="http://localhost/static/image/check.png">
<?php
require dirname(__DIR__, 1) . "/panel/inc/pages/templates/footer.php";
?>