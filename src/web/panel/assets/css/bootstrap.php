p, span, h1, h2, h3 {
    margin: 0;
    padding: 0;
    font-family: arial;
}

p {
    font-size: 16px;
    font-weight: 100;
    font-family: arial;
}
span {
    font-size: inherit;
    font-weight: inherit;
}
h1 {
    font-size: 23px;
    font-family: 'MuseoSans';
}
h2 {
    font-size: 20px;
    font-family: 'MuseoSans';
}
h3 {
    font-size: 17px;
    font-family: 'MuseoSans';
}

.input {
    position: relative;
    min-width: 200px;
    margin-bottom: 8px;
}
.input input {
    border-radius: 5px;
    padding: 12px 12px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    outline: none;
    width: 100%;
}
.input input:focus {
    border: 1px solid #dfb681;
}
.input label {
    transition: 0.1s top, color;
    position: absolute;
    top: 13.2px;
    left: 12px;
    font-size: 13px;
    font-family: 'MuseoSans';
    font-weight: 500;
    color: rgba(0, 0, 0, 0.658);
    pointer-events: none;
}
.input label {
    color: rgba(0, 0, 0, 0.479);
}
.input input:focus + label {
    color: #dfb681;
}
.input input:valid + label, .input:focus-within label, .preclicked label, .preclicked + label {
    top: -7px;
    left: 9px;
    /* font-family: helvetica; */
    font-size: 11.5px;
    font-weight: 600;
    background-color: white;
    border-radius: 8px;
    padding: 0px 4px;
}
.input:last-of-type {
    margin-bottom: 0px;
}

.input .radios {
    position: absolute;
    top: 11px;
    width: calc(100% - 28px);
    margin-left: 14px;
    display: flex;
    /* justify-content: space-between; */
}
.input .radios .radio {
    flex-grow: 1;
    max-width: 90px;
    display: inline-block;
}
.input .radios .radio input {
    display: inline-block;
    width: 13px;
    height: 13px;
    margin-left: 0px;
}
.input .radios .radio span {
    display: inline-block;
}

button {
    border-radius: 1px;
    border: none;
    outline: none;
    padding: 6px 12px;
    font-family: 'MuseoSans';
    font-weight: 500;
    font-size: 14px;
    background-color: #153141;
    color: white;
    min-width: 70px;
    cursor: pointer;
}

button:hover {
    filter: brightness(0.8);
}

