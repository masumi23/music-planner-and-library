import React from 'react';

export default class ContentEditable extends React.Component {
  constructor() {
    super();
    this.emitChange = this.emitChange.bind(this);
  }

  render() {
    return <div
      {...this.props}
      onInput={this.emitChange}
      onBlur={this.emitChange}
      contentEditable={this.props.contentEditable}
      dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== React.findDOMNode(this).innerHTML ||
           this.props.contentEditable !== nextProps.contentEditable;
  }

  componentDidUpdate() {
    if ( this.props.html !== React.findDOMNode(this).innerHTML ) {
     React.findDOMNode(this).innerHTML = this.props.html;
    }
  }

  emitChange(evt) {
    var html = React.findDOMNode(this).innerText;
    if (this.props.onChange && html !== this.lastHtml) {
      evt.target = { value: html, key: this.props.keyName };
      this.props.onChange(evt);
    }
    this.lastHtml = html;
  }
}