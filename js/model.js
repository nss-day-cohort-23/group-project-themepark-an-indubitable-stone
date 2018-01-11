'use strict';
const $ = require('jquery');

const fbURL = "https://an-indubitable-stone.firebaseio.com";

module.exports.filterForHappeningNow = (data, hour) => {
  const regexHour = new RegExp(`${hour}`);
  let happeningNow = [];

  data.forEach(attraction => {
    if (!attraction.times) {
      happeningNow.push(attraction);
    } else if (attraction.times) {
      let attractionArr = attraction.times.filter(time => {
        let amOrPm = time.match(/\w\w$/)[0];
        let timeToCheck = +time.match(/\d+(?=:)/);

        timeToCheck = amOrPm === "PM" ?
        (timeToCheck === 12 ? timeToCheck : timeToCheck + 12) :
        (timeToCheck === 12 ? timeToCheck = 0 : timeToCheck);

        return regexHour.test(timeToCheck);
      });
      if (attractionArr.length > 0) happeningNow.unshift(attraction);
    }
  });

  return happeningNow;
};

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

module.exports.getAttractionTypes = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/attraction_types.json`
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
};

module.exports.getAttractions = function(time, id) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/attractions.json`
    })
    .done(data => {
      console.log(time, id);
      // Currently checks for whether or not an area_id is passed in & DOES not
      // filter for time if area_id IS passed in.
      // If we want to filter for area AND time, then reconfigure this conditional.
      if (!id){
        let hour = typeof time === "undefined" ? getTime() : time;
        console.log(hour);
        data = hour < 9 || hour > 22 ? {} : filterForHappeningNow(data, hour);
      } else {
      }
      getAttractionTypes().then( types => {
        data.map( (attraction) => {
          attraction.typeName = types.find( (type) => {
            if (attraction.type_id === type.id) {
              return type.name;
            }
          });
          return attraction;
        });
        resolve(data);
      });
      console.log(data);
      resolve(data);
    })
    .fail(err => reject(err));
  });
};

module.exports.getAttraction = function(attraction) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/attractions/${attraction.id-1}.json`
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
};

function getAttractionTypes() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/attraction_types.json`
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
}

function findAttractions(attractions, search) {
  let selectAtrractions = [];
  let regexSearch = new RegExp(`${search}`, 'gi');
  attractions.forEach(att => {
    if (regexSearch.test(att.name)) {
      selectAtrractions.push(att.area_id);
    }
  });
  return selectAtrractions;
}
