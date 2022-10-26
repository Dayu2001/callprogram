const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
const formatDate = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return `${[year, month, day].map(formatNumber).join('/')} `
}
const formatWeekday = date => {
    const day = (date.getDay() + 6) % 7 + 1;
    return `周${day}`
}
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
}

module.exports = {
    formatTime,
    formatDate,
    formatWeekday
}