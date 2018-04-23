import AwesomeNotifications from 'awesome-notifications'
import 'awesome-notifications/dist/styles.css'

export const notifier = new AwesomeNotifications({
    icons: {
        enabled: false
    },
    animationDuration: 150,
    modal: {
        okLabel: 'Delete'
    }
})