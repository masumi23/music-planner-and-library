import React from 'react';

import ContentEditable from '../ContentEditable/ContentEditable.js';

export default class SongDetailsProperties extends React.Component {

  render () {
  	console.debug('render Song Details')
  	let self = this;
  	let currentSong = this.props.currentSong

	  function makeContentEditableChunks(keys) {
	  	let chunks = keys.map((key) => (
	  		<div className={currentSong[key] || self.props.editMode ? '': 'hidden'}>
	  			<h4>{key}</h4>
		  		{self.props.makeContentEditable(key)}
				</div>
	  	));

	  	return <div>{chunks}</div>;
	  }

	  return (
	  	<div className="row">
				<div className="col-sm-4">
					<h3>Most Important</h3>
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
					<img
						src={currentSong.imgUrl}
						className={currentSong.imgUrl ? '' : 'hidden'} />
				</div>

				<div className="col-sm-4">
					<h3>Analysis Properties</h3>
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
					<h3>In these lists:</h3>
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
					<h3>Other Properties</h3>
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
	  );
  }

}