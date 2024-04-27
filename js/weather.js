'use strict'

geoFindMe()

// 現在位置の地理座標・位置情報を取得
function geoFindMe() {
    const weather = document.querySelector('#earth');
    if (!navigator.geolocation) {
        weather.textContent = 'Geolocation API is not supported by your browser';
    } else {
        weather.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }

    // 現在地の取得に失敗した場合
    function error() {
        weather.textContent = 'Unable to retrieve your location';
    }

    // 現在地の取得に成功した場合
    function success(position) {
        // 緯度経度を変数に代入
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        weatherAPI(latitude, longitude)
    }
}

function weatherAPI(lat, lon) {
    const weather = document.querySelector('#earth');
    weather.textContent = "";

    // Weather API ID
    const api = "557b466129cf7d7427b03e5b7886a4bb";

    // https://openweathermap.org/current
    const base =
        `http://api.openweathermap.org/data/2.5/weather` +
        `?lat=${lat}&lon=${lon}&appid=${api}&lang=ja`;

    // Current weather data
    const kelvin = 273.15;
    let icon0,
        weather0,
        temp_current,
        temp_max,
        temp_min,
        clouds,
        wind,
        timezoon,
        sunrise,
        sunset,
        locationName;

    fetch(base)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            icon0 = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
            weather0 = data.weather[0].description + ", " + data.weather[0].main;
            temp_current = Math.floor(data.main.temp - kelvin) + "°C";
            temp_max = Math.floor(data.main.temp_max - kelvin) + "°C";
            temp_min = Math.floor(data.main.temp_min - kelvin) + "°C";
            clouds = data.clouds.all;
            wind = data.wind.speed;
            timezoon = data.timezone;
            sunrise = data.sys.sunrise;
            sunset = data.sys.sunset;
            locationName = data.name + ", " + data.sys.country;

            const iconAll = document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon-precomposed"]')
            iconAll.forEach(function (iconEach) {
                iconEach.href = icon0;
            }, false)

            weather.innerHTML = `
            <img src="${icon0}" alt="${weather0}"><br>
            <u>${weather0} | ${locationName}</u><br>
            日の出 Sunrise <i>
            ${new Date(sunrise * 1000).toLocaleTimeString()}
            </i><br>
            日の入 Sunset <i>
            ${new Date(sunset * 1000).toLocaleTimeString()}
            </i>
            <br>
            <small>気温 ${temp_current} | 最高気温 ${temp_max} | 最低気温 ${temp_min} | 雲量 ${clouds}%</small>
            `;

            document.querySelector('#moon').style.opacity = `${100 - clouds}%`;
            const cloudAll = document.querySelectorAll('canvas')
            cloudAll.forEach(function (cloud) {
                cloud.style.filter = `blur(${clouds * 0.123}px)`;
            }, false)
        });
}