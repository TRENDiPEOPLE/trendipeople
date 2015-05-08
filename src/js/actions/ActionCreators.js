var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
var AppDispatcher = require('../dispatcher/Dispatcher');
var APIUtils = require('../utils/APIUtils');

module.exports = {

	rate: function(data){
		console.log('actionCreators RATE')
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
