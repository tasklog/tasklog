import { Meteor } from 'meteor/meteor'
import { resolve } from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: resolve(Meteor.absolutePath, '.env') })

import '/imports/api/tasks/methods'
import '/imports/api/tasks/server/publications'
import '/imports/api/tasks/server/routes'
import '/imports/api/users/server/publications'
import '/imports/api/seeds/methods'
import '/imports/api/seeds/server/routes'
import '/imports/api/users/methods'