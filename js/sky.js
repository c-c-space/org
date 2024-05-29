'use strict'

document.addEventListener("DOMContentLoaded", () => {
    skyGradient(222, 0, 5)
}, false)

function skyGradient(sky, cloudy, sunny) {
    document.body.style.background = `
    linear-gradient(180deg,
        hsl(222 ${111 - cloudy}% ${sunny}%),
        hsl(${sky} ${111 - cloudy}% ${sunny}%)
    )`;
} 