import moment from 'moment'
import filter from 'lodash/filter'

export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATE_FORMAT_1 = 'DD/MM/YYYY'
export const DATETIME_FORMAT = 'YYYY.MM.DD HH:mm'
export const TIME_FORMAT = 'HH:mm'

export const DAYS = [
    { key: '1_monday', title: 'Понедельник', shortTitle: 'Пн' },
    { key: '2_tuesday', title: 'Вторник', shortTitle: 'Вт' },
    { key: '3_wednesday', title: 'Среда', shortTitle: 'Ср' },
    { key: '4_thursday', title: 'Четверг', shortTitle: 'Чт' },
    { key: '5_friday', title: 'Пятница', shortTitle: 'Пт' },
    { key: '6_saturday', title: 'Суббота', shortTitle: 'Сб' },
    { key: '7_sunday', title: 'Воскресенье', shortTitle: 'Вс' },
]

export function day(dayKey) {
    return filter(DAYS, { key: dayKey })[0]
}

export function getMonth(date = new Date(), withYear = false) {
    const format = withYear ? 'MMMM YYYY' : 'MMMM'
    const month = moment(date).format(format)
    return (month)[0].toUpperCase() + (month).slice(1)
}

export function getDateTime(date = new Date()) {
    return moment(date).format(DATETIME_FORMAT)
}

export function getTime(date = new Date()) {
    return moment(date).format(TIME_FORMAT)
}

export function getDate(date = new Date()) {
    moment.locale('ru')// Set locale to Russian
    return moment(date).format('DD MMMM YYYY')
}
export function getDateNotRU(date = new Date()) {
    return moment(date).format(DATE_FORMAT_1)
}
