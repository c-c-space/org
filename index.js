'use strict'

async function submitStars(csv) {
    const response = await fetch(csv + '?' + Date.now())
    const text = await response.text()
    const data = text.trim().split('\n')
        .map(line => line.split(',').map(x => x.trim()))
        .map(comma => {
            let emoji = comma[0]
            let fontSize = comma[1]
            const main = document.querySelector('main')
            const star = document.createElement('code')
            star.textContent = emoji.replaceAll('"', '');
            star.style.fontSize = fontSize;
            star.style.top = getRandomInt(0, 100) + "%"
            star.style.left = getRandomInt(0, 100) + "%"
            main.appendChild(star)
        });
    // let stars = data.length;
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem('yourInfo')) {
        submitStars('submit.csv')
    } else {
        readmeMD('README.md', 'footer')
    }
})

async function readmeMD(url, query) {
    fetch(url)
        .then(response => response.text())
        .then(innerText => {
            document.querySelector(query).innerText = innerText
        }, false)
}