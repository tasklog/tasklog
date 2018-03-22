import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

const App = () => (
  <div>Hello world</div>
);

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
