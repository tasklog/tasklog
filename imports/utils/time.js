const createScheduledTimestamp = (period, date) => {
    const timestamp = {}
    const m = moment(date)
    switch (period) {
        case 'day':
            timestamp.day = m.date()
        case 'week':
            timestamp.week = m.week()
        case 'month':
            timestamp.month = m.month() + 1
            timestamp.year = m.year()
    }
    return timestamp
}