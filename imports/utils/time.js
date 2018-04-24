import moment from 'moment'

export const createScheduledTimestamp = (period, date) => {
    const timestamp = {}
    const m = moment(date)
    switch (period) {
        case 'day':
            timestamp.day = m.date()
        case 'week':
            timestamp.week = m.week()
        case 'month':
            timestamp.week = m.week()
            timestamp.month = m.month() + 1
            timestamp.year = m.year()
    }
    return timestamp
}

export const dateTitle = (period, date) => {
    date = moment(date)
    switch (period) {
        case 'day': return date.format('MMMM D, YYYY')
        case 'week': return `Week of ${date.format('MMMM D, YYYY')}`
        case 'month': return date.format('MMMM YYYY')
        case 'year': return date.year()
    }
}

export const buildScheduledQuery = ({ day, week, month, year } = {}) => {
    const query = {}
    if (day) {
        query['scheduled.day'] = day
        query['scheduled.month'] = month
        query['scheduled.year'] = year
    } else if (week) {
        query['scheduled.day'] = { $type: 'double' }
        query['scheduled.week'] = week
        query['scheduled.year'] = year
    } else if (month) {
        const baseMoment = moment().year(year).month(month - 1)
        const firstMoment = baseMoment.clone().date(0)
        const lastMoment = baseMoment.clone().date(baseMoment.daysInMonth())
        query['scheduled.day'] = null
        query['scheduled.week'] = { $gte: firstMoment.week(), $lte: lastMoment.week() }
        query['scheduled.month'] = { $type: 'double' }
        query['scheduled.year'] = year
    } else if (year) {
        query['scheduled.week'] = null
        query['scheduled.month'] = { $type: 'double' }
        query['scheduled.year'] = year
    }
    return query
}