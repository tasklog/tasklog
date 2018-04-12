import moment from 'moment'


function getDay(d = new Date()) {
    return d.getDate()
}

function getWeek(d = new Date()) {
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
}

function getMonth(d = new Date()) {
    return d.getMonth() + 1
}

function getYear(d = new Date()) {
    return d.getFullYear()
}

export function getDates(d = new Date()) {
    return {
        day: getDay(d),
        week: getWeek(d),
        month: getMonth(d),
        year: getYear(d)
    }
}