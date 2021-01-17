<render-meta>
    <pg-title>Setup Pipeboard</pg-title>
    <pg-desc>Setup your brand new Pipeboard installation and configure settings and preferences.</pg-desc>
    <pg-crumbs>Home:Admin:First-Time Setup[/setup]</pg-crumbs>
    <pg-baseurl>http://localhost/</pg-baseurl>

    <include-header>yes</include-header>
    <include-header-buttons>no</include-header-buttons>
    <include-meta>yes</include-meta>
    <include-footer>no</include-footer>
    <include-sidebar>no</include-sidebar>
    <include-page>yes</include-page>

    <load-stylesheets>yes</load-stylesheets>
    <load-fonts>yes</load-fonts>

    <requires-auth>no</requires-auth>
    <require-login>no</require-login>
</render-meta>
<head>
    <style>
    .nextStepButton {
        border-radius: 5px;
        position: absolute;
        bottom: 12px;
        right: 12px;
    }
    .nsb_spcr {
        height: 29px;
        margin-top: 12px;
        width: 100%;
    }
    </style>
</head>
<body>
<div class="grids">
    <div class="grid">
        <div class="container">
            <p class="title">Basic Information</p>
            <div class="input">
                <input type="text" name="panel_name" value="Pipeboard" required>
                <label>Panel Name*</label>
            </div>
            <div class="input">
                <input type="text" name="system_email" required>
                <label>Panel Email*</label>
            </div>
            <button class="nextStepButton" onclick="nextStep()">Next</button>
            <div class="nsb_spcr"></div>
        </div>
    </div>
    <div class="grid">
        <div class="container disabled">
            <p class="title">Storage Configuration</p>
            <div class="input preclicked">
                <input style="opacity: 1; pointer-events: none;" type="text" class="preclicked" value=" " required name="unused.storage_engine">
                <label>Storage Engine*</label>
                <div class="radios">
                    <div class="radio">
                        <input type="radio" name="storage_engine" checked>
                        <span>SQLite</span>
                    </div>
                    <div class="radio">
                        <input type="radio" name="storage_engine">
                        <span>MySQL</span>
                    </div>
                    <div class="radio">
                        <input type="radio" name="storage_engine" disabled>
                        <span>Redis</span>
                    </div>
                    <div class="radio">
                        <input type="radio" name="storage_engine" disabled>
                        <span>Cloud</span>
                    </div>
                </div>
            </div>
            <div class="input">
                <input type="text" name="db_url" required>
                <label>URL & Port</label>
            </div>
            <div class="input">
                <input type="text" name="db_user" required>
                <label>Username</label>
            </div>
            <div class="input">
                <input type="text" name="db_pw" required>
                <label>Password</label>
            </div>
            <div class="input">
                <input type="text" name="db_db" required>
                <label>Database/File*</label>
            </div>
            <button class="nextStepButton" onclick="nextStep()">Next</button>
            <div class="nsb_spcr"></div>
        </div>
        <!-- <div class="container">
            <p class="title">Admin Configuration</p>
            <div class="input">
                <input type="text" name="admin_username" required>
                <label>Admin Username</label>
            </div>
            <div class="input">
                <input type="text" name="admin_email" required>
                <label>Admin Email</label>
            </div>
            <div class="input">
                <input type="password" name="admin_password" required>
                <label>Admin Password</label>
            </div>
            <div class="input preclicked">
                <input type="file" name="admin_pfp" class="preclicked" required>
                <label>Admin Picture</label>
            </div>
        </div> -->
    </div>
    <div class="grid">
        <div class="container disabled">
            <p class="title">Admin Configuration</p>
            <div class="input">
                <input type="text" name="admin_username" value="admin" required>
                <label>Admin Username*</label>
            </div>
            <div class="input">
                <input type="text" name="admin_email" required>
                <label>Admin Email*</label>
            </div>
            <div class="input">
                <input type="password" name="admin_password" required>
                <label>Admin Password*</label>
            </div>
            <div class="input preclicked">
                <input type="file" name="admin_pfp" class="preclicked" required>
                <label>Admin Picture</label>
            </div>
            <button class="nextStepButton" onclick="nextStep()">Finish</button>
            <div class="nsb_spcr"></div>
        </div>
    </div>
    <script src="/static/js/grids.js"></script>
    <script>
        let stepsofar = 1;
        function nextStep() {
            
        }
    </script>
</div>
</body>