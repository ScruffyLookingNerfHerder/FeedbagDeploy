const FOOD2FORK = 'https://food2fork.com/api/search?key='
const APIKey = process.env.FOOD_T0_FORK_API;
const axios = require('axios');
const request = require('request')
const cheerio = require('cheerio')

module.exports = {
    Food2forkapi: function(req, res){

      const RecipeQuery = req.params.recipekeywords;
      const url = `${FOOD2FORK}${APIKey}&q=${RecipeQuery}&sort=r`;

      return axios.get(url)
      .then(response => res.json(response.data))
        console.log(response.data)
      .catch(error => console.error(error));
    },

    Food2forkIngredients: function(req, res){
      const IngredientsQuery = req.params.recipeid
      const url = `http://food2fork.com/view/${IngredientsQuery}`
      console.log(url)
      return axios.get(url)
      .then((response) =>{
        let $ = cheerio.load(response.data);
        let Ingredients = {
          ingredients:[]
        };
        $(".span5.offset1.about-container li").each(function(i, element){
          let ingredient = $(element).text();
          Ingredients.ingredients.push(ingredient)
        })
        res.json(Ingredients)

      })

      .catch(error => console.error(error));
    },

    RecipeInstrux: function(req, res){
      console.log(req.params)
      const publisher = req.params.publisher
      console.log(publisher)
      // console.log(publisher)
      const source = req.query.url
      console.log(source)
      // console.log(source)
      let instructions = {
        steps:[]
      }
      switch (publisher){
        case 'All Recipes':
        console.log("scraping AllRecipes")
        //allrecipes function
        return axios.get(source)
        .then((response) => {

          let $ = cheerio.load(response.data)

          $(".recipe-directions__list--item").each(function(i, element) {
            let step = $(element).text()
            instructions.steps.push(step)
          })
          res.json(instructions)
        }).catch(err => {
          console.log(err)
        })
        break;
        case 'Closet Cooking':
        console.log("scraping closet cooking")
        //closet cooking function
        return axios.get(source)
        .then((response) => {
          let $ = cheerio.load(response.data)

          $(".instructions li").each(function(i, element) {
            let step = $(element).text()
            instructions.steps.push(step)
          })
          res.json(instructions)
        })
        break;
        case '101 Cookbooks':
        //1010cookbooks function
        return axios.get(source)
        .then((response) => {
          let $ = cheerio.load(response.data)

          $("#recipe p").not("blockquote p").each(function(i, element){
            let step = $(element).text()
            instructions.steps.push(step)
          })
          res.json(instructions)
        })
        break;
        case 'BBC Good Food':
        //BBC Goodfood function
        return axios.get(source)
        .then((response) => {
          let $ = cheerio.load(response.data)

          $(".method__list li").each(function(i, element){
            let step = $(element).text()
            instructions.steps.push(step)
          })
          res.json(instructions)
        })

        break;
        case 'The Pioneer Woman':
        //Pioneer Woman
        return axios.get(source)
        .then((response) => {
          let $ = cheerio.load(response.data)
          $("[id^=recipe-instructions]").each(function(i, element){
            let step;
            if($(element).children().hasClass('panel-body') === true){
                step = $(element).text();
                instructions.steps.push(step)
              }
            })

          res.json(instructions)
          })

        break;
        case 'Bon Appetit':

        //Bon Appetit function
        return axios.get(source)
        .then((response) => {
          let $ = cheerio.load(response.data)
          $(".step").each(function(i, element){
            let step = $(element).text()
            instructions.steps.push(step)
          })
          res.json(instructions)
        })
        break;
        case 'Jamie Oliver':
        //jamie olver function
        return axios.get(source)
        .then((response) => {
          let $ = cheerio.load(response.data)
          $(".method-p li").each(function(i, element){
            let step = $(element).text();
            instructions.steps.push(step)
          })
          res.json(instructions)
        })
        break;
        case 'Epicurous':
        //Epicurous function
        return axios.get(source)
        .then((response) => {
          let $ = cheerio.load(response.data)
          $(".preparation-step").each(function(i, element){
            let step = $(element).text()
            instructions.steps.push(step)
          })
          res.json(instructions)
        })
        break;
        case 'Tasty Kitchen':
        //tasty kitchen function
        return axios.get(source)
        .then((response) =>{
          let $ = cheerio.load(response.data)
        $(".prep-instructions.nested-two-thirds p").each(function(i, element) {
          let step = $(element).text()
          instructions.steps.push(step)
          })
          res.json(instructions)
        })

        break;
        case 'Cookstr':
        //cookstr function
        return axios.get(source)
        .then((response) => {
          let $ = cheerio.load(response.data)
          $(".cells p").each(function(i, element){
            let step = $(element).text()
            instructions.steps.push(step)
          })
          res.json(instructions)
        })
        break;
        case 'Simply Recipes':
        //simply recipes function
        return axios.get(source)
        .then((response) => {
          let $ = cheerio.load(response.data)
          $("#sr-recipe-method p").each(function(i, element){
            let step = $(element).text()
            instructions.steps.push(step)

          })
          res.json(instructions)
        })
        break;

        default: console.log("Scraper not found, aborting")

      }
    }


}

// const IngredientsQuery = req.params.recipe_id
// const url = `http://food2fork.com/view/${IngredientsQuery}`
// console.log(url)
// return axios.get(url)
// .then((response) =>{
//   let $ = cheerio.load(response.data);
//   let Ingredients = {
//     ingredients:[]
//   };
//   $(".span5.offset1.about-container li").each(function(i, element){
//     let ingredient = $(element).text();
//     Ingredients.push(ingredient)
//   })
//   response.data = Ingredients
//
// })
// .then(response => res.json(response.data))
// .catch(error => console.error(error));

/////

// function Food2forkIngredients(req, res){
//   const IngredientsQuery = "http://food2fork.com/view/" + "47998"
//   console.log(IngredientsQuery)
//   return axios.get(IngredientsQuery)
//   .then((response) =>{
//
//     let $ = cheerio.load(response.data);
//     let ingredients = {
//       ingredients:[]
//     };
//     $(".span5.offset1.about-container li").each(function(i, element){
//       let ingredient = $(element).text();
//       ingredients.ingredients.push(ingredient)
//     })
//     console.log("Ingredients: ", ingredients)
//
//   })
//   res.json(ingredients)
// }
// Food2forkIngredients();
