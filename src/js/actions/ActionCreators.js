var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
var AppDispatcher = require('../dispatcher/Dispatcher');
var APIUtils = require('../utils/APIUtils');

module.exports = {

  rate: function(data){
    AppDispatcher.dispatch({
      type: ActionTypes.RATE,
      data: data
    });
  },

	fetchUser: function(){
		APIUtils.fetchUser();
	}

};
