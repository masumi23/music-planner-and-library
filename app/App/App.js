import styles from './App.css';

import React from 'react';
import SongView from '../SongView/SongView.js';
import CourseView from '../CourseView/CourseView.js';


export default class App extends React.Component {
  // same thing as `getInitialState` in ES5
  constructor(props) {
    super(props);
    this.state = {
      songView: true
    };
  }

  toggleCourses() {
    console.log(this.state);
    this.setState({songView: !this.state.songView});
  }

  render() {

    if (this.state.songView === true) {
      return (
        <div>
          <button
            onClick={this.toggleCourses.bind(this)}
            className={styles.switchBtn}>
            toggleCourses
          </button>
          <SongView {... this.props}/>
        </div>
      );
    } else {
      return (
        <div>
          <button
            onClick={this.toggleCourses.bind(this)}
            className={styles.switchBtn}>
            toggleCourses
          </button>
          <CourseView {... this.props}/>
        </div>
      );
    }
  }
}
