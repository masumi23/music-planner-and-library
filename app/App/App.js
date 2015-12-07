import styles from './App.css';

import React from 'react';
import SongView from '../SongView/SongView.js';
import CourseView from '../CourseView/CourseView.js';

import { Link } from 'react-router';


export default class App extends React.Component {
  // same thing as `getInitialState` in ES5
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Link to={`/song`}>
          Song View
        </Link>

        <Link to={`/courses`}>
          Course View
        </Link>
        {this.props.children}
      </div>
    );
  }
}
