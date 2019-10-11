'use strict';
import { keys } from "./keys.js";


/* ZIP CODE FUNCTIONS */
let zip = "";
const zip_input = document.getElementById('zip');
zip_input.addEventListener('input', zipTest);

if (getParameterByName('zip')) {
    zip = getParameterByName('zip');
}

function zipTest(e) {
    // log.textContent = e.target.value;
    let log = document.getElementById('zip_display');

    var test_zip = e.target.value.replace(/\D/g, '');
    var regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/g;
    var found = test_zip.match(regex);

    if (found) {
        zip_input.blur();
        if (found[0] !== zip) {
            zip = found[0];
            log.textContent = zip;
            getWeather(keys.api_key, zip);
        }

    }
}



/* WEATHER RETRIEVAL AND PARSING FUNCTIONS */

function getWeather(k, z) {
    let toFetchCurrent = "https://api.openweathermap.org/data/2.5/weather?zip=" + z + ",us&appid=" + k;
    let toFetchForecast = "https://api.openweathermap.org/data/2.5/forecast/daily?zip=" + z + ",us&appid=" + k;

    console.log(toFetchCurrent);
    fetch(toFetchCurrent)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            mapCurrentResultsToState(myJson);
        });

    fetch(toFetchForecast)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson);
            //mapForecastResultsToState(myJson);
        });
}


function mapCurrentResultsToState(j) {
    if (j.cod === "404") {
        state["error"] = j.message;
    } else {
        state["now_description_main"] = j.weather[0].main;
        state["now_description_long"] = j.weather[0].description;
        state["now_description_icon"] = j.weather[0].icon;

        state["now_temp_current"] = kelvinToFahrenheit(j.main.temp);
        //state["now_temp_high"] = kelvinToFahrenheit(j.main.temp_max);
        //state["now_temp_low"] = kelvinToFahrenheit(j.main.temp_min);

        state["now_wind_speed"] = j.wind.speed;
        state["now_wind_degree"] = j.wind.deg;
        state["now_cloud_cover"] = j.clouds.all;
    }
}


function mapForecastResultsToState(j) {
    if (j.cod === "404") {
        state["error"] = j.message;
    } else {
        state["now_description_main"] = j.list[0].main;
        state["day_0_description_main"] = j.list[0];
        state["day_0_description_long"] = j.list[0];
        state["day_0_description_icon"] = j.list[0];

        state["day_0_temp_current"] = j.list[0];
        state["day_0_temp_high"] = j.list[0];
        state["day_0_temp_low"] = j.list[0];

        state["day_0_wind_speed"] = j.list[0];
        state["day_0_wind_degree"] = j.list[0];
        state["day_0_cloud_cover"] = j.list[0];
    }
}


/* TWO WAY DATA BINDING FUNCTIONS */

const createState = (state) => {
    return new Proxy(state, {
        set(target, property, value) {
            target[property] = value;
            render();
            return true;
        }
    });
};

const state = createState({
    name: 'Francesco',
    title: 'Front-end Developer',

    error: "",

    now_description_main: "",
    now_description_long: "",
    now_description_icon: "",

    now_temp_current: "",
    now_temp_high: "",
    now_temp_low: "",

    now_wind_speed: "",
    now_wind_degree: "",
    now_cloud_cover: "",

    now_rain: "",
    now_snow: "",

    sunrise: "",
    sunset: "",

    day_0_description_main: "",
    day_0_description_long: "",
    day_0_description_icon: "",

    day_0_temp_current: "",
    day_0_temp_high: "",
    day_0_temp_low: "",

    day_0_wind_speed: "",
    day_0_wind_degree: "",
    day_0_cloud_cover: "",

    day_1_description_main: "",
    day_1_description_long: "",
    day_1_description_icon: "",

    day_1_temp_current: "",
    day_1_temp_high: "",
    day_1_temp_low: "",

    day_1_wind_speed: "",
    day_1_wind_degree: "",
    day_1_cloud_cover: "",

    day_2_description_main: "",
    day_2_description_long: "",
    day_2_description_icon: "",

    day_2_temp_current: "",
    day_2_temp_high: "",
    day_2_temp_low: "",

    day_2_wind_speed: "",
    day_2_wind_degree: "",
    day_2_cloud_cover: "",

    day_3_description_main: "",
    day_3_description_long: "",
    day_3_description_icon: "",

    day_3_temp_current: "",
    day_3_temp_high: "",
    day_3_temp_low: "",

    day_3_wind_speed: "",
    day_3_wind_degree: "",
    day_3_cloud_cover: "",

    day_4_description_main: "",
    day_4_description_long: "",
    day_4_description_icon: "",

    day_4_temp_current: "",
    day_4_temp_high: "",
    day_4_temp_low: "",

    day_4_wind_speed: "",
    day_4_wind_degree: "",
    day_4_cloud_cover: "",

    day_5_description_main: "",
    day_5_description_long: "",
    day_5_description_icon: "",

    day_5_temp_current: "",
    day_5_temp_high: "",
    day_5_temp_low: "",

    day_5_wind_speed: "",
    day_5_wind_degree: "",
    day_5_cloud_cover: "",

});

const listeners = document.querySelectorAll('[data-model]');

listeners.forEach((listener) => {
    const name = listener.dataset.model;
    listener.addEventListener('keyup', (event) => {
        state[name] = listener.value;
    });
});


const render = () => {
    const bindings = Array.from(document.querySelectorAll('[data-binding]')).map(
        e => e.dataset.binding
    );
    bindings.forEach((binding) => {
        document.querySelector(`[data-binding='${binding}']`).innerHTML = state[binding];
        //document.querySelector(`[data-model='${binding}']`).value = state[binding];
    });
};

render();

/* HELPER FUNCTIONS */

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function kelvinToFahrenheit(tempK) {
    // Convert from Kelvin to Fahrenheit
    //T(°F) = T(K) × 9/5 - 459.67
    let tempF = parseInt((tempK * 1.8) - 459.67, 10);
    return tempF;
}
