import { createScheduledTimestamp } from '/imports/utils/time'
import { encode } from 'base-64'
import { Meteor } from 'meteor/meteor'
import { resolve } from 'path'
import { Tasks } from '../tasks/tasks'
import capitalize from 'capitalize'
import dotenv from 'dotenv'
import faker from 'faker'
import moment from 'moment'

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
    'clear.user'() {
        Tasks.remove({ userId: Meteor.userId() })
    },
    'seed.user'() {
        Meteor.call('clear.user')

        const date = moment().month(0).day(0)
        const endYear = date.year() + 2

        const randomText = () => {
            const verb = faker.random.arrayElement([
                'Buy',
                'Pick up',
                'Purchase',
                'Order'
            ])
            return `${verb} ${faker.commerce.product().toLowerCase()}`
        }

        const createTask = (i, timestamp) => Tasks.insert({
            createdAt: new Date(),
            userId: Meteor.userId(),
            text: encode(randomText()),
            scheduled: timestamp,
            status: 'INCOMPLETE',
            due: null,
            completed: null,
            order: i
        })

        while (date.year() < endYear) {
            const max = faker.random.number({ min: 1, max: 2 })
            for (let i = 0; i < max; i++) {
                createTask(i, createScheduledTimestamp('day', date))
            }
            date.add(1, 'day')
        }
    }
})