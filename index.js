'use strict'

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('yourInfo')) {

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