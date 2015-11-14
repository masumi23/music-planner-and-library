
import styles from './SongDetailsProperties.css';
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

	  if (this.props.printView) {

		  return (
	  		<div className="row">
	  			<div className="styles.generalInfo">
		  			<div>Informant/Performer: {currentSong.informantPerformer}</div>
		  			<div>Source: {currentSong.textualSource}</div>
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
						<div className="col-sm-8">
							<img
								src={currentSong.imgUrl}
								className={currentSong.imgUrl ? '' : 'hidden'}
							/>
						</div>
	  		</div>
	  	);

	  } else {
	  	return (
		  	<div className="row">
		  		<Score scoreNotation={currentSong.scoreNotation}></Score>
		  		<div className={'col-xs-12 ' + styles.scoreNotationInput + (this.props.editMode ? '': ' hidden')}>
			  		{this.props.makeContentEditable('scoreNotation')}
		  		</div>
					<div className="col-sm-4">
						<h3>Most Important</h3>
						{self.makeContentEditableChunks.call(self, [
							'startingPitch',
							'toneSet',
							'materials',
							'title',
							'url',
							'goal',
							'procedure'
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
							'tonalCenter',
							'rhythmSet',
							'CSP range',
							'formAnalysis',
							'formType',
							'songType',
							'subjects',
							'gameType',
							'measures',
							'range',
							'gradeFloor',
							'gradeCeil',
							'songKey',
							'altTitle'
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
							'otherUses',
							'shapes',
							'varientLink'
						])}
					</div>

					<div className="col-sm-4">
						<h3>Has tags (transition out of boolean):</h3>
						{self.makeContentEditableChunks.call(self, [
							'tagList',
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
							'danceMovement',
							'moodOf5th',
							'improvisation',
							'complete'
						])}
						<h3>Other Properties</h3>
						{self.makeContentEditableChunks.call(self, [
							'generalNotes',
							'lyrics',
							'textualSource',
							'informantPerformer',
							'origin',
							'region',
							'ethnicity',
							'source',
							'state',
							'subSubject',
							'altTitle'
						])}
					</div>
				</div>
		  );

	  }

  }

}