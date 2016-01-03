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
        case 'updateSong':
          app.base.post(`songs/${action.id}`, {
            data: action.song
          });
          break;

        case 'addSong':
          app.Store.emitChange();
          break;

        case 'deleteSong':
          app.Store.emitChange();
          break;

        case 'updateClass':
          app.base.post(`classes/${action.classID}`, {
            data: action.classInstance
          });
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
      songs: []
    };
  }

  componentDidMount() {
    this.Store = makeStore(this);
    this.Store.addChangeListener(this._onChange.bind(this));

    window.store = this.Store;

    // connect the state to Firebase using re-base
    this.base = Rebase.createClass('https://songdatabase.firebaseio.com/');

    let songsConfig = {
      context: this,
      asArray: true,
      then(songs) {
        this.setState({ songs });
      }
    };
    this.base.listenTo('songs', songsConfig);
    this.base.fetch('songs', songsConfig);

    let coursesConfig = {
      context: this,
      asArray: true,
      then(courses) {
        this.setState({ courses });
      }
    };
    this.base.listenTo('courses', coursesConfig);
    this.base.fetch('courses', coursesConfig);

    let classesConfig = {
      context: this,
      asArray: true,
      then(classes) {
        this.setState({ classes });
      }
    };
    this.base.listenTo('classes', classesConfig);
    this.base.fetch('classes', classesConfig);

  }

  componentWillUnmount() {
    this.Store.removeChangeListener(this._onChange.bind(this));
    this.base.removeBinding(this.fbRef);
  }

  render() {
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
    console.log('hi');
    this.setState(this.state);
    // this.setState(this.Store.getAll());
  }
}
