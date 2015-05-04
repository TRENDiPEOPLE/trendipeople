var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
var Dispatcher = require('../dispatcher/Dispatcher');
module.exports = {

	rate: function(data){
		Dispatcher.dispatch({
			type: ActionTypes.RATE,
			data: data
		});
	} 

}