// wishlist: Songs in alphabetical order. Find a safe way to delete songs without messing up the order

import styles from './SongList.css';
import React from 'react';
import {Link} from 'react-router';

//"import" is thanks to "webpack"

export default class SongList extends React.Component {

  songPassesFilter(song) {
    let tagsInSong = song.tagList ? song.tagList.split(',') : [];
    tagsInSong = tagsInSong.map((tag) => tag.trim());
    let unmatchedFilters = _.difference(this.props.filters, tagsInSong);
    console.log(this.props.filters);
    return unmatchedFilters.length === 0;
  }

  render() {
    let createItem = function(song, index) {
      return (
        <li key={index + song.id}>
          <Link to={`/song/${song.id}`}>{song.title}</Link>
        </li>
      );
    };

    let items = this.props.items.filter(this.songPassesFilter.bind(this));
    // console.log(this.props.items);
    return (
      <div>
        <ul className={'col-xs-4 ' + styles.list}>
          <li><button onClick={this.props.addSong}>New Song</button></li>
          {items.map(createItem)}
        </ul>
      </div>
    );
    // return <h1 className={styles.heading}>I am a songlist!</h1>;
  }
}
