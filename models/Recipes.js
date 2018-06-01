const mongoose = require ('mongoose');

let Schema = mongoose.Schema;

const RecipeSchema = new mongoose.Schema({
publisher: String,
f2f_url: String,
title: String,
source_url: String,
id: String,
image: String,
ingredients: Array,
steps: Array,
User:{
  type: Schema.Types.ObjectId, ref: "users"
}
});


const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe
