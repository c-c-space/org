'use strict'

document.addEventListener("DOMContentLoaded", () => {
    skyGradient(255, 75, 5)
}, false)

function skyGradient(color, cloudy, sunny) {
    document.querySelector('main').style.background = `
    linear-gradient(180deg,
        hsl(222 ${100 - cloudy}% ${sunny}%),
        hsl(${color} ${100 - cloudy}% ${sunny}%)
    )`;
    document.body.style.background = `hsl(${color} ${100 - cloudy}% ${sunny}%)`
}