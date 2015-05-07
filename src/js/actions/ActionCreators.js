var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
var Dispatcher = require('../dispatcher/Dispatcher');
var APIUtils = require('../utils/APIUtils');

module.exports = {

	rate: function(data){
		Dispatcher.dispatch({
			type: ActionTypes.RATE,
			data: data
		});
	},

	fetchUser: function(){
		APIUtils.fetchUser();
	},

	saveImage: function(data){
		console.log('data in actionCreators: ', data);
		APIUtils.saveImage(data);
	}

}