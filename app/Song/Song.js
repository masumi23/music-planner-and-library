import React from 'react';
import ContentEditable from '../ContentEditable/ContentEditable.js';

export default class Song extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	editMode: false,
      currentSong: null
    };
  }

  componentWillReceiveProps(newProps) {
  	let currentSong = newProps.currentSong;
  	this.setState({currentSong: currentSong});
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
	  		<div>
	  			<h4>{key}</h4>
		  		{makeContentEditable(key)}
				</div>
	  	));

	  	return <div>{chunks}</div>;
	  }

		return (
			<div className="col-sm-8">
				<h1 className="heading">
					{makeContentEditable('title')}
				</h1>

				<div className={this.state.editMode ? 'hidden' : ''}>
					<button onClick={this.toggleEditMode.bind(this)}>{this.state.editMode ? 'Editing' : 'Click to Edit'}</button>
				</div>
				<div className={this.state.editMode ? '' : 'hidden'}>
					<button onClick={this.saveSongData.bind(this)}>Save Data</button>
					<button onClick={this.cancelEdit.bind(this)}>Cancel</button>
				</div>

				<h2>Most Important</h2>
				{makeContentEditableChunks([
					'toneSet',
					'materials',
					'title',
					'url',
					'goal',
					'notes'
				])}

				<h2>Analysis Properties</h2>
				{makeContentEditableChunks([
					'gradeFloor',
					'gradeCeil',
					'toneSet',
					'range',
					'startingPitch',
					'scale',
					'formAnalysis',
					'rhythmSet',
					'tonalCenter',
					'formType'
				])}

				<h2>Other Properties</h2>
				{makeContentEditableChunks([
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
		);
  }
}
