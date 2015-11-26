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
        <li key={index + song.id} className={'row list-group-item ' + styles['list-item']}>
          <Link to={`/song/${song.id}`}>
            <div className={'col-sm-2 ' + styles.songProp + ' ' + styles.songTitle}>{song.title || '-'}</div>
            <div className={'col-sm-1 ' + styles.songProp + ' ' + styles.songToneSet}>{song.toneSet || '-'}</div>
            <div className={'col-sm-1 ' + styles.songProp + ' ' + styles.songScale}>{song.scale || '-'}</div>
            <div className={'col-sm-1 ' + styles.songProp + ' ' + styles.songMElement}>{song.mElement || '-'}</div>
            <div className={'col-sm-1 ' + styles.songProp + ' ' + styles.songMContext}>{song.mContext || '-'}</div>
            <div className={'col-sm-2 ' + styles.songProp + ' ' + styles.songMMotives}>{song.mMotives || '-'}</div>
            <div className={'col-sm-1 ' + styles.songProp + ' ' + styles.songRElement}>{song.rElement || '-'}</div>
            <div className={'col-sm-3 ' + styles.songProp + ' ' + styles.songRMotives}>{song.rMotives || '-'}</div>
          </Link>
        </li>
      );
    };

    let items = this.props.items.filter(this.songPassesFilter.bind(this));
    // console.log(this.props.items);
    return (
      <div className={styles.wrapper}>
        <ul className='list-group'>
          <li className={styles.header + ' row list-group-item'}>
            <div className={'col-sm-2 ' + styles.songProp + ' ' + styles.songTitle}>Title</div>
            <div className={'col-sm-1 ' + styles.songProp + ' ' + styles.songToneSet}>Tone Set</div>
            <div className={'col-sm-1 ' + styles.songProp + ' ' + styles.songScale}>Scale</div>
            <div className={'col-sm-1 ' + styles.songProp + ' ' + styles.songMElement}>M-Element</div>
            <div className={'col-sm-1 ' + styles.songProp + ' ' + styles.songMContext}>M-Context</div>
            <div className={'col-sm-2 ' + styles.songProp + ' ' + styles.songMMotives}>M-Motives</div>
            <div className={'col-sm-1 ' + styles.songProp + ' ' + styles.songRElement}>R-Element</div>
            <div className={'col-sm-3 ' + styles.songProp + ' ' + styles.songRMotives}>R-Motives</div>
          </li>
        </ul>
        <ul className={'list-group ' + styles.list}>
          {items.map(createItem)}
        </ul>
      </div>
    );
    // return <h1 className={styles.heading}>I am a songlist!</h1>;
  }
}
