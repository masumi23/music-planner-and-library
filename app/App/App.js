import styles from './App.css';

import React from 'react';
import GlobalNav from '../GlobalNav/GlobalNav.js';
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
    let childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { ... this.props });
    });

    return (
      <div className={styles.app}>
        <GlobalNav className={styles.globalNav}/>

        <div className={styles.mainComponent}>
          {childrenWithProps}
        </div>
      </div>
    );
  }
}
