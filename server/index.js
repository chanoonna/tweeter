"use strict";

// Basic express setup:

const PORT           = 8080;
const express        = require("express");
const bodyParser     = require("body-parser");
const sseTest        = require('./data-files/random-tweets');
const sassMiddleware = require('node-sass-middleware');

const app            = express();


app.use(sassMiddleware({
    src: __dirname + '/styles',
    dest: __dirname + '../../public/styles',
    debug: false,
    outputStyle: 'compressed',
    prefix:  '/styles'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// The in-memory database of tweets. It's a basic object with an array in it.
const db = require("./lib/in-memory-db");

// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:
const DataHelpers = require("./lib/data-helpers.js")(db);

// Update the dates for the initial tweets (data-files/initial-tweets.json).
require("./lib/date-adjust")();

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.
const tweetsRoutes = require("./routes/tweets")(DataHelpers);

// Mount the tweets routes at the "/tweets" path prefix:
app.use("/tweets", tweetsRoutes);

// This part is for a little practice for SSE.
// It is not intended to feed a certain user directly.
app.get('/sse/tweets', async function(req, res) {
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();

  let count = 0;

  while (count < sseTest.length) {
    await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 21 + 10) * 1000));

    const tweet = sseTest[count];
    tweet.created_at = Date.now();
    db.tweets.push(tweet);

    res.write(`data: ${JSON.stringify(db.tweets)}\n\n`);
    count += 1;
  }
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
