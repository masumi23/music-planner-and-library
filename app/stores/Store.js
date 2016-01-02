import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import assign from 'object-assign';

import Firebase from 'firebase';
import Rebase from 're-base';

var CHANGE_EVENT = 'change';

var _stuff = {};

var Store = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire data store.
   * @return {object}
   */
  getAll: function() {
    return _stuff;
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

// AppDispatcher.register(function(action) {

//   switch(action.actionType) {
//     case 'updateSong':
//       console.log('update song woo!!!');
//       Store.emitChange();
//       break;

//     default:
//       // no op
//   }

// });

module.exports = Store;