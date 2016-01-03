var AppDispatcher = require('../dispatcher/AppDispatcher');

var Actions = {

  /**
   * @param  {obj} action {id, song}
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
  }

};

module.exports = Actions;