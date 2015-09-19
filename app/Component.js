import styles from './Component.css';
import React from 'react';

export default class Hello extends React.Component {
  render() {
    return <h1 className={styles.heading}>Hello world</h1>;
  }
}
