import React from 'react';
import CopyToClipboard from 'copy-to-clipboard';

export default class SongButtons extends React.Component{

  copySongToClipboard() {
  	let currentSong = this.props.currentSong;
  	let keysToCopy = [
  		'songKey',
  		'toneSet',
  		'materials',
  		'title',
  		'url',
  		'goal',
  		'procedure'
  	];

  	let textToCopy = keysToCopy
  		.map((key) => currentSong[key])
  		.join('\t');

		CopyToClipboard(textToCopy);
  }

  render() {

	  return (

		  <div>
			  <div>
					<div className={this.props.editMode ? 'hidden' : ''}>
						<button onClick={this.props.toggleEditMode}>
							{this.props.editMode ? 'Editing' : 'Click to Edit'}
						</button>

						<button onClick={this.props.togglePrintView}>
							{this.props.printView ? 'turn off Print View' : 'Print View'}
						</button>

						<button
							className="pull-right"
							onClick={this.copySongToClipboard.bind(this)}>
								Copy to Clipboard
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