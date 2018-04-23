import 'rc-dropdown/assets/index.css'
import { createScheduledTimestamp } from '/imports/utils/time'
import Dropdown from 'rc-dropdown'
import Menu, { Item, Divider } from 'rc-menu'
import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { withRouter } from 'react-router'

class TaskRescheduler extends Component {
    state = {
        open: false
    }
    get skipDaily() {
        return this.props.location.pathname.includes('/d/')
            || this.props.location.pathname.includes('/w/')
    }
    get skipMonthly() {
        return this.props.location.pathname.includes('/m/')
    }
    get skipYearly() {
        return this.props.location.pathname.includes('/y/')
    }
    onVisibleChange = (open) => {
        this.setState({ open })
    }
    onSelect = (item) => {
        this.setState({ open: false })
        const { _id } = this.props.task
        const { key } = item
        Meteor.call('task.reschedule', _id, createScheduledTimestamp(key))
    }
    render() {
        return (
            <Dropdown
                trigger={['click']}
                children={this.props.children}
                onVisibleChange={this.onVisibleChange}
                visible={this.state.open}
                overlay={(
                    <Menu onSelect={this.onSelect}>
                        {this.skipDaily || <Item key='day'>Move to Daily Log</Item>}
                        {this.skipMonthly || <Item key='week'>Move to Monthly Log</Item>}
                        {this.skipYearly || <Item key='month'>Move to Yearly Log</Item>}
                    </Menu>
                )}
            />
        )
    }
}

export default withRouter(TaskRescheduler)