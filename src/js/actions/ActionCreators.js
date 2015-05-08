var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
var AppDispatcher = require('../dispatcher/Dispatcher');
var APIUtils = require('../utils/APIUtils');

module.exports = {

	rate: function(data){
		APIUtils.rate(data);

		AppDispatcher.dispatch({
			type: ActionTypes.RATE,
			data: data
		});
	  },

	fetchUser: function(){
		APIUtils.fetchUser();
	},

	fetchUserImages: function(){
		APIUtils.fetchUserImages();
	},

	fetchTrendingImages: function(){
		APIUtils.fetchTrendingImages();
	},

	saveImage: function(data){
		APIUtils.saveImage(data);
	}

};
