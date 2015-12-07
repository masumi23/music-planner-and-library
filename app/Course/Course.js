import React from 'react';
import CourseButtons from '../CourseButtons/CourseButtons.js';
import PlanView from '../PlanView/PlanView.js';

export default class Course extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
	    planView: true
	  };
	}

	render () {
		console.log('render');
		if ( this.state.planView === true) {
			return (
				<div>
					<div>
						Song List
					</div>
					<PlanView/>
				</div>
			);
		}
	}
}