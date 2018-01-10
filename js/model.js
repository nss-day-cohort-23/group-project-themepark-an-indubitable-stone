'use strict';
const $ = require('jquery');

const fbURL = "https://an-indubitable-stone.firebaseio.com/"
module.exports.getParkInfo = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/park-info`
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
};

module.exports.getAreas = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/areas`
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
};

module.exports.getAttractions = function() {

};

module.exports.getAttaction = function() {

};

function getAttractionTypes() {

}
