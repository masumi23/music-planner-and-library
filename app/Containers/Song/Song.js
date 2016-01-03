import styles from './Song.css';

import React from 'react';
import Actions from '../../actions/Actions';

import SongButtons from '../../Components/SongButtons/SongButtons.js';
import SongDetailsProperties from '../../Components/SongDetailsProperties/SongDetailsProperties.js';
import ContentEditable from '../../Components/ContentEditable/ContentEditable.js';

export default class Song extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      currentSong: null,
      printView: false
    };
  }

  componentWillReceiveProps(newProps) {
    let currentSong = newProps.songList[newProps.songID];
    console.log('getting new song ', currentSong);
    this.setState({currentSong: currentSong});
  }

  togglePrintView() {
    this.setState({printView: !this.state.printView});
    console.log('print view is ' + this.state.printView);
  }

  toggleEditMode() {
    this.setState({editMode: !this.state.editMode});
  }

  cancelEdit() {
    console.debug('Edit cancelled');
    this.setState({currentSong: this.props.songList[this.props.songID]});
    this.toggleEditMode();
  }

  saveSongData() {
    console.debug('Saving song data!', this.state.currentSong);
    // this.props.updateSong(this.state.currentSong);
    console.log(this.state.currentSong);
    Actions.updateSong({
      id: this.props.currentSongArrayID,
      song: this.state.currentSong
    });

    this.toggleEditMode();
  }

  handleChange(e) {
    // clone current song so we don't mutate state directly
    let currSong = Object.assign({}, this.state.currentSong);
    currSong[e.target.key] = e.target.value;
    this.setState({currentSong: currSong});
  }

  makeContentEditable(key) {
    let elem = (
      <ContentEditable
        contentEditable={this.state.editMode}
        className={this.state.editMode ?
          (this.state.currentSong[key] ?
            'bg-success' :
            'bg-info') :
          ''}
        html={this.state.currentSong[key] || ''}
        keyName={key}
        onChange={this.handleChange.bind(this)}
      />
    );

    return elem;
  }

  render() {
    console.debug('rendering');
    let self = this;
    let currentSong = this.state.currentSong;

    if (!currentSong) {
      return <div className={styles.song} />;
    }

    return (
      <div className={styles.song + (this.props.songList[this.props.songID] ? ' ' + styles['song-active'] : '')}>
        <h1 className="heading">
          {self.makeContentEditable.call(self, 'title')}
        </h1>

        <SongButtons
          currentSong={this.state.currentSong}
          className={styles.buttons}
          editMode={this.state.editMode}
          printView={this.state.printView}
          toggleEditMode={this.toggleEditMode.bind(this)}
          cancelEdit={this.cancelEdit.bind(this)}
          saveSongData={this.saveSongData.bind(this)}
          togglePrintView={this.togglePrintView.bind(this)}
          deleteCurrentSong={this.props.deleteCurrentSong}
          closeCurrentSong={this.props.closeCurrentSong}
        />

        <div className={styles.songDetailsPropertiesWrapper + ''}>

          <SongDetailsProperties
            currentSong={this.state.currentSong}
            editMode={this.state.editMode}
            makeContentEditable={this.makeContentEditable.bind(this)}
            printView={this.state.printView}
          />

        </div>
      </div>
    );
  }
}
