import SimpleSchema from 'simpl-schema'

export const Tasks = new Mongo.Collection('tasks')

const DateSchema = new SimpleSchema({
  day: {
    type: SimpleSchema.Integer,
    min: 1,
    max: 31,
    required: false
  },
  month: {
    type: SimpleSchema.Integer,
    min: 1,
    max: 12,
    required: false
  },
  year: {
    type: SimpleSchema.Integer,
    required: true
  }
})

Tasks.schema = new SimpleSchema({
  _id: { type: String, required: true },
  text: { type: String, required: true },
  userId: { type: String, required: true },
  due: { type: DateSchema, required: false },
  scheduled: { type: DateSchema, required: false },
  completed: { type: Date, required: false },
  status: {
    type: String,
    required: true,
    allowedValues: [
      'DEFAULT',
      'COMPLETE',
      'MIGRATED_FORWARD',
      'MIGRATED_BACKWARD',
      'CANCELLED'
    ]
  }
})

Tasks.attachSchema(Tasks.schema)