var Dispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
var assign = require('object-assign');
var CHANGE_EVENT = "change";

var rating = 0;
var _user = null;

var Store = assign({}, EventEmitter.prototype, {

	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback){
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback);
	},

	getRating: function(){
		return rating;
	},

	getUser: function(){
		return _user;
	}
});


Dispatcher.register(function(action){

	switch (action.type) {
		
		case ActionTypes.RATE:
			rating +=1;
			Store.emitChange();
			break;

		case ActionTypes.RECEIVED_USER:
			_user = action.user;
			Store.emitChange();
			break;
	}


});


module.exports = Store;
