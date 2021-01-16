<?php

$unx = time();

function str_starts_with( $haystack, $needle ) {
    $length = strlen( $needle );
    return substr( $haystack, 0, $length ) === $needle;
}

function str_ends_with( $haystack, $needle ) {
   $length = strlen( $needle );
   if( !$length ) {
       return true;
   }
   return substr( $haystack, -$length ) === $needle;
}

function count2($objs) {
    $length = 0;
    foreach($objs as $obj) {
        $length = $length + 1;
    }
    return $length;
}

$args_req = array();

if($es !== null) {
    $args_req = $es->query;
}

$args_goto = array();

if(!isset($goto)) {
    $goto = "home";
} else {
    $goto = $goto;

    if(str_ends_with($goto, "/")) {
        $goto = substr($goto, 0, strlen($goto) - 1);
    }
    if(str_starts_with($goto, "/")) {
        $goto = substr($goto, 1);
    }

    if(strpos($goto, "?") !== false) {
        $goto = explode($goto, "?")[0];
        $args = explode($goto, "?")[1];
    }

    $scape = explode("/", $goto);
    $tree = file_get_contents(__DIR__ . "/pages/tree.json");
    $tree = json_decode($tree);
    $pg = "404";

    foreach ($tree as $branch_name => $branch_contents) {
        if($branch_name == strtolower($goto)) {
            $pg = $branch_name;
        } else {
            if(strtolower($scape[0]) == $branch_name) {
                if($branch_contents->arguments !== 0) {
                    if($branch_contents->arguments == (count($scape) - 1)) {
                        $pg = $branch_name;
                        $args = array_slice($scape, 1);
                    }
                } else {
                    if (count2($branch_contents->sub_pages) !== 0) {
                        foreach ($branch_contents->sub_pages as $subpage_name => $subpage_contents) {
                            if($subpage_name == strtolower($goto)) {
                                $pg = $branch_name;
                            } else {
                                $subpage_name_array = explode("_", $subpage_name);
                                $farth = -1;
                                $sofaryes = true;
                                $scape2 = $scape;
                                
                                if((count($subpage_name_array) + intval($subpage_contents->arguments)) == count($scape)) {
                                    foreach($subpage_name_array as $subpage_subname) {
                                        if($sofaryes == true) {
                                            $farth = $farth + 1;
                                            $subpage_name_array[$farth] = strtolower($subpage_subname);
                                            $scape2[$farth] = strtolower($scape2[$farth]);

                                            if($subpage_subname == "*") {
                                                $sofaryes = true;
                                                $scape2[$farth] == "*";
                                            } else {
                                                if($subpage_subname == $scape2[$farth]) {
                                                    $sofaryes = true;
                                                } else {
                                                    $sofaryes = false;
                                                }
                                            }
                                        }
                                    }

                                    if($sofaryes == true) {
                                        $pg = $subpage_name;
                                    } else {
                                        $totallengthbeforeargs0 = intval($subpage_contents->arguments);
                                        $totallengthbeforeargs_sp = count($subpage_name_array) - $totallengthbeforeargs0;
                                        $totallengthbeforeargs_v2 = count($scape2) - $totallengthbeforeargs0;
                                        if(array_slice($subpage_name_array, 0, $totallengthbeforeargs_sp) == array_slice($scape2, 0, $totallengthbeforeargs_v2)) {
                                            if(count(array_slice($subpage_name_array, $totallengthbeforeargs_sp, count($subpage_name_array))) == $totallengthbeforeargs0) {
                                                if(count(array_slice($scape2, $totallengthbeforeargs_v2, count($scape2))) == $totallengthbeforeargs0) {
                                                    $pg = $subpage_name;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    $prevdata = array(
        "ogUrl" => $es->url,
        "args" => array(
            "url" => $args_goto,
            "query" => $args_req
        ),
        "envs" => $es->envs
    );

    $regpgcont = file_get_contents(__DIR__ . '/pages/' . $pg . ".php");
    if(strpos($regpgcont, "<render-meta>") !== false) {
        $rndrmta = explode("<render-meta>", $regpgcont)[1];
        $rndrmta = explode("</render-meta>", $rndrmta)[0];

        $renderxml = "<?xml version=\"1.0\" ?> 
<document>" . str_replace("    ", "", str_replace("\n", "", $rndrmta)) . "</document>
";
        $renderxml = simplexml_load_string($renderxml);
        $renderxml_fu = array();

        foreach($renderxml as $key => $val) {
            $key = str_replace("-", "_", $key);
            $renderxml_fu[$key] = $val[0];
        }

        $datapack["render"] = $renderxml_fu;
    
    }
    $newpreg = preg_replace("/<render-meta>(?s)(.*)(?s)<\/render-meta>/", "", $regpgcont);
    if(strpos($regpgcont, "<head>") !== false) {
        $headinject = explode("<head>", $newpreg)[1];
        $headinject = explode("</head>", $headinject)[0];

        $headinject = "<!--\n\nPAGE INJECTION\nThe content from the <head> tag\nin the requested page.\n\n-->\n" . $headinject;
    }
    if(strpos($regpgcont, "<title>") !== false) {
        $titlefound = explode("<title>", $newpreg)[1];
        $titlefound = explode("</title>", $titlefound)[0];
        $datapack["render"]["pg_title"] = $titlefound;
        $newpreg = preg_replace("/<title>(?s)(.*)(?s)<\/title>/", '', $newpreg);
    }
    $newpreg = preg_replace("/<head>(?s)(.*)(?s)<\/head>/", '', $newpreg);
    if(strpos($regpgcont, "<footer>") !== false) {
        $footerinject = explode("<footer>", $newpreg)[1];
        $footerinject = explode("</footer>", $footerinject)[0];
        $footerinject = "<!--\n\nPAGE INJECTION\nThe content from the <footer> tag\nin the requested page.\n\n-->\n" . $footerinject;
    }
    $newpreg = preg_replace("/<footer>(?s)(.*)(?s)<\/footer>/", '', $newpreg);
    $newpreg = str_replace("<body>", "", $newpreg);
    $newpreg = str_replace("</body>", "", $newpreg);

    require __DIR__ . '/pages/templates/header.php';
    file_put_contents(__DIR__ . '/preg-' . $unx . '.tmp.php', $newpreg);
    require __DIR__ . '/preg-' . $unx . '.tmp.php';
    unlink(__DIR__ . '/preg-' . $unx . '.tmp.php');
    require __DIR__ . '/pages/templates/footer.php';
}
?>
e