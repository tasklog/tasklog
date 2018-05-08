import moment from 'moment'

export const createScheduledTimestamp = (period, date) => {
    const timestamp = {}
    const m = moment(date)
    switch (period) {
        case 'day':
            timestamp.day = m.date()
            timestamp.month = m.month() + 1
            timestamp.year = m.year()
            break
        case 'week':
            timestamp.week = m.week()
            timestamp.year = m.year()
            break
        case 'month':
            timestamp.month = m.month() + 1
            timestamp.year = m.year()
            break
    }
    return timestamp
}

export const dateTitle = (period, date) => {
    date = moment(date)
    switch (period) {
        case 'day': return date.format('MMMM D, YYYY')
        case 'week': return `Week of ${date.day('Sunday').format('MMMM D, YYYY')}`
        case 'month': return date.format('MMMM YYYY')
        case 'year': return date.year()
    }
}

export const periodFromTimestamp = ({ day, week, month, year }) => {
    if (day && month && year) return 'day'
    if (week && year) return 'week'
    if (month && year) return 'month'
}

export const buildScheduledQuery = (timestamp = {}) => {
    const { day, week, month, year } = timestamp
    const query = {}

    switch (periodFromTimestamp(timestamp)) {
        case 'day':
            query['scheduled.day'] = day
            query['scheduled.month'] = month
            query['scheduled.year'] = year
            break
        case 'week':
            query['scheduled.day'] = null
            query['scheduled.week'] = week
            query['scheduled.year'] = year
            break
        case 'month':
            query['scheduled.day'] = null
            query['scheduled.week'] = null
            query['scheduled.month'] = month
            query['scheduled.year'] = year
            break
    }

    return query
}

export const weeksOf = (month, year) => {
    const baseMoment = moment().year(year).month(month)
    const firstMoment = baseMoment.clone().date(0)
    const lastMoment = baseMoment.clone().date(baseMoment.daysInMonth())

    const weeks = []
    let week = firstMoment.week()

    while (week <= lastMoment.week()) {
        weeks.push({
            weekNumber: week,
            startDate: moment().day('Sunday').year(year).week(week),
            endDate: moment().day('Saturday').year(year).week(week)
        })
        week++
    }

    return weeks
}