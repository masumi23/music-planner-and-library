import styles from './MacroView.css';

import React from 'react';
import _ from 'lodash';

import Actions from '../../actions/Actions';
import ContentEditable from '../../Components/ContentEditable/ContentEditable.js';


export default class MacroView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentCourse: null,
      classes: []
    };
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.courses || !newProps.classes) return false;

    let courses = newProps.courses;
    let currentCourse = this.state.currentCourse || _.first(courses);
    let classIDs = currentCourse.classes;
    let classes = newProps.classes.filter((c) => _.includes(classIDs, c.id));
    this.setState({
      classes,
      currentCourse
    });
  }

  render () {
    if (!this.state.classes) return null;

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
        <tbody>
          <tr>
            <th className={styles.th}></th>
            {this.state.classes.map(classInstance => <th className={styles.th} key={classInstance.id+'-heading'}>{classInstance.date}</th>)}
          </tr>
          {nuggets.map(this.makeNuggetRow.bind(this))}
        </tbody>
      </table>
    )
  }

  makeNuggetRow (nugget) {
    let courses = this.state.courses;
    let classes = this.state.classes;
    let nuggetID = nugget.nid;
    return (
      <tr key={nugget.nid}>
        <td className={styles.td}>{nugget.name}</td>
        {classes.map(classInstance => {
          let nuggets = classInstance.nuggets;
          return (
            <td className={styles.td} key={`${classInstance.id}-${nuggetID}`}>
              {this.makeContentEditable.call(this, classInstance, nuggetID)}
            </td>
          )
        })}
      </tr>
    );
  }

  makeContentEditable(classInstance, nuggetID) {
    let key = 'ce-' + classInstance.id + '-' + nuggetID;
    // console.log(this.state.currentCourse);
    // let classInstance = this.state.currentCourse.classes[classID];
    let nugget = classInstance.nuggets[nuggetID];

    let elem = (
      <ContentEditable
        contentEditable={true}
        html={(nugget && nugget.text) || ''}
        key={key}
        onChange={this.handleChange.bind(this, classInstance, nuggetID)}
      />
    );

    return elem;
  }

  handleChange(classInstance, nuggetID, e) {
    console.log(this, classInstance, nuggetID, e);
    let classID = _.findIndex(this.state.classes, classInstance);
    let classClone = _.clone(classInstance)
    classClone.nuggets[nuggetID].text = e.target.value;
    console.log(classID, classClone);

    Actions.updateClass({
      classID,
      classInstance: classClone
    });
  }
}