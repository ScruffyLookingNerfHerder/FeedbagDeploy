require('dotenv').config();
const express = require('express');
const axios = require('axios');
const passport = require('passport');
const router = express.Router();
const db = require('../models');
const mustBeLoggedIn = require('../middleware/mustBeLoggedIn');
const mongoose = require('mongoose');
const Twitter = require('twitter');
const RestaurantController = require("../controllers/RestaurantsController");
const RecipeController = require("../controllers/RecipesController");
const ToDoController = require("../controllers/ToDoController");
const recipeapi = require("../controllers/recipeapi");



const FOOD2FORK = 'https://food2fork.com/api/search?key='
const APIKey = process.env.FOOD_T0_FORK_API;





async function getCurrentUser(req, res){
  const { id, username } = req.user;
  const memberships = await db.SocialMediaMembership
    .find({userId: new mongoose.Types.ObjectId(id) });
  res.json({
    id, username,
    memberships: memberships.map(m => m.provider)

  });

}

router.route('/auth')
  // GET to /api/auth will return current logged in user info
  .get((req, res) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'You are not currently logged in.'
      })
    }

    getCurrentUser(req, res);
  })
  // POST to /api/auth with username and password will authenticate the user
  .post(passport.authenticate('local'), (req, res) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'Invalid username or password.'
      })
    }

    getCurrentUser(req, res);
  })
    .delete((req, res) => {
      req.logout();
      req.session.destroy();
      res.json({
        message: 'You have been logged out'
      });
    });

    router.route('/users')
      .post((req, res, next) => {
        db.User.create(req.body)
          .then(user => {
            const { userid, username } = user;
            res.json({
              userid, username
            });
          })
          .catch(err => {
            if (err.code === 11000){
              res.status(400).json({
                message: 'Username already in use'
              })
            }
            next(err);
          });
      });


      router.route('/Restaurants/:userid/')
        .get(mustBeLoggedIn(), RestaurantController.find)
        .put(mustBeLoggedIn(), RestaurantController.update)
        .delete(mustBeLoggedIn(), RestaurantController.remove)
        .post(mustBeLoggedIn(), RestaurantController.create)

      router.route('/Restaurants/:userid/:id')
        .get(mustBeLoggedIn(), RestaurantController.findById)
        .put(mustBeLoggedIn(), RestaurantController.update)
        .delete(mustBeLoggedIn(), RestaurantController.remove)
        .post(mustBeLoggedIn(), RestaurantController.create)

      router.route('/Recipes/:userid')
        .get(mustBeLoggedIn(), RecipeController.find)
        .put(mustBeLoggedIn(), RecipeController.update)
        .delete(mustBeLoggedIn(), RecipeController.remove)
        .post(mustBeLoggedIn(), RecipeController.create)

      router.route('/Recipes/:userid/:id')
        .get(mustBeLoggedIn(), RecipeController.findById)
        .put(mustBeLoggedIn(), RecipeController.update)
        .delete(mustBeLoggedIn(), RecipeController.remove)
        .post(mustBeLoggedIn(), RecipeController.create)

      router.route('/Groceries/:userid/')
        .get(mustBeLoggedIn(), ToDoController.find)
        .put(mustBeLoggedIn(), ToDoController.update)
        .delete(mustBeLoggedIn(), ToDoController.remove)
        .post(mustBeLoggedIn(), ToDoController.create)
      router.route('/Groceries/:userid/:id')
        .get(mustBeLoggedIn(), ToDoController.findById)
        .post(mustBeLoggedIn(), ToDoController.create)
        .put(mustBeLoggedIn(), ToDoController.update)
        .delete(mustBeLoggedIn(), ToDoController.remove)

      router.route('/RecipeEXP/:recipekeywords')
        .get(mustBeLoggedIn(), recipeapi.Food2forkapi)

      router.route('/Ingredients/:recipeid')
        .get(mustBeLoggedIn(), recipeapi.Food2forkIngredients)

      router.route('/Steps/:publisher/')
        .get(mustBeLoggedIn(), recipeapi.RecipeInstrux)




module.exports = router;
