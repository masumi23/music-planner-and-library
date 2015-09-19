import styles from './App.css';
import React from 'react';
import Hello from '../Hello/Hello.js';
import WhatsUp from '../WhatsUp/WhatsUp.js';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Hello />
        <WhatsUp />
      </div>
    );
  }
}
