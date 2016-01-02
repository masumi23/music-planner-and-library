import styles from './App.css';

import React from 'react';
import GlobalNav from './../Components/GlobalNav/GlobalNav.js';
import SongView from './../Containers/SongView/SongView.js';
import CourseView from './../Containers/CourseView/CourseView.js';

import { Link } from 'react-router';

// store
import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import assign from 'object-assign';

import Firebase from 'firebase';
import Rebase from 're-base';
// import _ from 'lodash';


var CHANGE_EVENT = 'change';

function makeStore(app) {

  return assign({}, EventEmitter.prototype, {

    /**
     * Get the entire data store.
     * @return {object}
     */
    getAll: function() {
      return app.state;
    },

    emitChange: function() {
      this.emit('change');
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }
  });
}


export default class App extends React.Component {
  // same thing as `getInitialState` in ES5
  constructor(props) {
    super(props);
    this.state = {
      songList: []
    };
  }

  componentDidMount() {
    this.Store = makeStore(this);
    this.Store.addChangeListener(this._onChange);

    window.store = this.Store;

    // connect the state to Firebase using re-base
    this.base = Rebase.createClass('https://songdatabase.firebaseio.com/');
    this.fbRef = this.base.syncState('songList', {
      context: this,
      state: 'songList',
      asArray: true
    });
  }

  componentWillUnmount() {
    this.Store.removeChangeListener(this._onChange);
    this.base.removeBinding(this.fbRef);
  }

  render() {
    window.foo = this.state;
    return (
      <div className={styles.app}>
        <GlobalNav className={styles.globalNav}/>

        <div className={styles.mainComponent}>
          {React.cloneElement(this.props.children, this.state)}
        </div>
      </div>
    );
  }

  _onChange() {
    this.setState(Store.getAll());
  }
}
