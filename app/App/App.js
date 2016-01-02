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

import Actions from '../actions/Actions';


var CHANGE_EVENT = 'change';

function makeStore(app) {
  window.app = app;

  return assign({}, EventEmitter.prototype, {

    /**
     * Get the entire data store.
     * @return {object}
     */
    getAll: function() {
      return app.state;
    },

    emitChange: function() {
      this.emit(CHANGE_EVENT);
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
    },

    dispatcherIndex: AppDispatcher.register(function(payload) {
      console.log('payload', payload);
      var action = payload.action;
      var text;

      switch(action.actionType) {
        case 'doop':
          console.log(action.num);
          app.setState({foo: action.num});
          app.Store.emitChange();
          break;

        case 'updateSong':
          var songList = app.state.songList.slice();
          songList[payload.action.id] = payload.action.song;

          app.setState({ songList: songList });
          console.log('---');
          console.log(songList[payload.action.id]);
          app.Store.emitChange();
          break;

        case 'addSong':
          app.Store.emitChange();
          break;

        case 'deleteSong':
          app.Store.emitChange();
          break;


      }

      return true; // No errors. Needed by promise in Dispatcher.
    })
  });
}


export default class App extends React.Component {
  // same thing as `getInitialState` in ES5
  constructor(props) {
    super(props);
    this.state = {
      songList: [],
      foo: 0
    };
  }

  componentDidMount() {
    this.Store = makeStore(this);
    this.Store.addChangeListener(this._onChange.bind(this));

    window.store = this.Store;

    // connect the state to Firebase using re-base
    this.base = Rebase.createClass('https://songdatabase.firebaseio.com/');
    this.fbRef = this.base.syncState('songList', {
      context: this,
      state: 'songList',
      asArray: true
    });

    this.fbRef = this.base.syncState('foo', {
      context: this,
      state: 'foo'
    });

    // sonar ping
    // setInterval(function(){
    //   console.log('sending...');
    //   Actions.doop(Math.random());
    // }, 2000);

  }

  componentWillUnmount() {
    this.Store.removeChangeListener(this._onChange.bind(this));
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
    this.setState(this.Store.getAll());
  }
}
