'use strict'

async function readmeMD(url, query) {
    fetch(url)
        .then(response => response.text())
        .then(innerText => {
            document.querySelector(query).innerText = innerText;
        }, false)
}

document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem('yourInfo')) {
        readmeMD('README.md', 'footer')
        document.querySelector('footer').style.padding = "1rem";
    } else {
        readmeMD('README.md', '#readme')
    }
})


let array = JSON.parse(localStorage.getItem("emoji")) || [];
const addData = (emojiValue, fontSize, lunarPhase, timestamp) => {
    array.push({
        emojiValue,
        fontSize,
        lunarPhase,
        timestamp
    })
    localStorage.setItem("emoji", JSON.stringify(array))
    return { emojiValue, fontSize, lunarPhase, timestamp }
}

window.addEventListener("load", () => {
    let calendar = document.querySelector('#calendar')
    let month = document.querySelector('#phase h1 time').textContent;
    let lunarPhase = Number(month).toFixed(0)

    submitStars(`29d12h44m3s/${lunarPhase}.csv`)

    if (localStorage.getItem('yourInfo')) {
        for (let m = 0; m < 30; m++) {
            const button = document.createElement('button')
            button.setAttribute('type', 'button')
            button.textContent = m;
            calendar.appendChild(button)
            if (m == lunarPhase) {
                button.style.color = "yellow";
                button.className = "today";
            }
            button.addEventListener('click', () => {
                location.assign(`?no=${m}`)
            }, false)
        }

        if (location.search) {
            if (localStorage.getItem('emoji')) {
                const main = document.querySelector('main')
                const emojiJSON = JSON.parse(localStorage.getItem('emoji'))
                for (let i = 0; i < emojiJSON.length; i++) {
                    let emoji = emojiJSON[i].emojiValue;
                    let size = emojiJSON[i].fontSize;
                    let lunar = emojiJSON[i].lunarPhase;

                    if (Number(lunar) == lunarPhase) {
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

                let fontSize;
                for (let i = 0; i < toAll.length; i++) {
                    if (toAll[i].checked) {
                        fontSize = toAll[i].value;
                        break
                    }
                }

                let thisEmoji = {
                    emoji: emojiValue,
                    size: fontSize,
                    lunar: lunarPhase
                }

                // localStorage に sign を追加
                addData(emojiValue, fontSize, lunarPhase, new Date().toLocaleString())

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
    }
})