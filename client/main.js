import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Tracker } from 'meteor/tracker'

Tracker.autorun(() => {
  console.log(Meteor.user())
})

const login = () => {
  Meteor.loginWithGoogle({
    requestPermissions: [
      'https://www.googleapis.com/auth/calendar.readonly'
    ]
  }, (err) => {
    if (err) {
      // handle error
    } else {
      // successful login!
    }
  });
}

const App = () => (
  <button onClick={login}>Hello world</button>
);

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
