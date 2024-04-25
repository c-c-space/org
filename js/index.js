'use strict'

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

async function readmeMD(url, query) {
    fetch(url)
        .then(response => response.text())
        .then(innerText => {
            document.querySelector(query).innerText = innerText;
        }, false)
}

document.addEventListener("DOMContentLoaded", () => {
    let month = document.querySelector('#phase h1 time').textContent;

    if (localStorage.getItem('yourInfo')) {
        if (localStorage.getItem('emoji')) {
            let emojiJSON = JSON.parse(localStorage.getItem('emoji'))
            for (let i = 0; i < emojiJSON.length; i++) {
                let emoji = emojiJSON[i].emojiValue;
                let size = emojiJSON[i].fontSize;
                let lunar = emojiJSON[i].lunarPhase;

                const main = document.querySelector('main')
                let month = document.querySelector('#phase h1 time').textContent;
                let lunarPhase = Number(month).toFixed(0)
                if (lunar == lunarPhase) {
                    const star = document.createElement('code')
                    star.textContent = emoji;
                    star.style.fontSize = size;
                    star.style.top = getRandomInt(0, 100) + "%";
                    star.style.left = getRandomInt(0, 100) + "%";
                    main.appendChild(star)

                    star.addEventListener('click', function () {
                        let result = window.confirm('この絵文字をコレクションから削除します。 \r\n Remove This from Your Collection.')
                        if (result) {
                            emojiJSON.splice(i, 1)
                            localStorage.setItem('emoji', JSON.stringify(emojiJSON))
                            location.reload()
                        }
                    }, false)
                }
            }
        }
    } else {
        readmeMD('README.md', 'footer')
        document.querySelector('footer').style.padding = "1rem";
    }
})

// 色と記号を投稿する
let array = JSON.parse(localStorage.getItem("emoji")) || [];
const addData = (emojiValue, fontSize, lunarPhase) => {
    array.push({
        emojiValue,
        fontSize,
        lunarPhase
    })
    localStorage.setItem("emoji", JSON.stringify(array))
    return { emojiValue, fontSize, lunarPhase }
}

window.addEventListener("load", () => {
    if (localStorage.getItem('yourInfo')) {
        const submitForm = document.querySelector('#submit')
        submitForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const emojiAll = document.getElementsByName('emoji')
            const toAll = document.getElementsByName("to")

            let emojiValue;
            for (let i = 0; i < emojiAll.length; i++) {
                if (emojiAll[i].checked) {
                    emojiValue = emojiAll[i].value;
                    break
                }
            }

            let fontSize
            for (let i = 0; i < toAll.length; i++) {
                if (toAll[i].checked) {
                    fontSize = toAll[i].value;
                    break
                }
            }

            let month = document.querySelector('#phase h1 time').textContent;
            let lunarPhase = Number(month).toFixed(0)

            let thisEmoji = {
                emoji: emojiValue,
                size: fontSize,
                lunar: lunarPhase
            }

            // localStorage に sign を追加
            addData(emojiValue, fontSize, lunarPhase)

            const emojiJSON = JSON.stringify(thisEmoji)
            let url = 'submit.php';
            let response = fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: emojiJSON
            })

                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
                .catch(error => {
                    console.log(error)
                }, false)

            setTimeout(() => {
                window.location.replace('')
            }, 1000)
        })
    }
})