import React from 'react';
import SongView from '../SongView/SongView.js';
import CourseView from '../CourseView/CourseView.js'


export default class App extends React.Component {
  // same thing as `getInitialState` in ES5
  constructor(props) {
    super(props);
    this.state = {
      view: "songs"
    };
  }

  render() {
    if (this.state.view === "songs") {
      return (
        <div>
          <SongView {... this.props}/>
        </div>
      );
    } else if (this.state.view === "courses") {
      return (
        <div>
          <CourseView />
        </div>
      );
    } else if (this.state.view === "tags") {
      return (
        <div>
          <TagView />
        </div>
      );
    }
  }
}
