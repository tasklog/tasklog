import { router } from '/server/router'
import { createScheduledTimestamp } from '/imports/utils/time'

router.post('/task/create', async (req, res) => {
    Meteor.users.find().fetch().forEach(user => {
        Meteor.runAsUser(user._id, () => {
            Meteor.call('task.create', req.body.text, createScheduledTimestamp('day'))
        })
    })
    res.send('ok')
})

router.get('/task/read', async (req, res) => {
    res.send(JSON.stringify({
        text: 'do the hello world'
    }))
})