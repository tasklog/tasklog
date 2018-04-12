import { router } from '/server/router'

router.get('/seed/all', async (req, res) => {
    Meteor.users.find().fetch().forEach(user => {
        Meteor.runAsUser(user._id, () => {
            Meteor.call('seeds.all')
        })
    })
    res.send('ok')
})