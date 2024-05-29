'use strict'

geoFindMe()

async function readmeMD(url, query) {
    fetch(url)
        .then(response => response.text())
        .then(innerText => {
            document.querySelector(query).innerText = innerText;
        }, false)
}

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

            let now = Math.floor(new Date().getTime() / 1000)
            console.log(now)
            let sky,
                sun;

            if (sunrise - 2400 <= now && now <= sunrise + 1111) {
                if (now <= sunrise - 1111) {
                    sky = 255;
                    sun = 25;
                } else {
                    sky = 222;
                    sun = 65;
                }
                document.querySelector('footer details').remove()
                readmeMD('README.md', '#readme')
                console.log("日の出 " + Number(sunrise - 2400) + " to " + Number(sunrise + 1111))
            } else if (sunset - 1111 <= now && now <= sunset + 2400) {
                if (sunset + 1111 <= now) {
                    sky = 255;
                    sun = 25;
                } else {
                    sky = 15;
                    sun = 55;
                }
                document.querySelector('#readme').remove()
                console.log("日の入 " + Number(sunset - 1111) + " to " + Number(sunset + 2400))
            } else if (sunrise <= now && now <= sunset) {
                sky = 222;
                sun = 75;
                document.querySelector('footer details').remove()
                readmeMD('README.md', '#readme')
            } else {
                sky = 225;
                sun = 5;
                document.querySelector('#readme').remove()
            }

            document.body.style.background = `hsl(${sky} ${100 - clouds}% ${sun}%)`;

            document.querySelector('#moon').style.opacity = `${100 - clouds / 1.075}%`;
            const cloudAll = document.querySelectorAll('canvas')
            cloudAll.forEach(function (cloud) {
                cloud.style.filter = `blur(${clouds * 0.111}px)`;
            }, false)

            const iconAll = document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon-precomposed"]')
            iconAll.forEach(function (iconEach) {
                iconEach.href = icon0;
            }, false)

            weather.innerHTML = `
            <img src="${icon0}" alt="${weather0}"><br>
            <u>${weather0} | ${locationName}</u><br>
            日の出 Sunrise
            <i id="sunrise">${new Date(sunrise * 1000).toLocaleTimeString()}</i>
            <br>
            日の入 Sunset
            <i id="sunset">${new Date(sunset * 1000).toLocaleTimeString()}</i>
            <br>
            <small>気温 ${temp_current} | 最高気温 ${temp_max} | 最低気温 ${temp_min} | 雲量 ${clouds}% | 風速 ${wind}m/s</small>
            `;
        });
}