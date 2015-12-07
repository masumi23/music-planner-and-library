import React from 'react';

export default class PlanView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			macroPlan: true
		};
	}

	render () {

		if (this.state.macroPlan === true) {
			return (
				<div>poo</div>
			)
		};
	}
}