<?php
    $es = __EXSTRNG__;
    $es = json_decode(base64_decode($es));

    $url = $es->url;

    if(!isset($es->envs->has_been_setup) || $es->envs->has_been_setup == "false") {
        $goto = "setup";
    } else {
        $goto = $url;

        if($goto == "/") {
            $goto = "home";
        }
    } 

    require __DIR__ . '/inc/router.php';
?>