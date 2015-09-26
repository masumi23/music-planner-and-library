import React from 'react';

export default class Song extends React.Component {

  render() {
	  let currentSong = this.props.currentSong;

	  if (!currentSong) {
	  	return null;
	  }

	  console.log(currentSong.id);
		return (
			<div className="col-sm-8">
				<h1 className="heading">
					{currentSong.title}
				</h1>
				<h2>Most Important</h2>
				<div>toneSet: <span>{currentSong.toneSet}</span></div>
				<div>materials: <span>{currentSong.materials}</span></div>
				<div>title: <span>{currentSong.title}</span></div>
				<div>url: <span>{currentSong.url}</span></div>
				<div>goal: <span>{currentSong.goal}</span></div>
				<div>notes: <span>{currentSong.notes}</span></div>

				<h2>Analysis Properties</h2>
				<div>gradeFloor: <span>{currentSong.gradeFloor}</span></div>
				<div>gradeCeil: <span>{currentSong.gradeCeil}</span></div>
				<div>toneSet: <span>{currentSong.toneSet}</span></div>
				<div>range: <span>{currentSong.range}</span></div>
				<div>startingPitch: <span>{currentSong.startingPitch}</span></div>
				<div>scale: <span>{currentSong.scale}</span></div>
				<div>formAnalysis: <span>{currentSong.formAnalysis}</span></div>
				<div>rhythmSet: <span>{currentSong.rhythmSet}</span></div>
				<div>tonalCenter: <span>{currentSong.tonalCenter}</span></div>
				<div>formType: <span>{currentSong.formType}</span></div>


				<h2>Other Properties</h2>
				<div>informantPerformer: <span>{currentSong.informantPerformer}</span></div>
				<div>origin: <span>{currentSong.origin}</span></div>
				<div>region: <span>{currentSong.region}</span></div>
				<div>songTypes: <span>{currentSong.songTypes}</span></div>
				<div>source: <span>{currentSong.source}</span></div>
				<div>state: <span>{currentSong.state}</span></div>
				<div>subSubject: <span>{currentSong.subSubject}</span></div>
				<div>subjects: <span>{currentSong.subjects}</span></div>
			</div>
		);
  }
}
