'use strict';
import {keys} from "./keys.js";

// console.log(keys.api_key);
getWeather( keys.api_key , "64111");

function getWeather( key, zip ){
    let toFetch = "https://api.openweathermap.org/data/2.5/weather?zip="+zip+",us&appid="+key;
    
    fetch(toFetch)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson);
    });
  }