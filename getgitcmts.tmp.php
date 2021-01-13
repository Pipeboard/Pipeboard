<?php
$cont = json_decode(file_get_contents("./gitresp.json"));
foreach($cont->commits as $com) {
    print_r(explode("\n", $com->commit->message)[0] . "<br>\n");
}
?>