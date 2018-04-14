import { Meteor } from 'meteor/meteor'
import { Tasks } from '../tasks/tasks'
import { resolve } from 'path'
import dotenv from 'dotenv'

import '/imports/api/tasks/methods'
import '/imports/api/tasks/server/publications'
import '/imports/api/tasks/server/routes'
import '/imports/api/users/server/publications'
import '/imports/api/seeds/methods'
import '/imports/api/seeds/server/routes'

Meteor.methods({
    'seed.credentials'() {
        ServiceConfiguration.configurations.remove({})
        // configure google if needed
        ServiceConfiguration.configurations.insert({
            service: 'google',
            clientId: '852673380073-qku8k0ed0dh407ini7tcq52hnq4mdq1o.apps.googleusercontent.com',
            loginStyle: 'popup',
            secret: process.env.GOOGLE_SECRET
        })
    },
    'seed.user'() {
        Tasks.remove({ userId: Meteor.userId() })
        Meteor.call('task.create', 'yesterday', { year: 2018, month: 4, week: 15, day: 13 })
        Meteor.call('task.create', 'today', { year: 2018, month: 4, week: 15, day: 14 })
        Meteor.call('task.create', 'this week', { year: 2018, month: 4, week: 15 })
        Meteor.call('task.create', 'next week', { year: 2018, month: 4, week: 16 })
        Meteor.call('task.create', 'a week in last month whose week ends in this month', { year: 2018, month: 3, week: 13 })
        Meteor.call('task.create', 'a week in next month whose week starts in this month', { year: 2018, month: 5, week: 16 })
        Meteor.call('task.create', 'this month', { year: 2018, month: 4 })
        Meteor.call('task.create', 'next month', { year: 2018, month: 5 })
    }
})