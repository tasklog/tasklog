import AwesomeNotifications from 'awesome-notifications'

export const notifier = new AwesomeNotifications({
    icons: {
        enabled: false
    },
    animationDuration: 150,
    modal: {
        okLabel: 'Delete'
    }
})