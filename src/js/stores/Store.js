var Dispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
var assign = require('object-assign');
var CHANGE_EVENT = "change";

var rating = 0;
var _user = null;
var people = [
	{ img : "http://lorempixel.com/150/150/people/1", rating : 0 },
	{ img : "http://lorempixel.com/150/150/people/2", rating : 0 },
	{ img : "http://lorempixel.com/150/150/people/3", rating : 0 },
	{ img : "http://lorempixel.com/150/150/people/4", rating : 0 },
	{ img : "http://lorempixel.com/150/150/people/5", rating : 0 },
	{ img : "http://lorempixel.com/150/150/people/6", rating : 0 },
	{ img : "http://lorempixel.com/150/150/people/7", rating : 0 },
	{ img : "http://lorempixel.com/150/150/people/8", rating : 0 }
];

var looks = [
	{ look : "http://lorempixel.com/150/150/fashion/1", rating : 0 },
	{ look : "http://lorempixel.com/150/150/fashion/2", rating : 0 },
	{ look : "http://lorempixel.com/150/150/fashion/3", rating : 0 },
	{ look : "http://lorempixel.com/150/150/fashion/4", rating : 0 },
	{ look : "http://lorempixel.com/150/150/fashion/5", rating : 0 },
	{ look : "http://lorempixel.com/150/150/fashion/6", rating : 0 },
	{ look : "http://lorempixel.com/150/150/fashion/7", rating : 0 },
	{ look : "http://lorempixel.com/150/150/fashion/8", rating : 0 }
];
var trends = [ "Winter", "TopShop", "Fur Coats", "Hats", "Spring"];

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
	},

	getPeople: function(){
		return people;
	},

	getTrends: function(){
		return trends;
	},

	getLooks: function(){
		return looks;
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
