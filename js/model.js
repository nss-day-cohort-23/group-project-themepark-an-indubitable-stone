'use strict';
const $ = require('jquery');

const fbURL = "https://an-indubitable-stone.firebaseio.com/";

module.exports.getParkInfo = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/park-info.json`
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
};

module.exports.getAreas = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/areas.json`
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
};

module.exports.getAttractions = function(obj) {
  let options = obj || {};

  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/attractions/${options}.json`
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
};

module.exports.getAttaction = function() {

};

function getAttractionTypes() {

}
