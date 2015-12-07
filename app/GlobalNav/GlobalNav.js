import styles from './GlobalNav.css';

import React from 'react';

import { Link } from 'react-router';

export default class App extends React.Component {
  render() {
    return (
      <nav {...this.props}>
        <Link to={`/song`}>
          Song View
        </Link>

        <Link to={`/courses`}>
          Course View
        </Link>
      </nav>
    );
  }
}
