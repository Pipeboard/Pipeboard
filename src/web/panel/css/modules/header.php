.page_header {
    background-color: #133140;
    height: 62px;
    --side_clamp: clamp(10px, 1.5%, 30px);
    --side_clamps: calc(var(--side_clamp) * 2);
    width: calc(100% - var(--side_clamps));
    padding: 0px var(--side_clamp);
}

.page_header .pb_logo {
    height: 50px;
    width: 50px;
    padding: 6px;
    position: relative;
}

.page_header .pb_logo .logo_img {
    height: 100%;
    width: 100%;
    filter: invert() brightness(50);
}