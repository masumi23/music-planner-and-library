import styles from './TagList.css';
import React from 'react';
import _ from 'lodash';

export default class SongView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getValidTags() {
    let tags = this.props.songs.reduce((tagList, song) => {
      let tagsInSong = song.tagList ? song.tagList.split(',') : [];
      return _.union(tagList, tagsInSong);
    }, []);

    let trimmedTags = tags
      .map((tag) => tag.trim()) // trim white-space
      .filter((tag) => !!tag); // remove empty tags due to trailing commas

    return _.uniq(trimmedTags);
  }

  handleClick(e) {
    if (!e) {
      this.props.applyFilters([]);
    }
    let filters = [e.currentTarget.textContent.trim()];
    this.props.applyFilters(filters);
  }

  render() {
    let tags = this.getValidTags();
    return <ul className={'col-xs-4 pull-right ' + styles.list}>
      <li><a onClick={this.handleClick.bind(this, null)}>Clear Filters</a></li>
      {tags.map((tag) => <li><a onClick={this.handleClick.bind(this)}>{tag}</a></li>)}
    </ul>
  }

}