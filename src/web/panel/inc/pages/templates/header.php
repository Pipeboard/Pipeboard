<?php

$psysname = "Pipeboard";
$title = "Pipeboard...";
$desc = "No description set for this page.";
$Keywords = "pipeboard, system, panel, containers, website";

// print_r($datapack);

if(isset($datapack)) {
    $title = $datapack["ogUrl"] . " • " . $psysname;

    if($datapack["render"]["pg_title"] !== null) $title = $datapack["render"]["pg_title"] . " • " . $psysname;
    if($datapack["render"]["pg_desc"] !== null) $desc = $datapack["render"]["pg_desc"];
    if($datapack["render"]["include_header"] !== null) $headertoggle = $datapack["render"]["include_header"];
    if($datapack["render"]["include_header_buttons"] !== null) $includeheaderbuttons = $datapack["render"]["include_header_buttons"];
    if($datapack["render"]["include_meta"] !== null) $includemeta = $datapack["render"]["include_meta"];
    if($datapack["render"]["include_footer"] !== null) $footertoggle = $datapack["render"]["include_footer"];
    if($datapack["render"]["include_sidebar"] !== null) $sidebartoggle = $datapack["render"]["include_sidebar"];
    if($datapack["render"]["include_general_stylesheets"] !== null) $includegeneralstylesheets = $datapack["render"]["include_general_stylesheets"];

    if($datapack["render"]["requires_auth"] !== null) {
        // $tok = $datapack"]["session"]["auth"]["alive-token;
        // $apireqcont = json_decode(file_get_contents("http://localhost:81/sessions/check/alive-token?data=" . $tok . "&token=" . $system_api_key));
        // if($apireqcont"]["code !== 200) {
        //     throw "API Request Went Wrong: " . $apireqcont"]["error;
        // }
        // $check = $apireqcont"]["results;
        $check = true;
        if($check == true) {

        }
    }
    if($datapack["render"]["require_login"] !== null) {
        // $lastpassforuser = "last_login_stamp:" . $datapack["session"]["user"]["id"];
        // $check = if(!$es["envs"]["$lastpassforuser > strtotime("-10 minutes"));
        $check = true;
        if($check == false) {
            header("Location: /accounts/auth/password-check/" . $datapack["session"]["user"]["id"]);
        } else {
            echo "<script>console.log('%cPIPEBOARD', 'font-weight: bold; color: #d4966a;', '•', 'User was prompted for login, but they were prompted less than ten minutes ago! Voied and continiuing session.');</script>\n";
        }
    }
}

?>
<html>
<head>
    <title><?php echo $title; ?></title>
    <?php if (!$includemeta == "false"): ?>
    <meta name="title" content="<?php echo $title; ?>">
    <meta name="description" content="<?php echo $desc; ?>">
    <meta name="keywords" content="<?php echo $keywords; ?>">
    <meta name="robots" content="noindex, nofollow">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="language" content="English">
    <meta name="author" content="Pipeboard, Inc.">
    <?php endif; if (!$includegeneralstylesheets == "false"): ?>
    <link rel="stylesheet" href="/static/css/modules/_general.css">
    <link rel="stylesheet" href="/static/css/modules/header.css">
    <link rel="stylesheet" href="/static/css/modules/sidebar.css">
    <link rel="stylesheet" href="/static/css/modules/footer.css">
    <link rel="stylesheet" href="/static/css/themes/_common.css">
    <link rel="stylesheet" href="/static/css/custom.css">
    <?php endif; ?>
</head>
<body>
    <div id="page_header" class="page_header">
        <div class="pb_logo">
            <img class="logo_img" src="/favicon.png" alt/title="Pipeboard Logo">
        </div>
        <?php if(!$includeheaderbuttons == "false"): ?>

        <? endif; ?>
    </div>

    <?php if(!$sidebartoggle == "false") include 'sidebar.php'; ?>
    <div id="page" class="page">