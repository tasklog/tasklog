import React from 'react'
import Right from 'react-icons/lib/go/chevron-right'
import Left from 'react-icons/lib/go/chevron-left'
import { withRouter } from 'react-router'
import moment from 'moment'

class Arrow extends React.Component {
    get Icon() {
        switch (this.props.direction) {
            case 'left': return Left
            case 'right': return Right
        }
    }
    get interval() {
        switch (this.props.direction) {
            case 'left': return -1
            case 'right': return 1
        }
    }
    get date() {
        const { day, week, month, year } = this.props.match.params
        const date = moment()
        if (year) date.year(+year)
        if (month) date.month(+month - 1)
        if (week) date.week(+week)
        if (day) date.date(+day)
        return date
    }
    get period() {
        const { day, week, month, year } = this.props.match.params
        if (day) return 'day'
        if (week) return 'week'
        if (month) return 'month'
        if (year) return 'year'
    }
    get nextUrl() {
        const date = this.date.clone().add(this.interval, this.period)
        switch (this.period) {
            case 'day':
                return `/d/${date.year()}/${date.month() + 1}/${date.date()}`
            case 'week':
                return `/w/${date.year()}/${date.week()}`
            case 'month':
                return `/m/${date.year()}/${date.month() + 1}`
            case 'year':
                return `/y/${date.year()}`
        }
    }
    handleClick = () => {
        this.props.history.push(this.nextUrl)
    }
    render() {
        return (
            <button className='reset'>
                <this.Icon
                    onClick={this.handleClick}
                    className={`arrow arrow--${this.props.direction}`}
                />
            </button>
        )
    }
}

export default withRouter(Arrow)