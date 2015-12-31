import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default class Score extends React.Component {

  constructor(props) {
    super(props);
    this.state = {debouncedRenderingTime: 100};
    this._debounceRenderScore();
  }

  componentDidMount() {
    this.renderScore();
  }

  componentDidUpdate() {
    this.renderScore();
  }

  _debounceRenderScore() {
    let delay = this.state.debouncedRenderingTime;
    this.renderScore = _.throttle(this._renderScore.bind(this), delay);
  }

  _renderScore() {
    let startTime = Date.now();

    let domNode = ReactDOM.findDOMNode(this.refs.score);
    window.ABCJS.renderAbc(domNode, this.props.scoreNotation);

    let duration = Date.now() - startTime;

    // if it takes 4/5 of the time or longer, bump up the debounce time
    if (duration > this.state.debouncedRenderingTime*1.25) {
      this.setState({debouncedRenderingTime: duration});
      this._debounceRenderScore();
    }
  }

  render() {
    if (!this.props.scoreNotation) return null;
    return (
      <div ref="score"></div>
    );
  }
}