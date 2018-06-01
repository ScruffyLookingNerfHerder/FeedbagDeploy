const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/feedbag",

);

const RestaurantSeed = [
  {
    name: "Bob's Burgers",
    websiteURL: "www.bobsburgers.com",
    address: "123 Ocean Avenue, Dingy Seaboard Town, NJ",
    photos: "none",
    User: mongoose.Types.ObjectId("5ae48d1e4ada39390c7f857f")

  },
  {
    name: "The Monkey Bar",
    websiteURL: "www.themonkeybar.com",
    address: "143 Ocean Avenue, Dingy Seabord Town, NJ",
    photos: "none",
    User: mongoose.Types.ObjectId("5ae7a54445d6f16058cc2b98")
  }
];

const RecipeSeed = [
  {
    title: "Old Fashioned",
    href: "www.whiskeyisthebest.com",

    User: mongoose.Types.ObjectId("5ae7a54445d6f16058cc2b98")
  },
  {
    title: "Gin Rickey",
    href: "www.ginisthebest.com",

    User: mongoose.Types.ObjectId("5ae48d1e4ada39390c7f857f")
  }
]

db.Restaurant
  .remove({})
  .then(() => db.Restaurant.collection.insertMany(RestaurantSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  })

db.Recipe
  .remove({})
  .then(()=> db.Recipe.collection.insertMany(RecipeSeed))
  .then(data => {
    console.log(data.insertedIds.length + "records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1)
  })
