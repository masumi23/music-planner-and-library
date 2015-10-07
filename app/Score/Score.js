import React from 'react';

export default class Score extends React.Component {

  componentDidMount() {
    this.renderScore();
  }

  componentDidUpdate() {
    this.renderScore();

  }

  renderScore() {
    let domNode = React.findDOMNode(this.refs.score);
    window.ABCJS.renderAbc(domNode, this.props.scoreNotation);
  }

  render() {
    if (!this.props.scoreNotation) return null;
    return (
      <div ref="score"></div>
    );
  }
}