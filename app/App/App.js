import React from 'react';
import SongList from '../SongList/SongList.js';
import Song from '../Song/Song.js';
import Firebase from 'firebase';
import Rebase from 're-base';
import _ from 'lodash';

export default class App extends React.Component {
  // same thing as `getInitialState` in ES5
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
    let currentSongID = newProps.params.songId;
    let currentSong = _.find(this.state.items, function(song){
        return (song.id+'') === currentSongID;
      }.bind(this));

    this.setState({
      currentSong
    });
    console.log(currentSong);
  }

  updateCurrentSong(updatedSong) {
    console.log('updateCurrentSong called with ', updatedSong);
    this.setState({currentSong: updatedSong});

    // I'm only calling this because otherwise, rebase won't sync the changes
    // to the currentSong
    this.setState({items: this.state.items});
  }

  render() {

    return (
      <div>
        <SongList items={this.state.items}/>

        <Song
          currentSong={this.state.currentSong}
          updateSong={this.updateCurrentSong.bind(this)}/>

      </div>
    );
  }
}
