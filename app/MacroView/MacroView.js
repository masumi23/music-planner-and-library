import styles from './MacroView.css';

import React from 'react';
import Firebase from 'firebase';
import Rebase from 're-base';
import _ from 'lodash';

export default class MacroView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: null
    };
  }

  componentWillMount() {
    this.base = Rebase.createClass('https://songdatabase.firebaseio.com/');
  }

  componentDidMount() {
    this.fbRef = this.base.syncState('history/courses', {
      context: this,
      state: 'courses',
      asArray: true
    });
  }

  componentWillUnmount(){
    this.base.removeBinding(this.fbRef);
  }

  render () {
    let courses = this.state.courses;
    if (!courses) return null;

    this.state.currentCourse = this.state.currentCourse || _.first(courses);

    let classes = this.state.currentCourse.classes;
    let nuggets = [
      { nid: 0, name: 'Melody: Low La and Low So'},
      { nid: 1, name: 'Rhythm: Synco-pa'},
      { nid: 2, name: 'Rhythm: whole and half note rest'},
      { nid: 3, name: 'Melody: La [pentatonic'},
      { nid: 4, name: 'Rhythm: Ta-a-a in 4 meter'},
      { nid: 5, name: 'Rhythm: Anacrusis'},
      { nid: 6, name: 'Rhythm: Single Ti (and rest)'},
      { nid: 7, name: 'Melody: So [pentatonic'},
      { nid: 8, name: 'Melody: High Do'},
      { nid: 9, name: 'Melody: Re Pentatonic'},
      { nid: 10, name: 'Rhythm: 6/8 meter'},
      { nid: 11, name: 'Melody: fa'},
      { nid: 12, name: 'Melody: Do pentachord [scale'},
      { nid: 13, name: 'Rhythm: Tiri tiri'},
      { nid: 14, name: 'Melody: Do Hexachord scale'},
      { nid: 15, name: 'Rhythm: Ti Tiri'}
    ];

    return (
      <table>
        <tr>
          <th className={styles.th}></th>
          {classes.map(classInstance => <th className={styles.th}>{classInstance.date}</th>)}
        </tr>
        {nuggets.map(this.makeNuggetRow.bind(this))}
      </table>
    )
  }

  makeNuggetRow (nugget) {
    let courses = this.state.courses;
    let classes = _.first(courses).classes;
    return (
      <tr>
        <td className={styles.td}>{nugget.name}</td>
        {classes.map(classInstance => {
          let nuggets = classInstance.nuggets;
          let nid = nugget.nid;
          return (
            <td className={styles.td}>
              {(nuggets && nuggets[nid]) || (`class #${classInstance.id} - nugget #${nid}`)}
            </td>
          )
        })}
      </tr>
    );
  }
}