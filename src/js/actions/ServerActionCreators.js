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
	},

};
