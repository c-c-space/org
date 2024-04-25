'use strict'

async function submitStars(csv) {
    const response = await fetch(csv + '?' + Date.now())
    const text = await response.text()
    const data = text.trim().split('\n')
        .map(line => line.split(',').map(x => x.trim()))
        .map(comma => {
            let emoji = comma[0];
            let fontSize = comma[1];
            const main = document.querySelector('main')
            const star = document.createElement('code')
            star.textContent = emoji;
            star.style.fontSize = fontSize;
            star.style.top = getRandomInt(0, 100) + "%";
            star.style.left = getRandomInt(0, 100) + "%";
            main.appendChild(star)
        }, false)
    // let stars = data.length;
}