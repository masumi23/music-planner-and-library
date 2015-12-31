//Compile a list of all tags
//Left list is all tags

//On Tag view, you can chose what will be displayed as each header.
//Click on header to sort by that header. Right click on list to change header.

//Title, toneSet, RhythmicElements, Context, ageLevel, teachingPurpose

import React from 'react';
import Firebase from 'firebase';
import Rebase from 're-base';
import _ from 'lodash';
import TagView from '../TagView/TagView.js'

export default class TagView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentTag: null
    };
  }

  componentWillMount() {
    this.base = Rebase.createClass('https://songdatabase.firebaseio.com/');
  }

  componentDidMount() {
    this.fbRef = this.base.syncState('songList', {
      context: this,
      state: 'items',
      asArray: true
    });
  }

  componentWillUnmount(){
    this.base.removeBinding(this.fbRef);
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);

    });
  }

  makeTagList() {

  }

  render () {
    return (
      <div>
        <TagList/>

        <Tag
          currentTag={this.state.currentTag}
          //need to create the following functions
          updateTag={this.updateCurrentTag.bind(this)}
          deleteCurrentTag={this.deleteCurrentTag.bind(this)}/>
      </div>
    );
  }
}