import { router } from '/server/router'
import { create } from '../methods'

router.post('/task/create', async (req, res) => {
    Meteor.users.find().fetch().forEach(user => {
        create({ ...req.body, userId: user._id })
    })
    res.send('ok')
})