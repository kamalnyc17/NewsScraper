// Dependencies
// =============================================================
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for homepage 
  app.get('/', function (req, res) {
    res.render('index', {});
  });

  // A GET route for scraping the echoJS website
  app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    // Making a request via axios for `nhl.com`'s homepage
    axios.get("https://www.nhl.com/").then(function (response) {

      var $ = cheerio.load(response.data);

      // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
      $("h4.headline-link").each(function (i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(element).text();
        result.summary = $(element).siblings().text();
        result.link = $(element).parent().attr("href");

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function (dbArticle) {
            // View the added result in the console
          })
          .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
      //res.render('index', {});
    });
  });

  // Route for getting all Articles from the db
  app.get("/articles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function (dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Route for deleting an Articles from the db
  app.get("/delete/:id", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.deleteOne({
        _id: req.params.id
      })
      .then(function (dbArticle) {
        // If we were able to successfully find Articles, delete it
        location.reload();
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
};