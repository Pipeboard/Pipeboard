<?php
    $es = __EXSTRNG__;
    $es = json_decode(base64_decode($es));

    $url = $es->url;

    if($es->envs->has_been_setup !== true) {
        $goto = "setup";
    } else {
        $goto = $url;

        if($goto == "/") {
            $goto = "home";
        }
    } 

    require __DIR__ . '/inc/router.php';
?>