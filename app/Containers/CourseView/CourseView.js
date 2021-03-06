import React from 'react';
import Firebase from 'firebase';
import Rebase from 're-base';
import _ from 'lodash';

export default class CourseView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentCourse: null
    };
  }

  componentWillMount() {
    console.log('componentWillMount');
    this.base = Rebase.createClass('https://songdatabase.firebaseio.com');
  }

  componentDidMount() {
    console.log('componentDidMount...');
    this.fbRef = this.base.syncState('history/courses', {
      context: this,
      state: 'items',
      asArray: true
    });
  }

  componentWillUnmount(){
    this.base.removeBinding(this.fbRef);
  }
//will this work??
  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps');
    console.log(newProps);
    let currentCourseID = newProps.params.courseID;
    let currentCourse = _.find(this.state.items, function(course){
        return (course.id+'') === currentCourseID;
      }.bind(this));

    this.setState({
      currentCourseID,
      currentCourse
    });
  }

  updateCurrentCourse(updatedCourse) {
    this.setState({currentCourse: updatedCourse});

    // clone list and update current course in list
    let i = _.findIndex(this.state.items, this.state.currentCourse);
    let diff = {};
    diff[i] = {$merge: updatedCourse};

    console.log("update course " + this.state.items[i].title);
    let newList = React.addons.update(this.state.items, diff);

    this.setState({items: newList});
  }

  addCourse() {
    let newCourse = {
      className: 'Hi!',
      id: this.state.items[this.state.items.length - 1].id+1
    };

    let newList = React.addons.update(this.state.items, {
      $push: [newCourse]
    });

    this.setState({
      items: newList,
      currentCourse: newCourse
    });
  }

  render () {
    console.log("Render Course View");
    var createItem = function(course, index) {
      return (
        <li key={index + course.id}>
          {course.className}
        </li>
      );
    };

    return (
      <div>
        <div>
          Select a course
          <ul className={'col-xs-4 '}>
            {this.state.items.map(createItem)}
          </ul>
        </div>
      </div>
    );
  }

}