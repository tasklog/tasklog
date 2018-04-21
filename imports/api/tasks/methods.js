import { buildScheduledQuery } from '/imports/utils/time'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { Tasks } from './tasks'

Meteor.methods({
    'task.create'(text, scheduled) {
        Tasks.insert({
            userId: Meteor.userId(),
            text,
            scheduled,
            status: 'INCOMPLETE',
            due: null,
            completed: null,
            order: -1,
            createdAt: new Date()
        })
        const { day, week, month, year } = scheduled || {}
        const query = buildScheduledQuery(scheduled)
        query.userId = Meteor.userId()
        Tasks.update(query, { $inc: { order: 1 } }, { multi: true })
    },
    'task.delete'(_id) {
        const taskQuery = { _id, userId: Meteor.userId() }
        const { order, scheduled } = Tasks.findOne(taskQuery)
        const updateQuery = {
            ...buildScheduledQuery(scheduled),
            userId: Meteor.userId(),
            order: { $gt: order }
        }
        Tasks.remove(taskQuery)
        Tasks.update(updateQuery, { $inc: { order: -1 } }, { multi: true })
    },
    'task.setStatus'(_id, status) {
        Tasks.update({ _id }, {
            $set: { status }
        })
    },
    'task.complete'(_id) {
        Tasks.update({ _id }, {
            $set: {
                completed: new Date(),
                status: 'COMPLETE'
            }
        })
    },
    'task.incomplete'(_id) {
        Tasks.update({ _id }, {
            $set: {
                completed: null,
                status: 'INCOMPLETE'
            }
        })
    },
    'task.toggle'(_id) {
        if (Tasks.findOne({ _id }).status !== 'COMPLETE') {
            Meteor.call('task.complete', _id)
        } else {
            Meteor.call('task.incomplete', _id)
        }
    },
    'task.reschedule'(_id, scheduled) {
        Tasks.update({ _id }, {
            $set: { scheduled }
        })
    },
    'task.changeDue'(_id, due) {
        Tasks.update({ _id }, {
            $set: { due }
        })
    }
})