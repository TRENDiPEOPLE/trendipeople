var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
var AppDispatcher = require('../dispatcher/Dispatcher');

module.exports = {

	receivedUser: function(user){
		// console.log('ServerActionCreators received user? : ', user);
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVED_USER,
			user: user
		});
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
