import { Meteor } from 'meteor/meteor'
import Dropdown from 'rc-dropdown'
import Menu, { Item, Divider } from 'rc-menu'
import React, { Component } from 'react'
import Rodal from 'rodal'
import { RadioGroup, RadioButton } from 'react-radio-buttons'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import moment from 'moment'
import { weeksOf } from '/imports/utils/time'

const CustomRadioButton = (props) => (
    <RadioButton iconSize={20} pointColor='#2699FB' {...props} />
)

class TaskRescheduler extends Component {
    state = {
        period: undefined,
        year: undefined,
        month: undefined,
        week: undefined,
        day: undefined
    }
    get requiredFields() {
        switch (this.state.period) {
            case 'month':
                return ['year', 'month']
            case 'week':
                return ['year', 'month', 'week']
            case 'day':
                return ['year', 'month', 'week', 'day']
            default:
                return ['NULL']
        }
    }
    get periods() {
        return ['month', 'week', 'day'].map(period => {
            return { value: period, label: period }
        })
    }
    get years() {
        return Array(4).fill().map((undef, i) => {
            const year = moment().year() + i
            return { value: year, label: String(year) }
        })
    }
    get months() {
        return moment.months().map((month, i) => {
            return { value: i, label: month }
        })
    }
    get weeks() {
        if (this.state.month != null && this.state.year != null) {
            return weeksOf(this.state.month, this.state.year).map(week => ({
                value: week.weekNumber,
                label: week.startDate.format('MMM D, YYYY') + ' - ' + week.endDate.format('MMM D, YYYY')
            }))
        }
        return []
    }
    get days() {
        if (this.state.week != null) {
            return moment.weekdays().map((weekday, i) => {
                const m = moment().year(this.state.year).month(this.state.month).week(this.state.week).weekday(i)
                return { value: m.date(), label: m.format('dddd, MMM D') }
            })
        }
        return []
    }
    get isSaveDisabled() {
        const actualCount = this.requiredFields.filter(field => this.state[field] != null).length
        const requiredCount = this.requiredFields.length
        return actualCount !== requiredCount
    }
    update = (field, items = []) => (option) => {
        if (!option || this.state[field] !== option.value) {
            // clear items
            items.forEach(item => this.setState({ [item]: undefined }))
            // set item
            this.setState({ [field]: option ? option.value : undefined })
        }
    }
    handleSave = () => {
        if (!this.isSaveDisabled) {
            const timestamp = this.requiredFields.reduce((timestamp, field) => {
                return { ...timestamp, [field]: this.state[field] }
            }, {})
            if (timestamp.month != null) {
                timestamp.month += 1
            }
            if (this.props.onSave) {
                this.props.onSave(timestamp)
                this.reset()
            }
        }
    }
    handleCancel = () => {
        this.props.onCancel()
        this.reset()
    }
    reset = () => this.setState({
        period: undefined,
        year: undefined,
        month: undefined,
        week: undefined,
        day: undefined
    })
    render() {
        return (
            <>
            {this.props.children}
            <Rodal visible={this.props.open} onClose={() => {}} showCloseButton={false}>
                <form onSubmit={e => e.preventDefault()}>
                    <h3>Reschedule a Task</h3>
                    <Select
                        value={this.state.period}
                        placeholder='Reschedule to a ...'
                        options={this.periods}
                        onChange={this.update('period', ['year', 'month', 'week', 'day'])}
                     />
                    <Select
                        value={this.state.year}
                        placeholder='in the year ...'
                        disabled={!this.state.period}
                        options={this.years}
                        onChange={this.update('year', ['week', 'day'])}
                     />
                    <Select
                        value={this.state.month}
                        placeholder='in month of ...'
                        disabled={!this.state.period}
                        options={this.months}
                        onChange={this.update('month', ['week', 'day'])}
                     />
                    <Select
                        value={this.state.week}
                        placeholder='during the week of ...'
                        disabled={this.state.month == null || this.state.period === 'month'}
                        options={this.weeks}
                        onChange={this.update('week', ['day'])}
                     />
                    <Select
                        value={this.state.day}
                        placeholder='on the day of ...'
                        disabled={this.state.week == null || this.state.period === 'month' || this.state.period === 'week'}
                        options={this.days}
                        onChange={this.update('day')}
                     />
                     <div className='buttons'>
                         <button className='secondary' onClick={this.handleCancel}>Cancel</button>
                         <button onClick={this.handleSave} disabled={this.isSaveDisabled}>Save</button>
                     </div>
                </form>
            </Rodal>
            </>
        )
    }
}

export default TaskRescheduler