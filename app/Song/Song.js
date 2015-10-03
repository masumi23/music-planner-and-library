import styles from './Song.css';

import React from 'react';
import ContentEditable from '../ContentEditable/ContentEditable.js';
import CopyToClipboard from 'react-copy-to-clipboard';

export default class Song extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	editMode: false,
      currentSong: null,
      copyValue: 'poo',
      copied: false
    };
  }

  componentWillReceiveProps(newProps) {
  	let currentSong = newProps.currentSong;
  	this.setState({currentSong: currentSong});
  	this.prepareSongForCopying(currentSong);
  }

  prepareSongForCopying(cS = this.state.currentSong) {
  	if (!cS) return false;

  	this.setState({copyValue:
  		cS.songKey + '&nbsp' +
  		cS.toneSet + ' ' +
  		cS.materials +
  		cS.title +
  		cS.url +
  		cS.goal +
  		cS.procedure
  	});
  	console.log('prepared for copying ' + cS.title);
  }

  toggleEditMode() {
  	this.setState({editMode: !this.state.editMode});
  }

  cancelEdit() {
  	console.debug('Edit cancelled');
  	this.setState({currentSong: this.props.currentSong});
  	this.toggleEditMode();
  }

  saveSongData() {
  	console.debug('Saving song data!', this.state.currentSong);
  	this.props.updateSong(this.state.currentSong);
  	this.toggleEditMode();
  	this.prepareSongForCopying(currentSong);
  	// this.setState({editMode: !this.state.editMode});
  }

  handleChange(e) {
  	// clone current song so we don't mutate state directly
  	let currSong = Object.assign({}, this.state.currentSong);
  	console.log(e.target.key, e.target.value);
  	currSong[e.target.key] = e.target.value;
  	this.setState({currentSong: currSong});
  }

  render() {
	  console.debug('rendering');
	  let self = this;
	  let currentSong = this.state.currentSong;

	  if (!currentSong) {
	  	return null;
	  }

	  function makeContentEditable(key) {
	  	let elem = (
	  		<ContentEditable
					contentEditable={self.state.editMode}
					html={self.state.currentSong[key]}
					keyName={key}
					onChange={self.handleChange.bind(self)} />
	  	);

	  	return elem;
	  }

	  function makeContentEditableChunks(keys) {
	  	let chunks = keys.map((key) => (
	  		<div className={currentSong[key] || self.state.editMode ? '': 'hidden'}>
	  			<h4>{key}</h4>
		  		{makeContentEditable(key)}
				</div>
	  	));

	  	return <div>{chunks}</div>;
	  }

	  function copySong() {
	  	this.setState({copied: true});
	  }

		return (
			<div className={styles.song}>
				<h1 className="heading">
					{makeContentEditable('title')}
				</h1>

				<div className={this.state.editMode ? 'hidden' : ''}>
					<button onClick={this.toggleEditMode.bind(this)}>
						{this.state.editMode ? 'Editing' : 'Click to Edit'}
					</button>

					<CopyToClipboard
							className="pull-right"
							text={this.state.copyValue}
							onCopy={copySong.bind(this)}>
						<button>Copy to Clipboard</button>
					</CopyToClipboard>
				</div>


				<div className={this.state.editMode ? '' : 'hidden'}>
					<button onClick={this.saveSongData.bind(this)}>
						Save Data
					</button>
					<button onClick={this.cancelEdit.bind(this)}>
						Cancel
					</button>
				</div>

				<div className="row">
					<div className="col-sm-4">
						<h2>Most Important</h2>
						{makeContentEditableChunks([
							'songKey',
							'toneSet',
							'materials',
							'title',
							'url',
							'goal',
							'procedure',
							'imgUrl'
						])}
					</div>

					<div className="col-sm-4">
						<h2>Analysis Properties</h2>
						{makeContentEditableChunks([
							'toneSet',
							'scale',
							'rhythmSet',
							'formAnalysis',
							'startingPitch',
							'songKey',
							'gradeFloor',
							'range',
							'gradeCeil',
							'tonalCenter',
							'formType'
						])}
					</div>

					<div className="col-sm-4">
						<h2>In these lists:</h2>
						{makeContentEditableChunks([
							'pentatonic',
							'taTiti',
							'soMi',
							'2meter',
							'beatRhythm',
							'highLow',
							'la',
							're',
							'ta-a',
							'gameElement',
							'danceMovement'
						])}
						<h2>Other Properties</h2>
						{makeContentEditableChunks([
							'generalNotes',
							'textualSource',
							'informantPerformer',
							'origin',
							'region',
							'songTypes',
							'source',
							'state',
							'subSubject',
							'subjects'
						])}
					</div>
				</div>
			</div>
		);
  }
}
