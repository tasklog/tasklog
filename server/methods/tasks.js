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
    Tasks.update({ _id }, { $set: {  } })
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