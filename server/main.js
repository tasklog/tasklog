import { Meteor } from 'meteor/meteor'
import { resolve } from 'path'
import { Picker } from 'meteor/meteorhacks:picker'
import dotenv from 'dotenv'

import '/imports/api/tasks/methods'
import '/imports/api/tasks/server/publications'
import '/imports/api/users/server/publications'
import '/imports/api/seeds/methods'

Meteor.startup(() => {
    // read .env file for environment variables
    dotenv.config({ path: resolve(Meteor.absolutePath, '.env') })
    // configure google if needed
    if (!ServiceConfiguration.configurations.findOne({ service: 'google' })) {
        ServiceConfiguration.configurations.insert({
            service: 'google',
            clientId: '852673380073-qku8k0ed0dh407ini7tcq52hnq4mdq1o.apps.googleusercontent.com',
            loginStyle: 'popup',
            secret: process.env.GOOGLE_SECRET
        })
    }
    Picker.route('/hello', function(params, req, res, next) {
        
        res.end('hello world');
      });
})
