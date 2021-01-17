.header {
    background-color: #133140;
    height: 62px;
    width: calc(100% - var(--side_clamps));
    padding: 0px var(--side_clamp);
    position: fixed;
    top: 0;
    z-index: 99;
}

.header .pb_logo {
    height: 44px;
    width: 44px;
    padding: 9px 0px;
    position: relative;
    left: -1.5px;
}

.header .center_pb_logo {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
}

.header .pb_logo .logo_img {
    height: 100%;
    width: 100%;
    filter: invert() brightness(50);
}

