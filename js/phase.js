'use strict';

let emoji,
    phase,
    earth

function lunarPhase(l, query) {
    if (l >= 0 && l <= 1.0) {
        emoji = '🌑';
        phase = '朔（新月） New Moon';
        earth = '月は太陽と同じ方向（月が地球と太陽をむすぶ線上に位置する）にあり、地球からは見えない';
    } else if (l >= 1.1 && l <= 6.5) {
        emoji = '🌒';
        phase = 'Evening Crescent';
        earth = '月は太陽と同じ方向から地球から太陽を見て左方向へ、日の入り後の西の空に半月へ満ちてゆく月が見える';
    } else if (l >= 6.6 && l <= 8.2) {
        emoji = '🌓';
        phase = '上弦 First Quarter';
        earth = '月は地球から太陽を見て左方向にあり、昼ごろから真夜中に東から昇り西へ沈む半月が見える';
    } else if (l >= 8.3 && l <= 13.7) {
        emoji = '🌔';
        phase = 'Waxing Gibbous';
        earth = '月は地球から太陽を見て左方向から太陽の反対方向へ、日の入り前から真夜中すぎに満月へと満ちていく月が見える';
    } else if (l >= 13.8 && l <= 15.8) {
        emoji = '🌕';
        phase = '望（満月） Full Moon';
        earth = '月は太陽の反対方向（地球が月と太陽をむすぶ線上に位置する）にあり、日の入りから日の出まで一晩中満月が見える';
    } else if (l >= 15.9 && l <= 21.3) {
        emoji = '🌖';
        phase = 'Waning Gibbous';
        earth = '月は太陽の反対方向から地球から太陽を見て右方向へ、遅い夜から日の入りすぎに満月から欠けていく月が見える';
    } else if (l >= 21.4 && l <= 22.8) {
        emoji = '🌗';
        phase = '下弦 Last Quarter';
        earth = '月は地球から太陽を見て右方向にあり、真夜中から昼ごろに東から昇り西へ沈む半月が見える';
    } else {
        emoji = '🌘';
        phase = 'Morning Crescent';
        earth = '月は地球から太陽を見て右方向から太陽と同じ方向へ、日の出前の東の空に新月へ欠けてゆく月が見える';
    }
    let thisPhase = emoji + ' ' + phase;
    document.querySelector(query).textContent = thisPhase;
    document.querySelector('#earth').innerHTML = earth;
}