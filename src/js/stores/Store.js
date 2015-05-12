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

var trendingImages = null;

var trends = [ "Xmas", "Winter", "TopShop", "Fur Coats", "River Island", "Hats", "Big Jackets", "Spring"];
var categories = [ "Men", " Women", "Accesories", "Beauty", "Hair", "Beachwear", "Sunglasses", "Shorts", "Tops", "Swimwear", "Denim", "Dresses"];
var userImages;
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
	},

	getCategories: function(){
		return categories;
	},

	getTrendingImages: function(){
		return trendingImages;
	},

	getUserImages: function(){
		return userImages;
	},
});

Dispatcher.register(function(action){

	switch (action.type) {

		case ActionTypes.RATE:
			var id = action.data.image_id;
			var voter_id = action.data.voter_id;
			newTrendingImages = trendingImages.map(function(image){

					//find correct image
					if (image._id.toString() == id.toString()){

						// if you've already voted on this image, just return the object without changes
						if (image.raters.indexOf(voter_id) > -1 ) {
							return image;
						}
						else {
							var new_rating_count = image.raters.length + 1;
							var all_ratings_ever = (image.raters.length*image.rating) + action.data.rating;
							var new_average_rating = all_ratings_ever / new_rating_count;
							image.rating = new_average_rating;
							image.raters.push(action.data.voter_id);
							console.log('returning image: ',image);
							return image;
						}
					}
					else{
						return image;
					}
			});

			trendingImages = newTrendingImages;
			Store.emitChange();
			break;

		case ActionTypes.RECEIVED_USER:
			_user = action.user;
			Store.emitChange();
			break;

		case ActionTypes.RECEIVED_USER_IMAGES:
			userImages = action.images;
			Store.emitChange();
			break;

		case ActionTypes.RECEIVED_IMAGE:
			_user = action.user;
			Store.emitChange();
			break;

		case ActionTypes.RECEIVED_TRENDING_IMAGES:
			trendingImages = action.images;
			Store.emitChange();
			break;

	}


});

module.exports = Store;
