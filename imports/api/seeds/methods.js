import { createScheduledTimestamp } from '/imports/utils/time'
import { Meteor } from 'meteor/meteor'
import { resolve } from 'path'
import { Tasks } from '../tasks/tasks'
import dotenv from 'dotenv'
import faker from 'faker'
import moment from 'moment'
import capitalize from 'capitalize'

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
        ;['day', 'week', 'month'].forEach(period => {
            const m = moment('2018-01-01')
            while (m.year() < 2019) {
                m.add(1, period)
                Tasks.insert({
                    userId: Meteor.userId(),
                    text: capitalize(faker.lorem.words(4)),
                    scheduled: createScheduledTimestamp(period, m),
                    status: 'INCOMPLETE',
                    due: null,
                    completed: null
                })
                Tasks.insert({
                    userId: Meteor.userId(),
                    text: capitalize(faker.lorem.words(4)),
                    scheduled: createScheduledTimestamp(period, m),
                    status: 'COMPLETE',
                    due: null,
                    completed: m.clone().add(Math.floor(Math.random() * 7), 'days').toDate()
                })
                Tasks.insert({
                    userId: Meteor.userId(),
                    text: capitalize(faker.lorem.words(4)),
                    scheduled: createScheduledTimestamp(period, m),
                    status: 'CANCELLED',
                    due: null,
                    completed: null
                })
            }
        })
    }
})