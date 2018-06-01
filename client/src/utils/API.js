import axios from "axios";
// get the ENV import working!!!
const CLIENT_ID = "S2ZPM0I1JGASJURDWP1TT4NKJ3AN20IK1K0JE0KI0LEP52FF";
const CLIENT_SECRET = "UJCYMVWC4MUGL5VYS1N3ZNHWIJEHKUYK4QDS2VCNFMXSCVAM";
const API_KEY = "15a372b846b971348dc85396f31c7b40";



export default {
  // Gets all groceries associated with the logged in user
  getGroceries: function(userid) {
    return axios.get("/api/Groceries/"+ userid +"/");
  },
  // Gets the grocery with the given id
  getGrocery: function(userid, id) {
    return axios.get("/api/Groceries/"+ userid +"/" + id);
  },
  // Deletes the grocery with the given id
  deleteGroceries: function(userid, id) {
    return axios.delete("/api/Groceries/" + userid + "/" + id);
  },
  // Saves a grocery to the database
  saveGroceries: function(userid, Grocery) {
    return axios.post("/api/Groceries/" + userid + "/", Grocery);
  },
  //Gets all the saved recipes from a specific user
  getRecipes: function(userid) {
    return axios.get("/api/Recipes/" + userid + "/");
  },
  //Gets a specific saved recipe by id of the recipe
  getRecipe: function(userid, id) {
    return axios.get("/api/Recipes/"+ userid + "/" + id + "/");
  },
  //Saves a recipe to the user's database
  saveRecipe: function(userid, Recipe) {
    return axios.post("/api/Recipes/" + userid + "/", Recipe);
  },
  //Update a recipe in the user's database
  updateRecipe: function(userid, id, Recipe) {
    return axios.put("/api/Recipes/" + userid + "/" + id, Recipe)
  },
  //Deletes a recipe from the user's database
  deleteRecipe: function(userid, id) {
    return axios.delete("/api/Recipes/" + userid + "/" + id);
  },
  //Gets all the saved restaurants for the logged in user
  getRestaurants: function(userid) {
    return axios.get("/api/Restaurants/" + userid + "/");
  },
  //Gets the Restaurant with the given id
  getRestaurant: function(userid, id) {
    return axios.get("/api/Restaurants/" + userid + "/" + id);
  },
  //Deletes a Restaurant from the user's favorites
  deleteRestaurant: function( userid, id) {
    return axios.delete("/api/Restaurants/" + userid + "/" + id);
  },
  saveRestaurant: function(userid, Restaurant){
    return axios.post("/api/Restaurants/" + userid + "/", Restaurant);
  },
  getRest: function(near, catIds) {
    return axios.get(`https://api.foursquare.com/v2/venues/search`, {
      params: {
        near: near,
        categoryId: catIds,
        limit: 10,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        v: 20180421
      }
    })
  },
  getVenue: function(vID) {
    return axios.get(`https://api.foursquare.com/v2/venues/` + vID, {
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        v: 20180421
      }
    })
  },
  getRec: function(recipeQuery) {
      return axios.get('/api/RecipeEXP/' + recipeQuery, {
        params: {}
      })
  },
  getIngredients: function(id) {
    return axios.get('/api/Ingredients/' + id)
  },
  getSteps: function(publisher, url){
    return axios.get('/api/Steps/' + publisher + "/?url=" + url)
  }
};

/*
axios.get('/api/Ingredients/' + recipe.recipe_id)
.then(res => {
  recipe.ingredients = res.data.ingredients

})

.catch(err => {
  console.log(err)
}),

axios.get("/api/Steps/" + recipe.publisher + "/?url=" + recipe.source_url)
.then(res => {
  console.log(res.data)
  recipe.instructions = res.data.instructions

})
.catch(err => {
  console.log(err)
}),
*/

// getRec: function(recipeQuery) {
//   return axios.get(`https://proxy.calweb.xyz/http://www.recipepuppy.com/api/?q=` + recipeQuery + `&oi=1`, {
//     params: {
//       count: 30
// + `&oi=1`
// https://api.foursquare.com/v2/venues/search?near=arlington,va&categoryId=4d4b7105d754a06374d81259&query=italian,american&client_id=S2ZPM0I1JGASJURDWP1TT4NKJ3AN20IK1K0JE0KI0LEP52FF&client_secret=UJCYMVWC4MUGL5VYS1N3ZNHWIJEHKUYK4QDS2VCNFMXSCVAM&v=20180421
