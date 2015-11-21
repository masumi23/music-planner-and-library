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
    console.log(unmatchedFilters);
    return unmatchedFilters.length === 0;
  }

  render() {
    let createItem = function(song, index) {
      return (
        <li key={index + song.id} className='row'>
          <Link to={`/song/${song.id}`}>
            <div>
              <div className={'col-sm-2 ' + styles.songTitle}>{song.title}</div>
              <div className={'col-sm-1 ' + styles.songToneSet}>{song.toneSet}</div>
              <div className={'col-sm-1 ' + styles.songScale}>{song.scale}</div>
              <div className={'col-sm-1 ' + styles.songMElement}>{song.mElement}</div>
              <div className={'col-sm-1 ' + styles.songMContext}>{song.mContext}</div>
              <div className={'col-sm-3 ' + styles.songMMotives}>{song.mMotives}</div>
              <div className={'col-sm-1 ' + styles.songRElement}>{song.rElement}</div>
              <div className={'col-sm-2 ' + styles.songRMotives}>{song.rMotives}</div>
            </div>
          </Link>
        </li>
      );
    };

    let items = this.props.items.filter(this.songPassesFilter.bind(this));
    // console.log(this.props.items);
    return (
      <div className={styles.wrapper}>
        <div className={styles.header + ' row'}>
          <div className={'col-sm-2 ' + styles.songTitle}>Title</div>
          <div className={'col-sm-1 ' + styles.songToneSet}>Tone Set</div>
          <div className={'col-sm-1 ' + styles.songScale}>Scale</div>
          <div className={'col-sm-1 ' + styles.songMElement}>M-Element</div>
          <div className={'col-sm-1 ' + styles.songMContext}>M-Context</div>
          <div className={'col-sm-2 ' + styles.songMMotives}>M-Motives</div>
          <div className={'col-sm-1 ' + styles.songRElement}>R-Element</div>
          <div className={'col-sm-3 ' + styles.songRMotives}>R-Motives</div>
        </div>
        <ul className={'col-xs-4 ' + styles.list}>
          {items.map(createItem)}
        </ul>
      </div>
    );
    // return <h1 className={styles.heading}>I am a songlist!</h1>;
  }
}
