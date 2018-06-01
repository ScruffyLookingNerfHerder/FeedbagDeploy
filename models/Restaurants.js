const mongoose = require ('mongoose');

let Schema = mongoose.Schema;

const RestaurantSchema = new mongoose.Schema({
name: String,
websiteURL: String,
address: String,
city: String,
country: String,
state: String,
photos: String,
phone:String,
lat: String,
lng: String,
User:{
 type: Schema.Types.ObjectId, ref: "users"
}

});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant
