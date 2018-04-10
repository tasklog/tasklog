export const asUser = userId => ({
    call: (name, ...args) => {
        Meteor.call('asUser().call', userId, name, ...args)
    }
})

Meteor.methods({
    'asUser().call'(userId, name, ...args) {
        this.setUserId(userId)
        Meteor.call(name, ...args)
    }
})
