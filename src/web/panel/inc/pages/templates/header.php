<?php
$psysname = "Pipeboard";
$title = "Pipeboard...";
$desc = "No description set for this page.";
$keywords = "pipeboard, system, panel, containers, website";

if($datapack["envs"]["panel_name"] !== null) $psysname = $datapack["envs"]["panel_name"];

$title = $datapack["ogUrl"] . " • " . $psysname;

if(isset($datapack)) {
    $db2 = $datapack["render"];
    foreach($datapack["render"] as $key => $val) {
        $db2[$key] = str_replace("\n", "", $val);
    }

    $datapack["render"] = $db2;

    if($datapack["render"]["pg_title"] !== null) $title = $datapack["render"]["pg_title"] . " • " . $psysname;
    if($datapack["render"]["pg_desc"] !== null) $desc = $datapack["render"]["pg_desc"];
    if($datapack["render"]["pg_crumbs"] !== null) $crumbs_raw = $datapack["render"]["pg_crumbs"];
    if($datapack["render"]["pg_baseurl"] !== null) $custombase = $datapack["render"]["pg_baseurl"];
    if($datapack["render"]["include_header"] !== null) $headertoggle = $datapack["render"]["include_header"];
    if($datapack["render"]["include_header_buttons"] !== null) $includeheaderbuttons = $datapack["render"]["include_header_buttons"];
    if($datapack["render"]["include_meta"] !== null) $includemeta = $datapack["render"]["include_meta"];
    if($datapack["render"]["include_footer"] !== null) $footertoggle = $datapack["render"]["include_footer"];
    if($datapack["render"]["include_sidebar"] !== null) $sidebartoggle = $datapack["render"]["include_sidebar"];
    if($datapack["render"]["include_page"] !== null) $togglepagecontrollers = $datapack["render"]["include_page"];
    if($datapack["render"]["include_page_title"] !== null) $toggletitle = $datapack["render"]["include_page_title"];
    if($datapack["render"]["load_stylesheets"] !== null) $includegeneralstylesheets = $datapack["render"]["load_stylesheets"];
    if($datapack["render"]["load_fonts"] !== null) $loadfonts = $datapack["render"]["load_fonts"];
    if($datapack["render"]["load_bootstrap"] !== null) $loadbootstrap = $datapack["render"]["load_bootstrap"];

    if($datapack["render"]["requires_auth"] !== null) {
        if($datapack["render"]["requires_auth"] == "yes") {
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
    }
    if($datapack["render"]["require_login"] !== null) {
        if($datapack["render"]["require_login"] == "yes") {
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

    if(isset($crumbs_raw)) {
        $crumbs = "";
        $crumbarray = explode(":", $crumbs_raw);
        $farth = -1;

        foreach($crumbarray as $crumbi) {
            $farth = $farth + 1;
            $crumbaddprops = "";
            $crumbto = null;

            if(strpos($crumbi, "[") !== false) {
                $crumbto = explode("[", $crumbi)[1];
                $crumbi = explode("[", $crumbi)[0];
                $crumbto = explode("]", $crumbto)[0];
                $crumbaddprops = $crumbaddprops . " crumbhaslink";
            }

            if($farth !== 0) {
                $crumbaddprops = $crumbaddprops . " notfirstcrumb";
                $crumbs = $crumbs . ' <span class="crumbster">/</span> ';
            }

            if($farth + 1 == count($crumbarray)) {
                $crumbaddprops = $crumbaddprops . " islastcrumb";
            }

            if($crumbto !== null) {
                $crumbs = $crumbs . ' <a class="crumblink" href="' . $crumbto . '"><span class="crumbie' . $crumbaddprops . '">' . $crumbi . '</span></a> ';
            } else {
                $crumbs = $crumbs . ' <span class="crumbie' . $crumbaddprops . '">' . $crumbi . '</span> ';
            }
        }
    }
}

?>
<html>
<head>
    <title><?php echo $title; ?></title>
    <?php if ($includemeta !== "no"): ?>
    <meta name="title" content="<?php echo $title; ?>">
    <meta name="description" content="<?php echo $desc; ?>">
    <meta name="keywords" content="<?php echo $keywords; ?>">
    <meta name="robots" content="noindex, nofollow">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="language" content="English">
    <meta name="author" content="Pipeboard, Inc.">
    <?php endif; ?>
    <?php if ($custombase !== null): ?>
    <base href="<?php echo $custombase; ?>">
    <?php endif; ?>
    <?php if($loadfonts !== "no"): ?>
    <link rel="stylesheet" href="/static/fonts/MuseoSans">
    <?php endif; ?>
    <?php if($loadbootstrap !== "no"): ?>
    <link rel="stylesheet" href="/static/css/bootstrap.css">
    <link rel="stylesheet" href="/static/js/bootstrap.js">
    <?php endif; ?>
    <?php if ($includegeneralstylesheets !== "no"): ?>
    <link rel="stylesheet" href="/static/css/modules/header.css">
    <link rel="stylesheet" href="/static/css/modules/sidebar.css">
    <link rel="stylesheet" href="/static/css/modules/_general.css">
    <link rel="stylesheet" href="/static/css/modules/footer.css">
    <link rel="stylesheet" href="/static/css/themes/_common.css">
    <link rel="stylesheet" href="/static/css/custom.css">
    <?php endif; echo $headinject; ?>
</head>
<body>
    <?php if($headertoggle !== "no"): ?>
    <div id="page_header" class="header">
    <?php if($includeheaderbuttons == "no"): ?>
        <div class="pb_logo center_pb_logo">
            <img class="logo_img" src="/favicon.png" alt/title="Pipeboard Logo">
        </div>
    <?php else: ?>
        <div class="pb_logo">
            <img class="logo_img" src="/favicon.png" alt/title="Pipeboard Logo">
        </div>
    <?php endif; ?>
    </div>
    <?php endif; ?>
    <?php if($sidebartoggle !== "no") include 'sidebar.php'; ?>
    <?php if($togglepagecontrollers !== "no"): ?>
    <div id="page" class="page">
        <?php if($toggletitle !== "no"): ?>
        <div id="page_titlecard" class="titlecard">
            <?php if($justusecrumbs !== "yes"): ?>
            <p class="title">
                <?php echo $datapack["render"]["pg_title"]; ?>
            </p>
            <?php endif; ?>
            <p class="crumbs">
                <?php echo $crumbs; ?>
            </p>
        </div>
        <div class="titlecard_spacer"></div><br>
        <?php endif; ?>
    <?php endif; ?>