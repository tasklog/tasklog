import { router } from '/server/router'
import { asUser } from '/imports/utils/server'

router.post('/task/create', async (req, res) => {
    Meteor.users.find().fetch().forEach(user => {
        asUser(user._id).call('task.create', req.body.text)
    })
    res.send('ok')
})