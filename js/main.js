"use strict";
const $ = require("jquery");


const setFooterDate = () => {
    let todaysDate = new Date(Date.now()),
    day = todaysDate.getDay(),
    month = todaysDate.getMonth(),
    year = todaysDate.getFullYear();

    $("#footer-date").text(`${day}${month}${year}`);
};


setFooterDate();