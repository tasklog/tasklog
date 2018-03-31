import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { Tasks } from './tasks'

Meteor.methods({
    'task.create'(text, scheduled = null, due = null) {
        Tasks.insert({
            userId: Meteor.userId(),
            text,
            scheduled,
            due,
            status: 'DEFAULT',
            completed: null
        })
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
                status: 'DEFAULT'
            }
        })
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