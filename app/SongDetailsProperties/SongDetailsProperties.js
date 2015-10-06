import React from 'react';

import ContentEditable from '../ContentEditable/ContentEditable.js';
import Score from '../Score/Score.js';

export default class SongDetailsProperties extends React.Component {

  makeContentEditableChunks(keys) {
  	let chunks = keys.map((key) => (
  		<div className={this.props.currentSong[key] || this.props.editMode ? '': 'hidden'}>
  			<h4>{key}</h4>
	  		{this.props.makeContentEditable(key)}
			</div>
  	));

  	return <div>{chunks}</div>;
  }

  render () {
  	console.debug('render Song Details')
  	let self = this;
  	let currentSong = this.props.currentSong;

	  if (!this.props.printView) {

		  return (
		  	<div className="row">
		  		<Score scoreNotation="currentSong.scoreNotation"></Score>
					<div className="col-sm-4">
						<h3>Most Important</h3>
						{self.makeContentEditableChunks.call(self, [
							'songKey',
							'toneSet',
							'materials',
							'title',
							'url',
							'goal',
							'procedure',
							'imgUrl',
							'scoreNotation'
						])}
						<img
							src={currentSong.imgUrl}
							className={currentSong.imgUrl ? '' : 'hidden'}
						/>

					</div>

					<div className="col-sm-4">
						<h3>Analysis Properties</h3>
						{self.makeContentEditableChunks.call(self, [
							'toneSet',
							'scale',
							'meter',
							'rhythmSet',
							'formAnalysis',
							'formType',
							'songType',
							'subjects',
							'gameType',
							'measures',
							'range',
							'gradeFloor',
							'gradeCeil',
							'startingPitch',
							'songKey',
							'tonalCenter'
						])}
						<h3>Pedagogic Analysis</h3>
						{self.makeContentEditableChunks.call(self, [
							'mElement',
							'mContext',
							'mMotives',
							'rElement',
							'rContext',
							'rMotives',
							'partWork',
							'otherUses'
						])}
					</div>

					<div className="col-sm-4">
						<h3>In these lists:</h3>
						{self.makeContentEditableChunks.call(self, [
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
						{self.makeContentEditableChunks.call(self, [
							'generalNotes',
							'textualSource',
							'informantPerformer',
							'origin',
							'region',
							'source',
							'state',
							'subSubject'
						])}
					</div>
				</div>
		  );

	  } else {

	  	return (
	  		<div className="row">
	  			<div>Informant/Performer: {currentSong.informantPerformer}</div>
	  			<div>Source: {currentSong.textualSource}</div>
	  			<div className="col-sm-4">
		  			<h3>Analysis Properties</h3>
							{self.makeContentEditableChunks.call(self, [
								'toneSet',
								'scale',
								'meter',
								'rhythmSet',
								'formAnalysis',
								'formType',
								'songType',
								'subjects',
								'gameType',
								'measures',
								'range',
								'gradeFloor',
								'gradeCeil',
								'startingPitch',
								'songKey',
								'tonalCenter'
							])}
							<h3>Pedagogic Analysis</h3>
							{self.makeContentEditableChunks.call(self, [
								'mElement',
								'mContext',
								'mMotives',
								'rElement',
								'rContext',
								'rMotives',
								'partWork',
								'otherUses'
							])}
						</div>
						<div className="col-sm-8">
							<img
								src={currentSong.imgUrl}
								className={currentSong.imgUrl ? '' : 'hidden'}
							/>
						</div>
	  		</div>
	  	);
	  }

  }

}