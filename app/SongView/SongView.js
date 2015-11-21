// must fix add song

import style from './SongView.css'

import React from 'react';
import SongList from '../SongList/SongList.js';
import TagList from '../TagList/TagList.js';
import Song from '../Song/Song.js';
import Firebase from 'firebase';
import Rebase from 're-base';
import _ from 'lodash';

export default class SongView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentSong: null,
      sort: false,
      filters: []
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
    let currentSongID = newProps.params.songID;
    let currentSong = _.find(this.state.items, function(song){
        return (song.id+'') === currentSongID;
      }.bind(this));

    this.setState({
      currentSongID,
      currentSong
    });
  }

  updateCurrentSong(updatedSong) {
    console.log(this);
    this.setState({currentSong: updatedSong});

    // clone list and update current song in list
    let i = _.findIndex(this.state.items, this.state.currentSong);
    let diff = {};
    diff[i] = {$merge: updatedSong};

    console.log("update song " + this.state.items[i].title);
    let newList = React.addons.update(this.state.items, diff);

    this.setState({items: newList});
  }

  addSong() {
    console.log(this);
    let newSong = {
      title: 'Hi!',
      id: this.state.items[this.state.items.length - 1].id+1
    };

    let newList = React.addons.update(this.state.items, {
      $push: [newSong]
    });

    this.setState({
      items: newList,
      currentSong: newSong
    });
  }

  applyFilters(filters) {
    console.log("filter set: " + filters);
    this.setState({
      filters: filters
    });
  }

  deleteCurrentSong() {
    let warning = 'Are you sure you want to delete this song?\nThis operation' +
                ' is not recoverable.\n\n' +
                'Press OK to delete the song permanently.';
    if (!confirm(warning)) {
      return false;
    }

    let i = _.findIndex(this.state.items, this.state.currentSong);
    let newList = React.addons.update(this.state.items, {
      $splice: [[i,1]]
    });
    console.log(newList);
    this.setState({items: newList});
    this.setState({currentSong: null});
  }

  toggleSort() {
    console.log(this);
    this.setState({
      'sort': !this.state.sort
    });
  }

  render () {

    let tagList = (
      <TagList
        songs={this.state.items}
        applyFilters={this.applyFilters.bind(this)}
      />
    );

  	return (
  		<div>
        <button onClick={this.addSong}>New Song</button>
        <button onClick={this.toggleSort.bind(this)}>Toggle Sort</button>

        <SongList
          items={this.state.items}
          filters={this.state.filters}
          addSong={this.addSong.bind(this)}/>

        {this.state.sort ? tagList : null}

	    	<Song
	        currentSong={this.state.currentSong}
	        updateSong={this.updateCurrentSong.bind(this)}
	        deleteCurrentSong={this.deleteCurrentSong.bind(this)}/>
      </div>
  	);
  }
}