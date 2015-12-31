import styles from './SongButtons.css';

import React from 'react';
import CopyToClipboard from 'copy-to-clipboard';
import Mousetrap from 'mousetrap';

export default class SongButtons extends React.Component {

  componentDidMount() {
    Mousetrap.bind(['ctrl+c'], this.copySongToClipboard.bind(this));
  }

  componentWillUnmount() {
    Mousetrap.unbind(['ctrl+c'], this.copySongToClipboard.bind(this));
  }

  copySongToClipboard() {
    let currentSong = this.props.currentSong;
    let keysToCopy = [

      'startingPitch',
      'toneSet',
      'materials',
      'title'
    ];

    let textToCopy = keysToCopy
      .map((key) => currentSong[key] || 'x')
      .join('\t');

    CopyToClipboard(textToCopy);

    // TODO add "copied" toast
  }

  render() {

    return (

      <div>
        <div>
          <div className={this.props.editMode ? 'hidden' : ''}>
            <button
              onClick={this.props.closeCurrentSong}
              className={styles.closeBtn}>
                X
            </button>

            <button onClick={this.props.toggleEditMode}>
              {this.props.editMode ? 'Editing' : 'Click to Edit'}
            </button>

            <button onClick={this.props.togglePrintView}>
              {this.props.printView ? 'turn off Print View' : 'Print View'}
            </button>

            <button
              onClick={this.copySongToClipboard.bind(this)}>
                Copy to Clipboard
            </button>

            <button
              onClick={this.props.deleteCurrentSong}
              className="pull-right">
                Delete Song
            </button>
          </div>
        </div>


        <div className={this.props.editMode ? '' : ' hidden'}>
          <button onClick={this.props.saveSongData}>
            Save Data
          </button>
          <button onClick={this.props.cancelEdit}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}