var Dispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
var assign = require('object-assign');
var CHANGE_EVENT = "change";

var rating = 0;

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
});


Dispatcher.register(function(action){
	
	switch (action.type) {
		case ActionTypes.RATE:
		rating +=1;
		Store.emitChange();
	}
});


module.exports = Store;