const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');


app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


require('dotenv').config();

const cliID = process.env.CLIENT_ID;
const clieSec= process.env.CLIENT_SECRET;

//this is a comment to see if git will actually realize it's online empty respository is not "up to date"


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

require('./passport')(app);

app.use(require('./routes'));

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    error
  })
});

// configure mongoose
require('./middleware/mongoose')()
  .then(() => {
    // mongo is connected, so now we can start the express server.
    app.listen(PORT, () => console.log(`Server up and running on ${PORT}.`));
  })
  .catch(err => {
    // an error occurred connecting to mongo!
    // log the error and exit
    console.error('Unable to connect to mongo.')
    console.error(err);
  });
