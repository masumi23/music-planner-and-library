// must fix add song

import styles from './SongView.css';

import React from 'react';
import SongList from '../../Components/SongList/SongList.js';
import TagList from '../../Components/TagList/TagList.js';
import Song from '../Song/Song.js';
import _ from 'lodash';

export default class SongView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSong: null,
      sort: false,
      filters: []
    };
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    let currentSongID = newProps.params.songID;
    let currentSong = _.find(this.props.songList, function(song){
        return (song.id+'') === currentSongID;
      }.bind(this));

    // TODO: implement flux
    // this.setState({
    //   currentSongID,
    //   currentSong
    // });
  }

  updateCurrentSong(updatedSong) {

    // TODO: implement flux
    // this.setState({currentSong: updatedSong});

    // clone list and update current song in list
    let i = _.findIndex(this.props.songList, this.state.currentSong);
    let diff = {};
    diff[i] = {$merge: updatedSong};

    console.log("update song " + this.props.songList[i].title);
    let newList = React.addons.update(this.props.songList, diff);

    // TODO: implement flux
    // this.setState({items: newList});
  }

  addSong() {
    console.log(this);
    let newSong = {
      title: 'Hi!',
      id: this.props.songList[this.props.songList.length - 1].id+1
    };

    let newList = React.addons.update(this.props.songList, {
      $push: [newSong]
    });

    // TODO: implement flux
    // this.setState({
    //   items: newList,
    //   currentSong: newSong
    // });
  }

  applyFilters(filters) {

    // TODO: implement flux
    // this.setState({
    //   filters: filters
    // });
  }

  closeCurrentSong() {
    // TODO: implement flux
    // this.setState({currentSong: null});
  }

  deleteCurrentSong() {
    let warning = 'Are you sure you want to delete this song?\nThis operation' +
                ' is not recoverable.\n\n' +
                'Press OK to delete the song permanently.';
    if (!confirm(warning)) {
      return false;
    }

    let i = _.findIndex(this.props.songList, this.state.currentSong);
    let newList = React.addons.update(this.props.songList, {
      $splice: [[i,1]]
    });
    console.log(newList);

    // TODO: implement flux
    // this.setState({items: newList});
    this.closeCurrentSong();
  }

  toggleSort() {

    // TODO: implement flux
    // this.setState({
    //   'sort': !this.state.sort
    // });
  }

  render () {

    let tagList = (
      <TagList
        songs={this.props.songList}
        applyFilters={this.applyFilters.bind(this)}
      />
    );

    return (
      <div className={styles.songView}>
        <div className={styles.nav}>
          <button onClick={this.addSong.bind(this)}>New Song</button>
          <button onClick={this.toggleSort.bind(this)}>Toggle Sort</button>
          {this.state.sort ? tagList : null}
        </div>

        <SongList
          songList={this.props.songList}
          filters={this.state.filters}
          addSong={this.addSong.bind(this)}/>

        <Song
          currentSong={this.state.currentSong}
          updateSong={this.updateCurrentSong.bind(this)}
          deleteCurrentSong={this.deleteCurrentSong.bind(this)}
          closeCurrentSong={this.closeCurrentSong.bind(this)}/>
      </div>
    );
  }
}