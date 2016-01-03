var AppDispatcher = require('../dispatcher/AppDispatcher');

var Actions = {

  /**
   * @param  {id} number
   * @param  {song} song object
   */
  updateSong: function(action) {
    AppDispatcher.handleViewAction({
      actionType: 'updateSong',
      id: action.id,
      song: action.song
    });
  },

  /**
   * @param  {string} id
   */
  addSong: function(id) {
    AppDispatcher.handleViewAction({
      actionType: 'addSong',
      id: id
    });
  },

  /**
   * @param  {string} id
   */
  deleteSong: function(id) {
    AppDispatcher.handleViewAction({
      actionType: 'deleteSong',
      id: id
    });
  },

  /**
   * @param  {classID} number
   * @param  {classInstance} class object
   */
  updateClass: function(action) {
    AppDispatcher.handleViewAction({
      actionType: 'updateClass',
      classID: action.classID,
      classInstance: action.classInstance
    });
  },

};

module.exports = Actions;