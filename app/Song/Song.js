import React from 'react';
import ContentEditable from '../ContentEditable/ContentEditable.js';

export default class Song extends React.Component {

  constructor(props) {
    super(props);
    console.log('constructor');
    this.state = {
    	editMode: false,
      currentSong: null
    };
  }

  componentWillReceiveProps(newProps) {
  	let currentSong = newProps.currentSong;
  	console.log('propsChanged');
  	console.log(newProps);
  	this.setState({currentSong: currentSong});
  }

  toggleEditMode() {
  	this.setState({editMode: !this.state.editMode});
  }

  cancelEdit() {
  	this.setState({currentSong: this.props.currentSong});
  	console.log(this.props.currentSong.title);
  	this.toggleEditMode();
  }

  saveSongData() {
  	console.log('Saving song data!');
  	console.log(this.state.currentSong);
  	this.props.updateSong(this.state.currentSong);
  	this.toggleEditMode();
  	// this.setState({editMode: !this.state.editMode});
  }

  handleChange(e) {
  	console.log('a change is coming!', e.target);
  	let currSong = this.state.currentSong;
  	currSong[e.target.key] = e.target.value;
  	this.setState({currentSong: currSong});
  }

  render() {
	  let currentSong = this.state.currentSong;
	  console.log('render');
	  console.log(this.state, this.props);

	  if (!currentSong) {
	  	return null;
	  }

	  console.log(currentSong.id);
		return (
			<div className="col-sm-8">
				<h1 className="heading">
					<ContentEditable
						contentEditable={this.state.editMode}
						html={this.state.currentSong.title}
						keyName={'title'}
						onChange={this.handleChange.bind(this)} />
				</h1>

				<div className={this.state.editMode ? 'hidden' : ''}>
					<button onClick={this.toggleEditMode.bind(this)}>{this.state.editMode ? 'Editing' : 'Click to Edit'}</button>
				</div>
				<div className={this.state.editMode ? '' : 'hidden'}>
					<button onClick={this.saveSongData.bind(this)}>Save Data</button>
					<button onClick={this.cancelEdit.bind(this)}>Cancel</button>
				</div>

				<h2>Most Important</h2>
				<div>toneSet: </div>
				<ContentEditable
					contentEditable={this.state.editMode}
					html={this.state.currentSong['toneSet']}
					onChange={this.handleChange} />

				<div>materials: </div>
				<ContentEditable
					contentEditable={this.state.editMode}
					html={this.state.currentSong['materials']}
					onChange={this.handleChange} />

				<div>title: </div>
				<ContentEditable
					contentEditable={this.state.editMode}
					html={this.state.currentSong['title']}
					onChange={this.handleChange} />

				<div>url: </div>
				<ContentEditable
					contentEditable={this.state.editMode}
					html={this.state.currentSong['url']}
					onChange={this.handleChange} />

				<div>goal: </div>
				<ContentEditable
					contentEditable={this.state.editMode}
					html={this.state.currentSong['goal']}
					onChange={this.handleChange} />

				<div>notes: </div>
				<ContentEditable
					contentEditable={this.state.editMode}
					html={this.state.currentSong['notes']}
					onChange={this.handleChange} />


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
