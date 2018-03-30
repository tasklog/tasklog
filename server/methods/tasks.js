import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { Tasks } from '../../collections/tasks'

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
    Tasks.update({ _id }, { $set: { status } })
  },
  'task.complete'(_id) {
    Meteor.call('task.setStatus', _id, 'COMPLETE')
    Tasks.update({ _id }, {
      $set: { completed: new Date() }
    })
  },
  'task.incomplete'(_id) {
    Meteor.call('task.setStatus', _id, 'DEFAULT')
    Tasks.update({ _id }, {
      $set: { completed: null }
    })
  },
  'task.reschedule'(_id, newScheduled) {
    Tasks.update({ _id }, {
      $set: { scheduled: newScheduled }
    })
  },
  'task.changeDue'(_id, newDue) {
    Tasks.update({ _id }, {
      $set: { due: newDue }
    })
  }
})