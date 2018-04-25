import { Meteor } from 'meteor/meteor'

export function loginWithGoogle() {
    return new Promise((resolve, reject) => {
        Meteor.loginWithGoogle({
            requestPermissions: [
                'https://www.googleapis.com/auth/calendar.readonly'
            ],
            requestOfflineToken: true,
            forceApprovalPrompt: true
        }, (error) => {
            error ? reject(error) : resolve()
        })
    })
}

export function logout() {
    return new Promise(resolve => Meteor.logout(resolve))
}