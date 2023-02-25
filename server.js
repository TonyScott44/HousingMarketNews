const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Require all models
const db = require("./models");

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Use express.static to serve the public folder as a static directory
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  app.use(express.static("public"));
}

mongoose.set("strictQuery", false);
// Connect to the Mongo DB
mongoose.connect('mongodb://127.0.0.1:27017/client');

// Scraping Logic
app.get("/", function(req, res) {
      // First, we grab the body of the html with request
      axios.get("http://www.inman.com/").then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        const $ = cheerio.load(response.data);
        
        // Now, we grab every h2 within an article tag, and do the following:
        $(".post-block .title-wrap").each(function(i, element) {
          if(i === 4) return false;
          console.log(i);
          // Save an empty result object
          var result = {};
    
          // Add the text and href of every link, and save them as properties of the result object
          result.title = $(this)
            .children("a")
            .text();
          result.author = $(this)
            .children("a")
            .attr("href");

          // Create a new Article using the `result` object built from scraping
          db.Article.create(result)
            .then(function(dbArticle) {
              // View the added result in the console
              console.log(dbArticle);
            })
            .catch(function(err) {
              // If an error occurred, send it to the client
              return res.json(err);
            });
            
        });
    
        // If we were able to successfully scrape and save an Article, send a message to the client
        res.send("Scrape Complete");
      });
});

// Add routes, both API and view
app.use(routes);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});