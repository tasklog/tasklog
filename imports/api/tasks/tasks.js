import SimpleSchema from 'simpl-schema'

export const Tasks = new Mongo.Collection('tasks')

Tasks.schema = new SimpleSchema({
    _id: { type: String, required: true },
    text: { type: String, required: true },
    userId: { type: String, required: true },
    due: { type: Date, required: false },
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
    },
    scheduled: {
        required: false,
        type: new SimpleSchema({
            day: {
                type: SimpleSchema.Integer,
                min: 1,
                max: 31,
                required: false
            },
            week: {
                type: SimpleSchema.Integer,
                min: 1,
                max: 53,
                required: false
            },
            month: {
                type: SimpleSchema.Integer,
                min: 1,
                max: 12,
                required: true
            },
            year: {
                type: SimpleSchema.Integer,
                required: true
            }
        }),
    }
})

Tasks.attachSchema(Tasks.schema)