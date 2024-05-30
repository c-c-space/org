'use strict'

let emoji,
    phase,
    earth,
    outH,
    inH,
    h;

function lunarPhase(l, query) {
    if (l >= 0 && l <= 1.1) {
        emoji = '🌑';
        phase = '朔（新月） New Moon';
        earth = '月は太陽と同じ方向（月が地球と太陽をむすぶ線上に位置する）にあり、地球からは見えない';
        outH = 5;
        inH = 19;
        h = 4;
    } else if (l >= 1.1 && l <= 6.5) {
        emoji = '🌒';
        phase = 'Evening Crescent';
        earth = '<small>月は太陽と同じ方向から太陽を向いた地球の左側へ公転</small><br>日の入り後の西の空に半月へ満ちてゆく月が見える';
        outH = 8;
        inH = 22;
        h = 7;
    } else if (l >= 6.5 && l <= 8.2) {
        emoji = '🌓';
        phase = '上弦 First Quarter';
        earth = '月は太陽を向いた地球の真左にあり、昼ごろから真夜中に東から昇り西へ沈む半月が見える';
        outH = 10;
        inH = 23;
        h = 9;
    } else if (l >= 8.2 && l <= 13.7) {
        emoji = '🌔';
        phase = 'Waxing Gibbous';
        earth = '<small>月は太陽を向いた地球の左側から太陽の反対方向へ公転</small><br>日の入り前から真夜中すぎに満月へと満ちていく月が見える';
        outH = 12;
        inH = 1;
        h = 11;
    } else if (l >= 13.7 && l <= 15.8) {
        emoji = '🌕';
        phase = '望（満月） Full Moon';
        earth = '月は太陽の反対方向（地球が月と太陽をむすぶ線上に位置する）にあり、日の入りから日の出まで一晩中満月が見える';
        outH = 16;
        inH = 3;
        h = 15;
    } else if (l >= 15.8 && l <= 21.3) {
        emoji = '🌖';
        phase = 'Waning Gibbous';
        earth = '<small>月は太陽の反対方向から太陽を向いた地球の右側へ公転</small><br>遅い夜から日の入りすぎに満月から欠けていく月が見える';
        outH = 18;
        inH = 5;
        h = 16;
    } else if (l >= 21.3 && l <= 22.8) {
        emoji = '🌗';
        phase = '下弦 Last Quarter';
        earth = '月は太陽を向いた地球の真右にあり、真夜中から昼ごろに東から昇り西へ沈む半月が見える';
        outH = 21;
        inH = 11;
        h = 19;
    } else {
        emoji = '🌘';
        phase = 'Morning Crescent';
        earth = '<small>月は太陽を向いた地球の右側から太陽と同じ方向へ公転</small><br>日の出前の東の空に新月へ欠けてゆく月が見える';
        outH = 22;
        inH = 12;
        h = 20;
    }

    let thisPhase = emoji + ' ' + phase;
    document.querySelector(query).textContent = thisPhase;
    document.querySelector('#earth').innerHTML = earth;
}