import { Meteor } from 'meteor/meteor'

const GOOGLE_PERMISSIONS = [
    'https://www.googleapis.com/auth/calendar.readonly'
]

export function loginWithGoogle() {
    return new Promise((resolve, reject) => {
        Meteor.loginWithGoogle(
            { requestPermissions: GOOGLE_PERMISSIONS },
            error => error ? reject(error) : resolve()
        )
    })
}

export function logout() {
    return new Promise(resolve => Meteor.logout(resolve))
}