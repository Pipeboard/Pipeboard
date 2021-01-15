body {
    font-family: 'MuseoSans';
    font-weight: 100;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    --side_clamp: clamp(20px, 3%, 30px);
    --side_clamps: calc(var(--side_clamp) * 2);
}

.page-container {
    background-color: #f4f4f4;
}

.hide {
    display: none;
    opacity: 0;
}

.page {
    height: auto;
    min-height: calc(100% - 62px);
    width: calc(100%);
    margin: 0px 0px;
    margin-top: 62px;
    position: relative;
    overflow: hidden;
}

.page_titlecard {
    width: calc(100% - var(--side_clamps));
    height: 60px;
    background-color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 0px;
    padding: 0px var(--side_clamp);
    font-family: 'MuseoSans';
    font-weight: 500;
}

.page_titlecard .title {
    font-size: 16px;
    margin: 0px;
    margin-top: 13.8px;
    margin-bottom: 0.5px;
    font-weight: 700;
    display: block;
}

.page_titlecard .crumbs {
    font-size: 12px;
    margin: 0px;
    display: block;
}

.page_titlecard .crumbs .crumbster {
    color: lightgray;
}

.page_titlecard .crumbs .crumbie {
    color: gray;
}
.page_titlecard .crumbs .crumbie.islastcrumb {
    color: #4b4b4b;
}

.page_titlecard .crumbs .crumblink {
    text-decoration: none !important;
    color: inherit;
}