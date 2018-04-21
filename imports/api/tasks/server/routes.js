import { createScheduledTimestamp } from '/imports/utils/time'
import { findLastActiveUser } from '/imports/utils/users'
import { router } from '/server/router'
import { Tasks } from '/imports/api/tasks/tasks'
import listify from 'listify'
import moment from 'moment'

router.post('/task/create', async (req, res) => {
    const user = findLastActiveUser()
    if (user) {
        Meteor.runAsUser(user._id, () => {
            const timestamp = createScheduledTimestamp('day', req.body.date)
            Meteor.call('task.create', req.body.text, timestamp)
        })
        res.send('ok')
    } else {
        res.send('Error: No user accounts.')
    }
})

router.post('/task/read', async (req, res) => {
    const user = findLastActiveUser()
    if (user) {
        const date = moment(req.body.date)
        const query = {
            userId: user._id,
            'scheduled.day': date.date(),
            'scheduled.month': date.month() + 1,
            'scheduled.year': date.year()
        }
        const tasks = Tasks.find(query).fetch().map(task => task.text)
        res.send(JSON.stringify({
            text: listify(tasks)
        }))
    } else {
        res.send('Error: No user accounts.')
    }
})