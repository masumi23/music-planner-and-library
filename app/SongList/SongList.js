import styles from './SongList.css';
import React from 'react';
import {Link} from 'react-router';

//"import" is thanks to "webpack"

export default class SongList extends React.Component {
  render() {
    var createItem = function(song, index) {
      return (
        <li key={index + song.id}>
          <Link to={`/song/${song.id}`}>{song.title}</Link>
        </li>
      );
    };
    // console.log(this.props.items);
    return <ul className={'col-xs-4 ' + styles.list}>{this.props.items.map(createItem)}</ul>
    // return <h1 className={styles.heading}>I am a songlist!</h1>;
  }
}
