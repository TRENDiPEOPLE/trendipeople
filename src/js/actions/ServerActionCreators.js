var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
var AppDispatcher = require('../dispatcher/Dispatcher');

module.exports = {

	receivedRating: function(data){
		AppDispatcher.dispatch({
			type: ActionTypes.RATE,
			data: data
		});
	},

	receivedUser: function(user){
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVED_USER,
			user: user
		});	
	},

	receivedUserImages: function(images){
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVED_USER_IMAGES,
			images: images
		});		
	},

	receivedTrendingImages: function(images){
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVED_TRENDING_IMAGES,
			images: images
		});		
	}


};
