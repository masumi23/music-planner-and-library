import React from 'react';
import App from './App/App.js';
import './main.css';
import { Router, Route, Link } from 'react-router'

main();

function main() {
  React.render((
	  <Router>
	    <Route path="/" component={App}>
	      <Route path="/song/:songId" component={App}/>
	    </Route>
	  </Router>
	), document.getElementById('app'));
}

