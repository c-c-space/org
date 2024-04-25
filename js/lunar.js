'use strict';

let size = window.innerWidth / 2;

const
    pi = Math.PI,
    pi2 = pi * 2,
    topAngle = pi + pi / 2 * 3,
    bottomAngle = pi + pi / 2,
    halfSize = size / 2,
    c = [],
    ctx = [],
    start = [0, topAngle, 0],
    end = [pi2, bottomAngle, pi2];

window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#moon').style.width = `${size}px`;
    document.querySelector('#moon').style.height = `${size}px`;

    for (let i = 0; i < 3; i++) {
        c[i] = document.getElementById(`moon${i}`)
        c[i].style.width = `${size}px`;
        c[i].style.height = `${size}px`;
        c[i].width = size;
        c[i].height = size;
        ctx[i] = c[i].getContext('2d')
        ctx[i].fillStyle = i === 0 ? '#222' : '#eee';
        ctx[i].arc(halfSize, halfSize, halfSize * .95, start[i], end[i])
        ctx[i].fill();
    }

    const inputDate = document.querySelector('#date')
    inputDate.value = new Date().toLocaleDateString('sv')

    // ?no=DD
    if (location.search) {
        const queryString = location.search;
        const params = new URLSearchParams(queryString)
        let dd = params.get("no")
        daysOld(Number(dd))
        document.querySelector('footer details').remove()
    } else {
        createMoon(inputDate.value)
    }
}, false)

function earthShine(sun, m) {
    const s = Math.cos(pi2 * sun / m),
        s2 = Math.sin(pi2 * sun / m),
        r = Math.abs(halfSize * s);

    c[1].style.transform = `rotate(${s2 > 0 ? 180 : 0}deg)`;
    c[2].style.width = `${r * 2}px`;
    c[2].style.left = `${halfSize - r}px`;
    ctx[2].clearRect(0, 0, size, size);
    ctx[2].beginPath();
    ctx[2].fillStyle = s > 0 ? '#222' : '#eee';
    ctx[2].arc(halfSize, halfSize, halfSize * .95, 0, pi2);
    ctx[2].fill();
}

function daysOld(today) {
    let days = today.toFixed(0)
    const moonAge = document.querySelector('#phase h1 time')
    moonAge.className = 'days';
    moonAge.innerHTML = days;
    moonAge.addEventListener('click', function () {
        moonAge.className = moonAge.className === "days" ? "today" : "days";
        moonAge.innerHTML = moonAge.textContent === days ? today.toFixed(12) : days;
    }, false)
    lunarPhase(today, '#phase h1 u')
}

function createMoon(d) {
    const date = new Date(d)
    if (isNaN(date.getTime())) return;
    date.setHours(12)

    const month = date.getTime() / 864e5 - 6.475,
        // 平均朔望月 synodic month
        synodic = 29.530588853 +
            2.162e-9 * ((date.getTime() - 946727935816) / 315576e5)

    let today = month > 0 ? month % synodic : (synodic + month % synodic) % synodic;

    daysOld(today)
    earthShine(today, synodic)
}