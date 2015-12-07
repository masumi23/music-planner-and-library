import React from 'react/addons.js';
import App from './App/App.js';
import SongView from './SongView/SongView.js';
import './main.css';
import { Router, Route, Link } from 'react-router';


React.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="/song/:songID" component={SongView}/>
      <Route path="*" component={SongView} />
    </Route>
  </Router>
), document.getElementById('app'));
