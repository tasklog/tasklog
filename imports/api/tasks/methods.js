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
            completed: null
        })
    },
    'task.delete'(_id) {
        Tasks.remove({ _id })
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