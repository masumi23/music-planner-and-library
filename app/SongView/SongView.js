import React from 'react';
import SongList from '../SongList/SongList.js';
import Song from '../Song/Song.js';
import Firebase from 'firebase';
import Rebase from 're-base';
import _ from 'lodash';

export default class SongView extends React.Component {
 	constructor(props) {
	  super(props);
	  this.state = {
	    items: [],
	    currentSong: null
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

  render () {
  	return (
  		<div>
	  		<SongList
	        items={this.state.items}
	        addSong={this.addSong.bind(this)}/>

	    	<Song
	        currentSong={this.state.currentSong}
	        updateSong={this.updateCurrentSong.bind(this)}
	        deleteCurrentSong={this.deleteCurrentSong.bind(this)}/>
      </div>
  	);
  }
}