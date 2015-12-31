import ReactDOM from 'react-dom';
import React from 'react';
import App from './App/App.js';
import SongView from './Containers/SongView/SongView.js';
import CourseView from './Containers/CourseView/CourseView.js';
import MacroView from './Containers/MacroView/MacroView.js';
import './main.css';
import { Router, Route, Link } from 'react-router';


ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="/song/:songID" component={SongView}/>
      <Route path="/macro" component={MacroView}/>
      <Route path="/courses" component={CourseView}/>
      <Route path="*" component={SongView} />
    </Route>
  </Router>
), document.getElementById('app'));
