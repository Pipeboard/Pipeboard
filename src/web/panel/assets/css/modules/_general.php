body {
    font-family: 'MuseoSans';
    font-weight: 100;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    --side_clamp: clamp(20px, 3%, 30px);
    --side_clamps: calc(var(--side_clamp) * 2);
}

.hide {
    display: none;
    opacity: 0;
}

.page {
    height: auto;
    min-height: calc(100% - 62px - 40px);
    width: calc(100% - calc(var(--side_clamps) - 16px));
    padding: 0px calc(var(--side_clamp) - 8px);
    margin: 0;
    margin-top: 62px;
    position: relative;
    overflow: hidden;
}

.page .titlecard {
    width: calc(100% - var(--side_clamps));
    height: 60px;
    background-color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
    position: absolute;
    z-index: 2;
    top: 0px;
    left: 0px;
    padding: 0px var(--side_clamp);
    font-family: 'MuseoSans';
    font-weight: 500;
}

.page .titlecard .title {
    font-size: 16px;
    margin: 0px;
    margin-top: 13.8px;
    margin-bottom: 0.5px;
    font-weight: 700;
    display: block;
}

.page .titlecard .crumbs {
    font-size: 12px;
    margin: 0px;
    display: block;
}

.page .titlecard .crumbs .crumbster {
    color: lightgray;
}

.page .titlecard .crumbs .crumbie {
    color: gray;
}
.page .titlecard .crumbs .crumbie.islastcrumb {
    color: #4b4b4b;
}

.page .titlecard .crumbs .crumblink {
    text-decoration: none !important;
    color: inherit;
}

.page .titlecard_spacer {
    height: 60px;
    width: 100%;
    display: block;
}

.page .grids {
    display: flex;
    width: 100%;
    /* height: 100%; */
    flex-flow: row wrap;
}

.page .grids .grid {
    height: auto;
    min-width: 320px;
    margin: 8px;
    position: relative;
    flex-grow: 1;
    flex-basis: 30%;
    flex-shrink: 1;
    transition-duration: 0.5;
    transition-property: max-width, max-height;
    display: flex;
    flex-flow: column wrap;
}

.page .grids .grid .container {
    padding: 12px;
    background-color: white;
    position: relative;
    z-index: 1;
    min-height: 24px;
    display: inline-block;
    width: calc(100% - 16px - 8px);
    box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.05);
    margin-bottom: 16px;
    flex-grow: 1;
}
.page .grids .grid .container.disabled {
    opacity: 0.5;
    filter: contrast(1.1) blur(0.8px);
    pointer-events: none;
    cursor: not-allowed !important;
}

.page .grids .grid .container:last-of-type {
    margin-bottom: 0px;
}

.page .grids .grid .container .title {
    width: calc(100% + 12px);
    position: relative;
    left: -12px;
    font-weight: 700;
    font-size: 16px;
    padding-left: 12px;
    padding-bottom: 8px;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.12);
    margin-bottom: 16px;
}

.page .grids .grid .container .description {
    
}

.page .grids .grid .container .input {
    width: 100%;
}