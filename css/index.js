'use strict'

document.addEventListener("DOMContentLoaded", () => {
    thisSky()

    const inputAll = document.querySelectorAll("#sky, #saturation, #lightness")
    inputAll.forEach(function (input) {
        input.addEventListener("change", () => {
            thisSky()
        })
    }, false)
}, false)

function thisSky() {
    let hue = document.querySelector("#sky").value;
    let saturation = document.querySelector("#saturation").value;
    let lightness = document.querySelector("#lightness").value;

    document.querySelector("#hue").textContent = hue;
    document.querySelector("#cloudy").textContent = saturation;
    document.querySelector("#sunny").textContent = lightness;
    skyGradation(hue, saturation, lightness)

    const footer = document.querySelector("#readme")
    const main = document.querySelector("main")
    let style = window.getComputedStyle(main);
    footer.innerText = `
    element.style {
        background: ${style.getPropertyValue('background')};
    }`;
}

function skyGradation(hue, cloudy, sunny) {
    document.querySelector('main').style.background = `
    linear-gradient(180deg,
        hsl(222 ${100 - cloudy}% ${sunny}%),
        hsl(${hue} ${100 - cloudy}% ${sunny}%)
    )`;
    document.body.style.background = `hsl(${hue} ${100 - cloudy}% ${sunny}%)`;
}