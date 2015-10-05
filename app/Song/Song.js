import styles from './Song.css';

import React from 'react';
import SongButtons from '../SongButtons/SongButtons.js';
import SongDetailsProperties from '../SongDetailsProperties/SongDetailsProperties.js';
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
  }

	handleChange(e) {
  	// clone current song so we don't mutate state directly
  	let currSong = Object.assign({}, this.state.currentSong);
  	console.log(e.target.key, e.target.value);
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
	  	return null;
	  }

	  function makeContentEditableChunks(keys) {
	  	let chunks = keys.map((key) => (
	  		<div className={currentSong[key] || self.state.editMode ? '': 'hidden'}>
	  			<h4>{key}</h4>
		  		{self.makeContentEditable.call(self, key)}
				</div>
	  	));

	  	return <div>{chunks}</div>;
	  }

	  return (
			<div className={styles.song}>
				<h1 className="heading">
					{self.makeContentEditable.call(self, 'title')}
				</h1>

				<SongButtons
					className={styles.buttons}
					editMode={this.state.editMode}
					toggleEditMode={this.toggleEditMode.bind(this)}
					cancelEdit={this.cancelEdit.bind(this)}
					saveSongData={this.saveSongData.bind(this)}
					currentSong={this.state.currentSong}
				/>

				<div className="row">

					<SongDetailsProperties
						editMode={this.state.editMode}
						currentSong={this.state.currentSong}
						makeContentEditable={this.makeContentEditable.bind(this)}
					/>

				</div>
			</div>
		);
  }
}
