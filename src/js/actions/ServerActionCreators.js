var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
var AppDispatcher = require('../dispatcher/Dispatcher');

module.exports = {

	receivedUser: function(user){
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVED_USER,
			user: user
		});	
	},

	receivedImage: function(image){
		console.log('ServerActionCreators received images: ', image);
	}

}