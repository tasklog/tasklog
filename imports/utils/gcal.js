import pify from 'pify'
import loadScript from 'load-script'

export async function importGoogleCalendar() {
    if (!window.gapi || !window.gapi.client) {
        // load google wrapper
        await pify(loadScript)('https://apis.google.com/js/api.js')
        // load google client
        await pify(gapi.load)('client:auth2')
    }
    // return if already loaded
    if (window.gapi.client.calendar) {
        return window.gapi.client.calendar
    }
    // use meteor user access token
    window.gapi.client.setToken({
        access_token: Meteor.user().services.google.accessToken
    })
    // lazy load calendar JS
    await window.gapi.client.init({
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        requestOfflineToken: true,
        forceApprovalPrompt: true
    })
    return window.gapi.client.calendar
}

