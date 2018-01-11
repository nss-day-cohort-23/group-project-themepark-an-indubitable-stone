'use strict';

const $ = require('jquery');

module.exports.groupAttractionsByArea = (attractions) => {
    let park = {};
    for (let i = 1; i < 8; i++) {
        park[`park${i}`] = [];
        attractions.forEach(a => {
            if (a.area_id === i) {
                park[`park${i}`].push(a);
            }
        });
    }
};